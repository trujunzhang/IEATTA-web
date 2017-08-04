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

        <Telescope.components.ReviewsList
          key={recipe.id}
          forObject={this.props.recipe}
          reviewType="recipe"
          reviewTitle={reviewTitle}/>

      </div>
    )
  }


  renderRightPanel() {
    const {recipe} = this.props;

    return (
      <div className="column column-beta column--responsive official-events">
        <div className="ylist ylist-bordered" id="ordered-user-on-recipe-panel">
          <Telescope.components.F8SectionHeaderTitle title={"Ordered User"}/>
          <Telescope.components.F8UserAvatorSection key={recipe.id} user={this.props.recipe.user} sectionClass=""/>
        </div>

        <div className="ylist ylist-bordered">
          <Telescope.components.F8SectionHeaderTitle title={"Related Recipes"}/>
          <Telescope.components.RecipesList key={recipe.id} orderedUser={recipe.user} showTitle={false}/>
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

export default OrderedRecipesDetail;
