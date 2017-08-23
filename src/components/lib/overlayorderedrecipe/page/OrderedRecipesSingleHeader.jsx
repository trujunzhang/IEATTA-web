import Telescope from '../../../lib'
import React, {Component} from 'react'

class OrderedRecipesSingleHeader extends Component {

  renderSubHeader() {
    return (
      <div className="biz-page-subheader">
        <div className="mapbox-container">
          <Telescope.components.F8RestaurantMapSection
            forObject={this.props.forObject.restaurant}/>
        </div>
        <Telescope.components.F8SingleHeaderRightPhotos  {...this.props}/>
      </div>

    )
  }

  render() {
    return (
      <div className="content-container">
        <Telescope.components.F8SinglePageTopHeader  {...this.props}/>
        {this.renderSubHeader()}
      </div>
    )

  }
}

export default OrderedRecipesSingleHeader;
