import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'

class OrderedUsersLayout extends Component {

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div className="top-shelf top-shelf-grey">
          {/*<Telescope.components.OrderedUsersSingleHeader {...this.props}/>*/}
        </div>

        <div id="super-container" className="content-container">
          <Telescope.components.OrderedUsersDetail {...this.props}/>
        </div>
      </div>

    )
  }

}

export default OrderedUsersLayout;
