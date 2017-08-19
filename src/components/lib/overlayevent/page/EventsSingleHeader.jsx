import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

import {getEditEventLink} from '../../../../lib/link'

class EventsSingleHeader extends Component {

  renderSubHeader() {
    return (
      <div
        className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive">

        <div className="column column-alpha column--responsive">
          <Telescope.components.EventsSingleHeaderLeftPanel {...this.props}/>
        </div>

        <div className="column column-beta column--responsive">
          <Telescope.components.EventsSingleHeaderRightMap {...this.props}/>
        </div>

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

export default EventsSingleHeader;
