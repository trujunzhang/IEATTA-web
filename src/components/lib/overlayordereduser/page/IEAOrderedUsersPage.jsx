import Telescope from '../../../lib'
import React, {Component} from 'react'
import Users from '../../../../lib/users'
import Photos from '../../../../lib/photos'
import Posts from '../../../../lib/posts'
import OrderedUsers from '../../../../lib/events'

class IEAOrderedUsersPage extends Component {

  render() {
    return (

      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey">
          <Telescope.components.OrderedUsersSingleHeader {...this.props}/>
        </div>

        <div id="super-container" className="content-container">
          {/*<Telescope.components.OrderedUsersDetail {...this.props}/>*/}
        </div>
      </div>

    )
  }
}

export default IEAOrderedUsersPage;
