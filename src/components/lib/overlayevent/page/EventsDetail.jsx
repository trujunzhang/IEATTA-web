import Telescope from '../../../lib'
import React, {Component} from 'react'
import Events from '../../../../lib/events'


/**
 * The states were interested in
 */
const {
  // Review List Type
  REVIEWS_LIST_FOR_RESTAURANT_PAGE,
  REVIEWS_LIST_FOR_EVENT_PAGE,
} = require('../../../../lib/constants').default

class EventsDetail extends Component {

  renderLeftTopSection() {
    const {forObject} = this.props;
    const htmlBody = Events.getWantBody(forObject);

    return (
      <div className="ysection" id="event-want-panel">
        <h3>What/Why:</h3>
        <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
      </div>
    )
  }

  renderLeftPanel() {
    const {forObject} = this.props;
    const reviewTitle = forObject.displayName;

    return (
      <div className="column column-alpha column--responsive">
        {this.renderLeftTopSection()}

        <Telescope.components.ReviewsList
          key={forObject.id}
          forObject={this.props.forObject}
          reviewType="event"
          reviewTitle={reviewTitle}/>

      </div>
    )
  }

  renderRightTopUsersSection() {
    return (
      <div className="js-subscriber-list">
        <Telescope.components.OrderedUserList {...this.props}/>
      </div>
    )
  }

  renderRightPanel() {
    const {forObject} = this.props;

    return (
      <div className="column column-beta column--responsive">
        {this.renderRightTopUsersSection()}

        <Telescope.components.RecipesList
          forRestaurant={forObject.restaurant}
          forEvent={forObject}
          reviewListType={REVIEWS_LIST_FOR_EVENT_PAGE}
          showTitle={true}/>

      </div>
    )
  }

  render() {
    return (
      <div className="clearfix layout-block layout-a layout-border event-details_container column--responsive">
        {this.renderLeftPanel()}
        {this.renderRightPanel()}
      </div>
    )
  }
}

export default EventsDetail;
