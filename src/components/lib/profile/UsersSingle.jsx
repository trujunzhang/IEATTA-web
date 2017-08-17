import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

const {loadUserProfilePage} = require('../../../actions').default

const {
  getPageFormTypeForUserProfile,
  getModelByObjectId,
} = require('../../filter/filterRoutes')

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
    const {userProfile} = this.state;

    if (!!userProfile) {
      return (<Telescope.components.UserProfile{...this.state}/>)
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
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user,
    userProfileTask: store.userProfileTask
  }
}


export default withRouter(connect(select)(UsersSingle))

