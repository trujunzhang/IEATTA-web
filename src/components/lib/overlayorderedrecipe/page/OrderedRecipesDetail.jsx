import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedRecipesDetail extends Component {

  renderLeftPanel() {
    const {recipe} = this.props;
    const reviewTitle = recipe.displayName;

    return (
      <div className="column column-alpha column--responsive">
        <Telescope.components.ReviewsList forObject={this.props.recipe}
                                          reviewType="recipe"
                                          reviewTitle={reviewTitle}/>

      </div>
    )
  }


  renderRightPanel() {
    const {recipe} = this.props;

    return (
      <div className="column column-beta column--responsive official-events">
        <Telescope.components.F8UserAvatorSection user={this.props.recipe.user}/>
        {/*<Telescope.components.F8RestaurantMapSection restaurant={this.props.recipe.restaurant}/>*/}
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
