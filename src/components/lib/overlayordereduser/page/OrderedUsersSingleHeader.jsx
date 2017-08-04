import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedUsersSingleHeader extends Component {


  renderLeftUserAvator(){

  }

  renderUserProfileContainer() {
    return (
      <div className="user-profile_container">
        {this.renderLeftUserAvator()}
      </div>
    )
  }

  render() {
    return (
      <div className="content-container">
        {this.renderUserProfileContainer()}
      </div>
    )

  }
}

export default OrderedUsersSingleHeader;
