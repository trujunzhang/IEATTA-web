import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'


const {
  EVENTS_LIST_FOR_USER,
} = require('../../../lib/constants').default


class IEAUserProfileEventsLayout extends Component {

  renderRightPanel() {
    return (
      <div className="user-details-bookmarks_content js-user-details-bookmarks_content">
        <Telescope.components.EventsList
          eventType={EVENTS_LIST_FOR_USER}
          {...this.props}/>
      </div>
    )
  }

  renderContent() {
    return (
      <div className="clearfix layout-block layout-n user-details_container">
        <Telescope.components.UserProfileLeftMenusPanel {...this.props} />
        {this.renderRightPanel()}
      </div>
    )
  }


  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey">
          <Telescope.components.UserProfileSingleHeader {...this.props}/>
        </div>
        <div id="super-container" className="content-container">
          {this.renderContent()}
        </div>
      </div>
    )
  }

}


export default withRouter(IEAUserProfileEventsLayout)


