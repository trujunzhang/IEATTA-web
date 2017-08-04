import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

class EventsDetail extends Component {

  renderLeftTopSection() {
    const {event} = this.props;
    const htmlBody = Events.getWantBody(event);

    return (
      <div className="ysection">
        <h3>What/Why:</h3>
        <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
      </div>
    )
  }

  renderLeftPanel() {
    const {event} = this.props;
    const reviewTitle = event.displayName;

    return (
      <div className="column column-alpha column--responsive">
        {this.renderLeftTopSection()}

        <Telescope.components.ReviewsList forObject={this.props.event}
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
    const {event} = this.props;

    return (
      <div className="column column-beta column--responsive">
        {this.renderRightTopUsersSection()}

        <Telescope.components.RecipesList forRestaurant={event.restaurant} forEvent={event} showTitle={true}/>

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
