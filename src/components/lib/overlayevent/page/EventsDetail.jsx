import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class EventsDetail extends Component {

  renderLeftTopSection() {
    const {event} = this.props;

    let html = event.want;
    if (html) {
      html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '...</p>';
    }
    const htmlBody = {__html: html};

    return (
      <div className="ysection">
        <h3>What/Why:</h3>
        <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
      </div>
    )
  }

  renderLeftBottomReviewsSection() {
    return (
      <div className="ysection">
      </div>
    )
  }

  renderLeftPanel() {
    return (
      <div className="column column-alpha column--responsive">
        {this.renderLeftTopSection()}
        {this.renderLeftBottomReviewsSection()}
      </div>
    )
  }

  renderRightTopUsersSection() {
    return (
      <div className="js-subscriber-list">
      </div>
    )
  }

  renderRightPanel() {
    return (
      <div className="column column-beta column--responsive">
        {this.renderRightTopUsersSection()}

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
