import Telescope from '../../../lib'
import React, {Component} from 'react'

/**
 * The states were interested in
 */
const {
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  PARSE_EVENTS,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  // Review List Type
  REVIEWS_LIST_FOR_RESTAURANT_PAGE,
  REVIEWS_LIST_FOR_EVENT_PAGE,
} = require('../../../../lib/constants').default


class RestaurantsDetail extends Component {

  renderLeftPanel() {
    const {forObject} = this.props;
    const reviewTitle = forObject.displayName;

    return (
      <div className="column column-alpha column--responsive">
        <Telescope.components.EventsList {...this.props}/>

        <Telescope.components.ReviewsList
          key={forObject.id}
          forObject={this.props.forObject}
          reviewType="restaurant"
          reviewTitle={reviewTitle}/>

      </div>
    )
  }


  renderRightPanel() {
    const {forObject} = this.props;

    return (
      <div className="column column-beta column--responsive official-events">

        <Telescope.components.RecipesList
          forRestaurant={forObject}
          reviewListType={REVIEWS_LIST_FOR_RESTAURANT_PAGE}
          showTitle={true}/>

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

export default RestaurantsDetail;
