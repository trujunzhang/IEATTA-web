import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

class UserProfileAboutLayout extends Component {

  renderContent() {
    return (
      <div className="clearfix layout-block layout-n user-details_container">
        <Telescope.components.UserProfileLeftPanel {...this.props} />

        {/*{this.renderRightPanel()}*/}
      </div>

    )
  }

  render() {

    return (

      <div className="main-content-wrap main-content-wrap--full">

        <div className="top-shelf top-shelf-grey">

          <Telescope.components.UserProfileSingleHeader {...this.props}/>

        </div>

        <div id="super-container" className="content-container">

          {this.renderContent()}

        </div>
      </div>

    )
  }

}

export default withRouter(UserProfileAboutLayout)

