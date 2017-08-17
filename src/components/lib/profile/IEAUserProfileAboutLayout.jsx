import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

class IEAUserProfileAboutLayout extends Component {


  renderTitle() {
    return (
      <div className="section-header section-header--complex section-header--no-spacing">
        <div className="arrange arrange--middle arrange--12">
          <div className="arrange_unit nowrap">
            <h2 className="section-header_title">Ordered Recipes</h2>
          </div>
        </div>
      </div>
    )
  }

  renderRightPanel() {
    const {userProfile} = this.props;
    return (
      <div className="column column-beta ">


        <div className="user-details_bookmarks js-user-details_bookmarks">

          <div className="user-details-bookmarks_content js-user-details-bookmarks_content">

            {this.renderTitle()}

            {/*<Telescope.components.RecipesList {...this.props} showRightTime={true}/>*/}
          </div>

          <Telescope.components.UserProfileAboutRightPanel {...this.props} />
        </div>
      </div>

    )
  }


  renderContent() {
    return (
      <div className="clearfix layout-block layout-n user-details_container">
        <Telescope.components.UserProfileLeftPanel {...this.props} />

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

