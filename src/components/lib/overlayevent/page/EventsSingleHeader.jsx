import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

import {getEditEventLink} from '../../../../lib/link'

class EventsSingleHeader extends Component {

  renderTopTitle() {
    const {event} = this.props;

    return (
      <div className="arrange arrange--12">
        <div className="arrange_unit arrange_unit--fill">
          <h1>{event.displayName}</h1>
        </div>
      </div>

    )
  }

  render() {
    const {event} = this.props;

    return (
      <div className="content-container">

        <div className="event-details_header ysection">
          {this.renderTopTitle()}

          <Telescope.components.F8PageHeaderButtonsSection
            {...this.props}
            showEdit={true}
            editLink={getEditEventLink(event)}
          />
        </div>

        <div
          className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive">

          <div className="column column-alpha column--responsive">
            <Telescope.components.EventsSingleHeaderLeftPanel {...this.props}/>
          </div>

          <div className="column column-beta column--responsive">
            <Telescope.components.EventsSingleHeaderRightMap {...this.props}/>
          </div>

        </div>

      </div>
    )

  }
}

export default EventsSingleHeader;
