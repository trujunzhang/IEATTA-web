import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../lib/constants').default

class IEAUserProfileAboutLayout extends Component {

  renderRightPanel() {
    const {userProfile} = this.props;
    return (
      <div className="column column-beta ">

        <div className="user-details_bookmarks js-user-details_bookmarks">

          <div className="user-details-bookmarks_content js-user-details-bookmarks_content">

            <Telescope.components.ReviewsList
              key={userProfile.id}
              forObject={this.props.userProfile}
              reviewListType={REVIEW_LIST_TYPE_USER_PROFILE_ABOUT}
              reviewTitle={userProfile.username}/>
          </div>

          <Telescope.components.UserProfileAboutRightPanel {...this.props} />
        </div>
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

export default withRouter(IEAUserProfileAboutLayout)

