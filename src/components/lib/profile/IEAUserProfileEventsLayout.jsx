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
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_RECIPES
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


class IEAUserProfileEventsLayout extends Component {

  constructor(props, context) {
    super(props)

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }


  renderRightPanel() {
    const {userProfile, forObject} = this.props;
    return (
      <div className="column column-beta">
        <div className="user-details-bookmarks_content js-user-details-bookmarks_content">
          <Telescope.components.EventsList {...this.props}/>
        </div>

        <div className="user-details-overview_sidebar">
          <Telescope.components.F8SectionHeaderTitle title={"Recently Added Recipes"}/>
          <Telescope.components.RecipesList
            key={forObject.id}
            orderedUser={userProfile}
            showTitle={false}/>
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

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(IEAUserProfileEventsLayout));


