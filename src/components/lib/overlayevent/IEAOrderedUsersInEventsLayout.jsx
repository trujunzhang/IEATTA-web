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
  EVENTS_LIST_FOR_RESTAURANT,
} = require('../../../lib/constants').default

class IEAOrderedUsersInEventsLayout extends Component {
  constructor(props, context) {
    super(props)

    const event = props.forObject;
    const leftUsersListTerms = PaginationTerms.generateTermsForOrderedUsersList(props)
    const peopleInEventTerms = PaginationTerms.generateTermsForEventsList({
      eventType: EVENTS_LIST_FOR_RESTAURANT,
      forObject: {
        id: event.restaurant.id
      }
    })
    this.state = {
      leftUsersListTerms,
      peopleInEventTerms,
      leftUsersListTask: getDefaultListTask(leftUsersListTerms),
      peopleInEventListTask: getDefaultListTask(peopleInEventTerms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leftUsersListTask: byListId(nextProps, this.state.leftUsersListTerms, this.state.leftUsersListTask),
      peopleInEventListTask: byListId(nextProps, this.state.peopleInEventTerms, this.state.peopleInEventListTask),
    })
  }

  componentDidMount() {
    const {
      leftUsersListTerms, leftUsersListTask,
      peopleInEventTerms, peopleInEventListTask
    } = this.state;

    this.props.loadUsersWithoutAnonymousListAction({
      listTask: leftUsersListTask,
      terms: leftUsersListTerms
    })
    this.props.loadPeopleInEventListAction(peopleInEventListTask, peopleInEventTerms);
  }

  renderRightPanel() {
    const {peopleInEventListTask} = this.state;
    const {
      ready,
      results
    } = peopleInEventListTask;

    if (ready) {
    }

    const {forObject} = this.props;
    const reviewTitle = forObject.displayName;

    return (
      <div className="column column-beta ">
        <div className="user-details_bookmarks js-user-details_bookmarks">

          {/*<Telescope.components.ReviewsList*/}
          {/*key={forObject.id}*/}
          {/*forObject={this.props.forObject}*/}
          {/*reviewType="event"*/}
          {/*reviewTitle={reviewTitle}/>*/}

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


