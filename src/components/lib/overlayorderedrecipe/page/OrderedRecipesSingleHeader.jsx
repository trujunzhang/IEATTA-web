import Telescope from '../../../lib'
import React, {Component} from 'react'
import Restaurants from '../../../../lib/restaurants'

class OrderedRecipesSingleHeader extends Component {

  renderSubHeader() {
    const {forObject} = this.props;

    debugger

    const {restaurant} = forObject;
    const mapInfo = Restaurants.getMapInfo(restaurant, restaurant.geoLocation, false, false)

    return (
      <div className="biz-page-subheader">
        <div className="mapbox-container">
          <Telescope.components.F8RestaurantMapSection mapInfo={mapInfo}
                                                       showRestaurantName={true}
                                                       restaurant={forObject.restaurant}/>
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
