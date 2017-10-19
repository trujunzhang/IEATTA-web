import Telescope from '../index'
import React, {Component} from 'react'

const {loadUsersWithoutAnonymousList} = require('../../../actions').default
import PaginationTerms from "../../../lib/paginationTerms";

const {byListId, getDefaultListTask} = require('../../filter/filterPosts')

import {withRouter} from 'react-router'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../lib/constants').default

class IEAOrderedUsersInEventsLayout extends Component {
  constructor(props, context) {
    super(props)
    const leftUsersListTerms = PaginationTerms.generateTermsForOrderedUsersList(props)
    this.state = {
      leftUsersListTerms: leftUsersListTerms,
      leftUsersListTask: getDefaultListTask(leftUsersListTerms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leftUsersListTask: byListId(nextProps.listContainerTasks, this.state.leftUsersListTerms, this.state.leftUsersListTask)
    })
  }

  componentDidMount() {
    const {leftUsersListTerms, leftUsersListTask} = this.state;
    this.props.dispatch(loadUsersWithoutAnonymousList(leftUsersListTask, leftUsersListTerms))
  }

  renderRightPanel() {
    const {forObject} = this.props;
    const reviewTitle = forObject.displayName;

    return (
      <div className="column column-beta ">
        <div className="user-details_bookmarks js-user-details_bookmarks">

          <Telescope.components.ReviewsList
            key={forObject.id}
            forObject={this.props.forObject}
            reviewType="event"
            reviewTitle={reviewTitle}/>

        </div>
      </div>

    )
  }


  renderContent() {
    return (
      <div className="clearfix layout-block layout-n user-details_container">
        <div className="column column-alpha user-details_sidebar">
          <Telescope.components.OrderedUserLeftMenusPanel
            {...this.state}
            {...this.props} />
        </div>

        {this.renderRightPanel()}

      </div>
    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey">
          <Telescope.components.OrderedUserInEventHeaderView {...this.props}/>
        </div>

        <div id="super-container" className="content-container">
          {this.renderContent()}
        </div>
      </div>
    )
  }

}

export default withRouter(IEAOrderedUsersInEventsLayout)


