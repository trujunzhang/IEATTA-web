import Telescope from '../../../lib'
import React, {Component} from 'react'
import Restaurants from '../../../../lib/restaurants'

class RestaurantsSingleHeader extends Component {
  renderSubHeader() {
    const mapInfo = Restaurants.getMapInfo(this.props.forObject, this.props.forObject.geoLocation, true, false);

    return (
      <div className="biz-page-subheader">

        {/*Left Panel*/}
        <div className="mapbox-container">
          <Telescope.components.F8RestaurantMapSection mapInfo={mapInfo}/>
        </div>

        {/*Right Panel*/}
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

export default RestaurantsSingleHeader;
