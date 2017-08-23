import Telescope from '../../../lib'
import React, {Component} from 'react'

class RestaurantsSingleHeader extends Component {
  renderSubHeader() {
    return (
      <div className="biz-page-subheader">

        {/*Left Panel*/}
        <div className="mapbox-container">
          <Telescope.components.F8RestaurantMapSection  {...this.props} showEditButton={true}/>
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
