/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // List Type.
  EVENTS_LIST_FOR_RESTAURANT
} = require('./constants').default

import Reviews from "./reviews";
import {getCurrentPageIndex} from './link'

const UUID = require('../components/vendor/uuid');

const PaginationTerms = {}

PaginationTerms.generateTermsForReviewsList = function (props, prefix = "list") {
  const {id} = props.forObject;
  const limit = prefix === "page" ? Reviews.config.paginationCountPerPage : 10;

  const listId = `reviews-${prefix}-view-for-${id}`;

  const currentPageIndex = getCurrentPageIndex(props)

  return {
    ...props,
    ...props.location.query,

    listId: listId,
    limit: limit,
    pageIndex: parseInt(currentPageIndex)
  };
}


PaginationTerms.generateTermsForRecipesList = function (props) {
  const forEvent = props.forEvent || {};
  const forRestaurant = props.forRestaurant || {};
  const orderedUser = props.orderedUser || {};

  const orderedUserId = orderedUser.id || '';
  const eventId = forEvent.id || '';
  const restaurantId = forRestaurant.id || '';

  const listId = `ordered-recipes-list-view-for-${orderedUserId}-e-${eventId}-r-${restaurantId}`;

  const terms = {
    listId: listId,
    limit: 10,
    orderedUserId: orderedUserId,
    eventId: eventId,
    restaurantId: restaurantId
  };

  return terms;
}


PaginationTerms.generateTermsForEventsList = function ({eventType, forObject}) {
  const listId = forObject.id;
  const extendProps = (eventType === EVENTS_LIST_FOR_RESTAURANT) ? {
    restaurantId: listId
  } : {
    userId: listId
  }

  return {
    listId: 'event-list-view-for-' + listId,
    limit: 10,
    ...extendProps
  };
}

PaginationTerms.generateTermsForOrderedUsersList = function (props) {
  const listId = props.forObject.id;
  return {
    listId: 'ordered-users-list-view-for-' + listId,
    limit: 10,
    eventId: listId,
    restaurantId: props.forObject.restaurant.id
  };
}


PaginationTerms.generateTermsForRestaurantList = function (props) {
  const {location} = props;

  return {
    ...location.query,
    limit: 10,
    listId: 'single-list-view-for-restaurants'
  };
}


export default PaginationTerms;

