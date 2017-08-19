import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedRecipesSingleHeader extends Component {

  renderTopSection() {
    return (
      <div className="biz-page-header clearfix">
        <Telescope.components.RecipesSingleHeaderTopLeftPanel  {...this.props}/>

        <Telescope.components.F8SinglePageHeaderButtonsSection {...this.props}/>
      </div>

    )
  }

  renderSubHeader() {
    return (
      <div className="biz-page-subheader">
        <div className="mapbox-container">
          <Telescope.components.F8RestaurantMapSection restaurant={this.props.recipe.restaurant}/>
        </div>
        <Telescope.components.F8SingleHeaderRightPhotos  {...this.props}/>
      </div>

    )
  }

  render() {
    return (
      <div className="content-container">
        {this.renderTopSection()}
        {this.renderSubHeader()}
      </div>
    )

  }
}

export default OrderedRecipesSingleHeader;
