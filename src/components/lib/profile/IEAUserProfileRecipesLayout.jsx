import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  EVENTS_LIST_FOR_USER,
  // Review List Type
  RECIPES_LIST_FOR_LOGGED_USER_PAGE,
} = require('../../../lib/constants').default


class IEAUserProfileRecipesLayout extends Component {

  renderRightPanel() {
    const {userProfile} = this.props;
    return (
      <div className="user-details-bookmarks_content js-user-details-bookmarks_content">
        <Telescope.components.RecipesList
          forCreator={userProfile}
          recipeListType={RECIPES_LIST_FOR_LOGGED_USER_PAGE}
          showTitle={true}/>
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

export default withRouter(IEAUserProfileRecipesLayout)

