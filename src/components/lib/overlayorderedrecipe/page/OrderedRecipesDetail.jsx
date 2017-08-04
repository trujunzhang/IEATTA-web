import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedRecipesDetail extends Component {

  renderLeftPanel() {
    const {restaurant} = this.props;
    const reviewTitle = restaurant.displayName;

    return (
      <div className="column column-alpha column--responsive">
        <Telescope.components.EventsList {...this.props}/>

        <Telescope.components.ReviewsList forObject={this.props.restaurant}
                                          reviewType="restaurant"
                                          reviewTitle={reviewTitle}/>

      </div>
    )
  }


  renderRightPanel() {
    const {restaurant} = this.props;

    return (
      <div className="column column-beta column--responsive official-events">

        <Telescope.components.RecipesList forRestaurant={restaurant} showTitle={true}/>

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

export default OrderedRecipesDetail;
