import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadPhotosBrowser,
} = require('../../../actions').default

const {
  PARSE_USERS,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  MODEL_FORM_TYPE_EDIT,
  MODEL_FORM_TYPE_NEW,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_RECIPES,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
} = require('../../../lib/constants').default


const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

const {
  generatePhotoTerm,
  getPageFormType,
  getSelectPhoto,
} = require('../../filter/filterRoutes')


class IEAUserProfileReviewsLayout extends Component {

  constructor(props, context) {
    super(props)
  }


  renderRightPanel() {
    const {userProfile, forObject} = this.props;
    return (
      <div className="column column-beta">

          <Telescope.components.ReviewsList
            key={userProfile.id}
            forObject={this.props.userProfile}
            reviewListType={REVIEW_LIST_TYPE_USER_PROFILE_ABOUT}
            reviewTitle={userProfile.username}/>

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

export default withRouter(connect(select)(IEAUserProfileReviewsLayout));


