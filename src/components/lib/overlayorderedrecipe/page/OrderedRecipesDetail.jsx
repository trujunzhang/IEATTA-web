import Telescope from '../../../lib'
import React, {Component} from 'react'

class OrderedRecipesDetail extends Component {

  renderLeftPanel() {
    const {forObject} = this.props;
    const reviewTitle = forObject.displayName;

    return (
      <div className="column column-alpha column--responsive">

        <Telescope.components.ReviewsList
          key={forObject.id}
          forObject={forObject}
          reviewType="recipe"
          reviewTitle={reviewTitle}/>

      </div>
    )
  }


  renderRightPanel() {
    const {forObject} = this.props;

    return (
      <div className="column column-beta column--responsive official-events">
        <div className="ylist ylist-bordered" id="ordered-user-on-recipe-panel">
          <Telescope.components.F8SectionHeaderTitle title={"Ordered User"}/>
          <Telescope.components.F8UserAvatorSection key={forObject.id}
                                                    user={forObject.user}
                                                    sectionClass=""/>
        </div>

        <div className="ylist ylist-bordered">
          <Telescope.components.F8SectionHeaderTitle title={"Related Recipes"}/>
          <Telescope.components.RecipesList
            key={forObject.id}
            orderedUser={forObject.user}
            showTitle={false}/>
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
