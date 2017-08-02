import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class EventsSingleHeader extends Component {

  renderTopTitle() {
    const {event} = this.props;
    return (
      <div className="arrange arrange--12">
        <div className="arrange_unit arrange_unit--fill">
          <h1>{event.displayName}</h1>
          <div className="event-details_category-links">

            <span className="category-str-list">
                <a href="/events/fremont-ca-us/browse?c=8">Festivals &amp; Fairs</a>
            </span>

          </div>
        </div>
      </div>

    )
  }


  renderBottomLeftPanel() {

  }

  renderBottomRightPanel() {

  }

  render() {
    return (
      <div className="content-container">

        <div className="event-details_header ysection">
          {this.renderTopTitle()}
        </div>


      </div>
    )

  }
}

export default EventsSingleHeader;
