import Telescope from '../../../lib'
import React, {Component} from 'react'

class OrderedUsersLeftPanel extends Component {
  renderOrderedDetail() {
    const {orderedUser, forEvent, forRestaurant} = this.props;

    return (
      <div className="ysection">

        <div className="ordered-user-left-header">
          <h3>Ordered Details</h3>
        </div>

        <ul className="ylist">
          <li>
            <h4>Location</h4>
            <p>{forRestaurant.address}</p>
          </li>

          <li>
            <h4>Event</h4>
            <p>{forEvent.displayName}</p>
          </li>

          <li>
            <h4>User</h4>
            <p>{orderedUser.username}</p>
          </li>

        </ul>

      </div>
    )
  }

  render() {

    return (
      <div className="column column-alpha user-details_sidebar">
        {this.renderOrderedDetail()}
      </div>

    )
  }
}

export default OrderedUsersLeftPanel;
