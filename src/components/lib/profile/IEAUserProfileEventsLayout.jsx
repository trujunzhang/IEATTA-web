import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadPhotosBrowser,
} = require('../../../actions').default

const {
  EVENTS_LIST_FOR_USER,
} = require('../../../lib/constants').default


class IEAUserProfileEventsLayout extends Component {

  renderRightPanel() {
    const {userProfile, forObject} = this.props;
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

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(IEAUserProfileEventsLayout));


