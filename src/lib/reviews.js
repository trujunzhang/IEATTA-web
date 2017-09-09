const _ = require('underscore')
import moment from 'moment'

import Photos from './photos'
import AppConstants from './appConstants'

import {
  getRestaurantLink,
  getEventLink,
  getOrderedRecipeLink,
} from './link'

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
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
  // Review Sort
  REVIEW_SORT_NORMAL,
  REVIEW_SORT_NEWEST,
  REVIEW_SORT_OLDEST,
  REVIEW_SORT_HIGHEST,
  REVIEW_SORT_LOWEST,
  MODEL_FORM_TYPE_EDIT,
  MODEL_FORM_TYPE_NEW,
} = require('./constants').default

const Reviews = {
  config: {
    paginationCountPerPage: 2,
    // 6/11/2017
    dateFormat: 'DD/MM/YYYY'
  },
  SORT_TAGS: {
    REVIEW_SORT_NORMAL: 'normal',
    REVIEW_SORT_NEWEST: 'newest',
    REVIEW_SORT_OLDEST: 'oldest',
    REVIEW_SORT_HIGHEST: 'highest',
    REVIEW_SORT_LOWEST: 'lowest',
  }
}

Reviews.getHtmlBody = function (review) {
  let html = review.body;
  if (html) {
    html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '</p>';
  }
  const htmlBody = {__html: html};

  return htmlBody;
}

Reviews.toDateString = function (date) {
  return moment(date).format(Reviews.config.dateFormat)
}


Reviews.getReviewObjectByType = function (review) {
  const {objectSchemaName} = AppConstants.realmObjects[review.reviewType]

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return {
        avatorUrl: Photos.getListThumbnailUrl(review.restaurant),
        title: review.restaurant.displayName,
        detailUrl: getRestaurantLink(review.restaurant),
        breadcrumbs: [
          {
            title: review.restaurant.displayName,
            url: getRestaurantLink(review.restaurant)
          }
        ],
        thirdRow: review.restaurant.address
      }
    case PARSE_EVENTS:
      return {
        avatorUrl: Photos.getListThumbnailUrl(review.event.restaurant),
        title: review.event.displayName,
        detailUrl: getEventLink(review.event),
        breadcrumbs: [
          {
            title: review.event.restaurant.displayName,
            url: getRestaurantLink(review.event.restaurant)
          },
          {
            title: review.event.displayName,
            url: getEventLink(review.event)
          }
        ],
        thirdRow: review.event.restaurant.address
      }
    case PARSE_RECIPES:
      return {
        avatorUrl: Photos.getListThumbnailUrl(review.recipe),
        title: review.recipe.displayName,
        detailUrl: getOrderedRecipeLink(review.recipe),
        breadcrumbs: [],
        thirdRow: `$ ${review.recipe.price}`
      }
  }

}

Reviews.getThumbnailUrlByReviewType = function (review) {
  const {objectSchemaName} = AppConstants.realmObjects[review.reviewType]

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return Photos.getListThumbnailUrl(review.restaurant);
    case PARSE_EVENTS:
      return Photos.getListThumbnailUrl(review.event.restaurant);
    case PARSE_RECIPES:
      return Photos.getListThumbnailUrl(review.recipe);
  }

}

Reviews.getCurrentSortArray = function (reviewListType) {
  switch (reviewListType) {
    case REVIEW_LIST_TYPE_NORMAL:
      return [
        {title: 'Normal Sort', queryTag: REVIEW_SORT_NORMAL},
        {title: 'Newest First', queryTag: REVIEW_SORT_NEWEST},
        {title: 'Oldest First', queryTag: REVIEW_SORT_OLDEST},
        {title: 'Highest Rated', queryTag: REVIEW_SORT_HIGHEST},
        {title: 'Lowest Rated', queryTag: REVIEW_SORT_LOWEST},
      ]
    case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
      return [
        {title: 'Normal Sort', queryTag: REVIEW_SORT_NORMAL},
        {title: 'Newest First', queryTag: REVIEW_SORT_NEWEST},
        {title: 'Oldest First', queryTag: REVIEW_SORT_OLDEST},
        {title: 'Highest Rated', queryTag: REVIEW_SORT_HIGHEST},
        {title: 'Lowest Rated', queryTag: REVIEW_SORT_LOWEST},
      ]

  }
}

Reviews.getCurrentSelectedDropMenuIndex = function (dropMenus, props) {
  const sort = props.location.query.sort_by || '';
  const tags = Reviews.SORT_TAGS;
  if (sort !== '') {
    const index = Object.values(tags).indexOf(sort)
    if (index !== -1) {
      return index;
    }
  }

  return 0;
}

Reviews.getSortTag = function (sort) {
  return _.invert(Reviews.SORT_TAGS)[sort];
}

Reviews.checkCanEditReview = function ({review, currentUser}) {
  const {user} = review;
  if (!!currentUser.uniqueId && !!user.uniqueId && user.uniqueId === currentUser.uniqueId) {
    return true;
  }

  return false;
}

Reviews.canShowPage = function ({forObject, pageForm, review}) {
  switch (pageForm) {
    case MODEL_FORM_TYPE_EDIT:
      if (!!forObject && !!review) {
        return true;
      }
      break;
    case MODEL_FORM_TYPE_NEW:
      if (!!forObject) {
        return true;
      }
      break;
  }

  return false;
}

export default Reviews;
