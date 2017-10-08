import Telescope from '../../../lib'
import React, {Component} from 'react'
import Restaurants from '../../../../lib/restaurants'

class OrderedUsersDetail extends Component {

  renderTitle() {
    return (
      <div className="section-header section-header--complex section-header--no-spacing">
        <div className="arrange arrange--middle arrange--12">
          <div className="arrange_unit nowrap">
            <h2 className="section-header_title">Ordered Recipes</h2>
          </div>
        </div>
      </div>
    )
  }

  renderRightSidebar() {
    const mapInfo = Restaurants.getMapInfo(this.props.forRestaurant,
      this.props.forRestaurant.geoLocation,
      true, false)

    return (
      <div className="user-details-bookmarks_sidebar">
        <div className="bookmarks-map-wrapper js-bookmarks-map-wrapper"
             id="ordered-user-container-right-sider-map">

          <Telescope.components.F8RestaurantMapSection mapInfo={mapInfo}/>

        </div>
      </div>

    )
  }

  renderRightPanel() {
    const {forEvent, forRestaurant, orderedUser, orderedRecipes} = this.props;

    return (
      <div className="column column-beta ">

        {this.renderTitle()}

        <div className="user-details_bookmarks js-user-details_bookmarks">
          <div className="user-details-bookmarks_content js-user-details-bookmarks_content">
            <Telescope.components.RecipesBaseListPage
              recipes={orderedRecipes}
              showTitle={true}
            />
          </div>

          {this.renderRightSidebar()}
        </div>
      </div>
    )
  }

  render() {
    return (

      <div className="clearfix layout-block layout-n user-details_container">
        <Telescope.components.OrderedUsersLeftPanel {...this.props} />

        {this.renderRightPanel()}
      </div>

    )
  }

}

export default OrderedUsersDetail;
