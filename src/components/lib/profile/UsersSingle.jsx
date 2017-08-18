import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

const {
  loadUserProfilePage,
  loadStatisticCloudPage
} = require('../../../actions').default

const {
  getPageFormTypeForUserProfile,
  getUserQueryId,
} = require('../../filter/filterRoutes')


const {
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_EDIT_FORM,
} = require('../../../lib/constants').default


const {getModelByObjectId} = require('../../filter/filterPosts')

class UsersSingle extends Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      uid: getUserQueryId(props),
      // Detailed object
      userProfile: null,
      userStatistic: null,
      // Common
      pageForm: getPageFormTypeForUserProfile(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageForm: getPageFormTypeForUserProfile(nextProps),
      userProfile: getModelByObjectId(nextProps, this.state.uid, this.state.userProfile),
      userStatistic: getModelByObjectId(nextProps, this.state.uid, this.state.userStatistic, 'statistic'),
    })

    const newUid = getUserQueryId(nextProps);
    if (this.state.uid !== newUid) {
      this.setState({
        uid: newUid,
      })
      this.props.dispatch(loadUserProfilePage(newUid))
      this.props.dispatch(loadStatisticCloudPage(newUid))
    }
  }

  componentDidMount() {
    if (!!this.state.uid) {
      this.props.dispatch(loadUserProfilePage(this.state.uid))
      this.props.dispatch(loadStatisticCloudPage(this.state.uid))
    }
  }

  render() {
    const {userProfile, pageForm} = this.state;

    if (!!userProfile) {
      switch (pageForm) {
        case LOGGED_USER_MENU_ABOUT:
          if (!!this.state.userStatistic) {
            return (<Telescope.components.IEAUserProfileAboutLayout{...this.state} {...this.props}/>)
          }
          break;
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

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user,
  }
}


export default withRouter(connect(select)(UsersSingle))

