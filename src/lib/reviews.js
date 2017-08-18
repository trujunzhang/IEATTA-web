const _ = require('underscore')
import moment from 'moment'

const Records = require('./records').default
const Photos = require('./photos').default

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
} = require('./constants').default


const Reviews = {
  config: {
    // 6/11/2017
    dateFormat: 'DD/MM/YYYY'
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
  const {objectSchemaName} = Records.realmObjects[review.reviewType]

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
  const {objectSchemaName} = Records.realmObjects[review.reviewType]

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
        {title: 'Normal Sort', query: null},
        {title: 'Newest First', query: ''},
        {title: 'Oldest First', query: ''},
        {title: 'Highest Rated', query: ''},
        {title: 'Lowest Rated', query: ''},
      ]
    case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
      return [
        {title: 'Normal Sort', query: 'normal'},
        {title: 'Newest First', query: 'newest'},
        {title: 'Oldest First', query: 'oldest'},
        {title: 'Highest Rated', query: 'highest'},
        {title: 'Lowest Rated', query: 'lowest'},
      ]

  }
}

Reviews.getCurrentSelectedDropMenuIndex = function (dropMenus) {

  return 0;
}

export default Reviews;
