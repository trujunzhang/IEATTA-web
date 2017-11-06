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
  EVENTS_LIST_FOR_RESTAURANT,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_MAIN_FORM,
  // Photos Terms parameters type
  PHOTOS_TERMS_PARAM_NORMAL,
  PHOTOS_TERMS_PARAM_FOR_EDIT_RECIPE,
} = require('./constants').default

import Photos from "./photos";
import Reviews from "./reviews";

const UUID = require('../components/vendor/uuid');

const PaginationTerms = {}

PaginationTerms.getCurrentQueryPageIndex = function ({location}) {
  if (!!location.query && location.query.page) {
    let paged = location.query.page;
    if (typeof (paged) === "string") {
      return parseInt(paged);
    }
    return paged;
  }
  return 1;
}

PaginationTerms.generateTermsForReviewsList = function (props, prefix = "list") {
  const {reviewListType} = props;
  const {id} = props.forObject;
  const limit = prefix === "page" ? Reviews.config.paginationCountPerPage : 10;

  const listId = `reviews-${prefix}-view-for-${id}`;

  const currentPageIndex = PaginationTerms.getCurrentQueryPageIndex(props)

  return {
    ...props,
    ...props.location.query,

    objectSchemaName: PARSE_REVIEWS,
    reviewListType,
    listId: listId,
    limit: limit,
    pageIndex: parseInt(currentPageIndex)
  };
}


PaginationTerms.generateTermsForRecipesListOnRestaurant = function ({forObject}, pageIndex = 0) {
  const restaurantId = forObject.id;

  const listId = `recipes-list-view-for-r${restaurantId}`;

  const terms = {
    listId: listId,
    limit: 10,
    restaurantId,
    pageIndex,

    objectSchemaName: PARSE_RECIPES,
  }

  return terms;
}

PaginationTerms.generateTermsForRecipesList = function (props) {

  const forEvent = props.forEvent || {};
  const forRestaurant = props.forRestaurant || {};
  const orderedUser = props.orderedUser || {};
  const forCreator = props.forCreator || {};

  const orderedUserId = orderedUser.id || '';
  const eventId = forEvent.id || '';
  const restaurantId = forRestaurant.id || '';
  const creatorId = forCreator.id || '';

  const listId = `ordered-recipes-list-view-for-u${orderedUserId}-e${eventId}-r${restaurantId}-c${creatorId}`;

  const terms = {
    listId: listId,
    limit: 10,
    orderedUserId,
    eventId,
    restaurantId,
    creatorId,

    objectSchemaName: PARSE_RECIPES,
  };

  return terms;
}


PaginationTerms.generateTermsForPeopleInEventList = function (event) {
  const listId = event.id;

  return {
    listId: 'people-in-event-list-view-for-' + listId,
    limit: -1,
    allItems: true,
    restaurantId: event.restaurant.id,
    eventId: event.id,

    objectSchemaName: PARSE_PEOPLE_IN_EVENTS,
  }
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
    ...extendProps,

    objectSchemaName: PARSE_EVENTS,
  }
}

/**
 *
 * @param forObject: is 'Event' model.
 * @returns {{listId: string, limit: number, eventId, restaurantId: (*|string)}}
 */
PaginationTerms.generateTermsForOrderedUsersList = function ({forObject}) {
  const listId = forObject.id;
  return {
    listId: 'ordered-users-list-view-for-' + listId,
    limit: 10,
    eventId: listId,
    restaurantId: forObject.restaurant.id,

    objectSchemaName: PARSE_PEOPLE_IN_EVENTS,
  }
}

/**
 *
 * @param forObject: is 'Recipe' model.
 * @returns {{listId: string, limit: number, recipeId}}
 */
PaginationTerms.generateTermsForOrderedRecipeUsersList = function ({forObject}) {
  const listId = forObject.id;
  return {
    listId: 'ordered-users-list-view-for-' + listId,
    limit: 10,
    recipeId: listId,
    objectSchemaName: PARSE_USERS,
  }
}


PaginationTerms.generateTermsForRestaurantList = function (props) {
  const {location} = props;

  return {
    ...location.query,
    limit: 10,
    listId: 'single-list-view-for-restaurants',

    objectSchemaName: PARSE_RESTAURANTS,
  };
}

PaginationTerms.generatePhotoTermForRecipe = function (objectSchemaName,
                                                       forObjectId,
                                                       pageForm = PAGE_MAIN_FORM,
                                                       props) {

  const limit = Photos.config.paginationCountPerPage;
  const listId = `photos-page-view-for-parseId-${forObjectId}`

  const currentPageIndex = PaginationTerms.getCurrentQueryPageIndex(props)

  const photoTerms = {
    photoParamsType: PHOTOS_TERMS_PARAM_FOR_EDIT_RECIPE,
    withoutPhotoType: true,
    listId,
    forObjectId,
    objectSchemaName,
    allItems: (limit === -1),
    limit: limit,
    pageIndex: parseInt(currentPageIndex),
  }

  return photoTerms;
}


PaginationTerms.generatePhotoTerm = function (objectSchemaName,
                                              forObjectId,
                                              pageForm = PAGE_MAIN_FORM,
                                              props,
                                              isUserOwnerPhotos = false,
                                              isPhotosBrowserPage = false,
                                              withoutPhotoType = false) {

  let _isPhotosBrowserPage = isPhotosBrowserPage;

  if (isPhotosBrowserPage === false) {
    _isPhotosBrowserPage = (pageForm === PAGE_PHOTOS_BROWSER_FORM);
  }

  const termType = _isPhotosBrowserPage ? 'page' : 'list';
  const limit = _isPhotosBrowserPage ? Photos.config.paginationCountPerPage : -1;
  const listId = `photos-${termType}-view-for-parseId-${forObjectId}`

  const currentPageIndex = PaginationTerms.getCurrentQueryPageIndex(props)

  const extendProps = isUserOwnerPhotos ? {creatorId: forObjectId} : {}

  const photoTerms = {
    photoParamsType: PHOTOS_TERMS_PARAM_NORMAL,
    ...extendProps,
    withoutPhotoType,
    listId,
    forObjectId,
    objectSchemaName,
    allItems: (limit === -1),
    limit: limit,
    pageIndex: parseInt(currentPageIndex)
  }

  return photoTerms;
}

PaginationTerms.generateTermsForUsersWithoutAnonymousList = function (props) {
  return {
    listId: 'current-users-list-without-anonymous',
    allItems: true,
    limit: -1,

    objectSchemaName: PARSE_USERS,
  }
}


export default PaginationTerms;

