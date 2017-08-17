import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

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
    return (
      <div className="user-details-bookmarks_sidebar">
        <div className="bookmarks-map-wrapper js-bookmarks-map-wrapper"
             id="ordered-user-container-right-sider-map">

          <Telescope.components.F8RestaurantMapSection restaurant={this.props.forRestaurant}/>

        </div>
      </div>

    )
  }

  renderRightPanel() {
    const {forEvent, forRestaurant, orderedUser} = this.props;
    if (!!forEvent && !!forRestaurant && !!orderedUser) {
      return (
        <div className="column column-beta ">

          {this.renderTitle()}

          <div className="user-details_bookmarks js-user-details_bookmarks">

            <div className="user-details-bookmarks_content js-user-details-bookmarks_content">
              <Telescope.components.RecipesList {...this.props} showRightTime={true}/>
            </div>

            {this.renderRightSidebar()}
          </div>
        </div>

      )
    }
    return null;
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
