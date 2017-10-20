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
      recipesInRestaurantTask: getDefaultListTask(recipesInRestaurantTerms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leftUsersListTask: byListId(nextProps, this.state.leftUsersListTerms, this.state.leftUsersListTask),
      peopleInEventListTask: byListId(nextProps, this.state.peopleInEventTerms, this.state.peopleInEventListTask),
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
    const {recipesInRestaurantTask} = this.state;
    const {
      ready,
      results
    } = recipesInRestaurantTask;

    if (ready) {
      // debugger
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


