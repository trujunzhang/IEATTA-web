import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

const {
  loadUserProfilePage,
  invokeParseCloudMethod
} = require('../../../actions').default

const {
  getPageFormTypeForUserProfile,
  getUserQueryId,
} = require('../../filter/filterRoutes')

const {
  CLOUD_STATISTIC_FOR_USER_STATE,
  // 1.1 LOGGED user left menus.
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_MENU_REVIEWS,
  LOGGED_USER_MENU_BROWSER_PHOTOS,
  LOGGED_USER_MENU_EVENTS,
  LOGGED_USER_MENU_RECIPES,
  // 1.2 Edit User.
  LOGGED_USER_EDIT_FORM,
  LOGGED_USER_INVITE_FORM,
} = require('../../../lib/constants').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class UsersSingle extends Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      uid: getUserQueryId(props),
      // Detailed object
      userProfile: null,
      forObject: null,
      userStatistic: null,
      // Common
      pageForm: getPageFormTypeForUserProfile(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    const _userProfile = getModelByObjectId(nextProps, this.state.uid, this.state.userProfile);
    let forObject = null;
    if (!!_userProfile) { // Already fetch the user's profile.
      forObject = {
        id: _userProfile.id,
        displayName: _userProfile.username,
      }
    }
    this.setState({
      pageForm: getPageFormTypeForUserProfile(nextProps),
      userProfile: _userProfile,
      forObject: forObject,
      userStatistic: getModelByObjectId(nextProps, this.state.uid, this.state.userStatistic, 'statistic'),
    })

    this.updateNewUserProfile(nextProps)
  }

  updateNewUserProfile(nextProps) {
    const newUid = getUserQueryId(nextProps);
    if (this.state.uid !== newUid) {
      this.setState({
        uid: newUid,
      })
      this.props.loadUserProfilePageAction(newUid)
      this.props.invokeParseCloudMethodAction({userId: newUid}, newUid)
    }
  }

  componentDidMount() {
    if (!!this.state.uid) {
      this.props.loadUserProfilePageAction(this.state.uid)
      this.props.invokeParseCloudMethodAction({userId: this.state.uid}, this.state.uid)
    }
  }

  render() {
    const {userProfile, pageForm, userStatistic} = this.state;

    if (!!userProfile && !!userStatistic) {
      switch (pageForm) {
        case LOGGED_USER_MENU_ABOUT:
          if (!!this.state.userStatistic) {
            return (<Telescope.components.IEAUserProfileAboutLayout {...this.state} {...this.props}/>)
          }
          break;
        case LOGGED_USER_MENU_REVIEWS:
          return (<Telescope.components.IEAUserProfileReviewsLayout {...this.state} {...this.props}/>)
        case LOGGED_USER_MENU_BROWSER_PHOTOS:
          return (<Telescope.components.IEAUserProfilePhotosLayout {...this.state} {...this.props}/>)
        case LOGGED_USER_MENU_EVENTS:
          return (<Telescope.components.IEAUserProfileEventsLayout {...this.state} {...this.props}/>)
        case LOGGED_USER_MENU_RECIPES:
          return (<Telescope.components.IEAUserProfileRecipesLayout {...this.state} {...this.props}/>)
        case LOGGED_USER_EDIT_FORM:
          return (<Telescope.components.IEAEditUserLayout {...this.state} {...this.props}/>)
      }
    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }
}


/**
 * ## Imports
 *
 * Redux
 */
const {connect} = require('react-redux')

function mapDispatchToProps(dispatch) {
  return {
    //Model
    loadUserProfilePageAction: (parseId) => dispatch(loadUserProfilePage(parseId)),
    //List
    invokeParseCloudMethodAction: (params, parseId) => dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_USER_STATE, params, parseId)),
  }
}


function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user,
  }
}


export default withRouter(connect(select, mapDispatchToProps)(UsersSingle))

