import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

class UserProfile extends Component {

  constructor(props) {
    super(props)

    const {userProfile} = props

    this.state = this.initialState = {
      userSidebarMenu: Users.userSidebarMenu(userProfile)
    }
  }


  render() {
    const {userProfile} = this.props;

    return (
      <div className="clearfix layout-block layout-n user-details_container">
        <Telescope.components.OrderedUsersLeftPanel {...this.props} />

        {/*{this.renderRightPanel()}*/}
      </div>
    )
  }

}

export default withRouter(UserProfile)

