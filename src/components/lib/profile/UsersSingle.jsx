import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

const {loadUserProfilePage} = require('../../../actions').default

const {
  getPageFormTypeForUserProfile,
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
      uid: props.params.uid,
      uslug: props.params.uslug,
      // Detailed object
      userProfile: null,
      // Common
      pageForm: getPageFormTypeForUserProfile(props),
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userProfile: getModelByObjectId(nextProps, this.state.uid, this.state.userProfile),
    })
  }

  componentDidMount() {
    this.props.dispatch(loadUserProfilePage(this.state.uid))
  }

  render() {
    const {userProfile, pageForm} = this.state;

    if (!!userProfile) {
      switch (pageForm) {
        case LOGGED_USER_MENU_ABOUT:
          return (<Telescope.components.UserProfileAboutLayout{...this.state} {...this.props}/>)
        case LOGGED_USER_EDIT_FORM:
          return (<Telescope.components.IEAEditUserLayout {...this.state} {...this.props}/>)
      }
    }

    return (
      <div className="placeholder_1WOC3">
        <div className="loader_54XfI animationRotate loader_OEQVm"/>
      </div>
    )
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

