import Telescope from '../index'
import React, {Component} from 'react'

const {loadUsersWithoutAnonymousList} = require('../../../actions').default
import PaginationTerms from "../../../lib/paginationTerms";
import PeopleInEvent from "../../../lib/peopleInEvent";

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
    const peopleInEventTerms = PaginationTerms.generateTermsForPeopleInEventList(event)
    const recipesInRestaurantTerms = PaginationTerms.generateTermsForRecipesList({
      forRestaurant: {
        id: event.restaurant.id
      }
    })
    this.state = {
      leftUsersListTerms,
      peopleInEventTerms,
      recipesInRestaurantTerms,
      leftUsersListTask: getDefaultListTask(leftUsersListTerms),
      peopleInEventListTask: getDefaultListTask(peopleInEventTerms),
      peopleInEventListDict: {},
      recipesInRestaurantTask: getDefaultListTask(recipesInRestaurantTerms),
    }
  }

  componentWillReceiveProps(nextProps) {
    const leftUsersListTask = byListId(nextProps, this.state.leftUsersListTerms, this.state.leftUsersListTask)
    const peopleInEventListTask = byListId(nextProps, this.state.peopleInEventTerms, this.state.peopleInEventListTask)
    const peopleInEventListDict = PeopleInEvent.getOrderedRecipeDict(peopleInEventListTask)
    const selectedUserId = PeopleInEvent.getSelectedUserId(nextProps, peopleInEventListTask, leftUsersListTask)

    this.setState({
      leftUsersListTask,
      peopleInEventListTask,
      peopleInEventListDict,
      selectedUserId,
      recipesInRestaurantTask: byListId(nextProps, this.state.recipesInRestaurantTerms, this.state.recipesInRestaurantTask),
    })
  }

  componentDidMount() {
    const {
      leftUsersListTerms, leftUsersListTask,
      peopleInEventTerms, peopleInEventListTask,
      recipesInRestaurantTerms, recipesInRestaurantTask,
    } = this.state;

    this.props.loadUsersWithoutAnonymousListAction({
      listTask: leftUsersListTask,
      terms: leftUsersListTerms
    })
    this.props.loadPeopleInEventListAction(peopleInEventListTask, peopleInEventTerms);
    this.props.loadRecipesListForRestaurantAction(recipesInRestaurantTask, recipesInRestaurantTerms);
  }

  renderRightPanel() {

    return (
      <div className="column column-beta ">

        <Telescope.components.F8AppAlertSection/>

        <div className="user-details_bookmarks js-user-details_bookmarks">

          <Telescope.components.OrderedUserRightRecipesListView
            {...this.state}
            {...this.props}
          />

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
    const {leftUsersListTask, recipesInRestaurantTask, peopleInEventListTask} = this.state;

    if (leftUsersListTask.ready && recipesInRestaurantTask.ready && peopleInEventListTask.ready) {
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

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

export default withRouter(IEAOrderedUsersInEventsLayout)


