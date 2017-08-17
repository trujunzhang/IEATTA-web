import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

class UserProfileAboutLayout extends Component {


  render() {

    return (

      <div className="main-content-wrap main-content-wrap--full">

        <div className="top-shelf top-shelf-grey">

          <Telescope.components.UserProfileSingleHeader {...this.props}/>

        </div>

        <div id="super-container" className="content-container">
          {/*<Telescope.components.OrderedUsersDetail {...this.props}/>*/}
        </div>
      </div>

    )
  }

}

export default withRouter(UserProfileAboutLayout)

