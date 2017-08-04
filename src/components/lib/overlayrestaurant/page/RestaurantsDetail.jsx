import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsDetail extends Component {

  renderLeftPanel() {
    return (
      <div className="column column-alpha column--responsive">
        <Telescope.components.EventsList {...this.props}/>

        <Telescope.components.ReviewsList forObject={this.props.restaurant} reviewType="restaurant"/>

      </div>
    )
  }

  renderRightPanel() {
    return (
      <div className="column column-beta column--responsive official-events">
        <div className="mapbox-container">
          <Telescope.components.RestaurantsPageMap  {...this.props}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="ysection event-landing_below-fold">
        <div className="clearfix layout-block layout-a layout-border column--responsive">

          {this.renderLeftPanel()}
          {this.renderRightPanel()}

        </div>
      </div>
    )
  }
}

export default RestaurantsDetail;
