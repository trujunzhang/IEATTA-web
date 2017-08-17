const _ = require('underscore')
import moment from 'moment'

const Records = require('./records').default
const Photos = require('./photos').default

import {
  getRestaurantLink,
  getEventLink,
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
  PARSE_PEOPLE_IN_EVENTS
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
        array: [
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
        array: [
          {
            title: review.event.restaurant.displayName,
            url: getRestaurantLink(review.event.restaurant)
          },
          {
            title: review.event.displayName,
            url: getEventLink(review.event)
          }
        ],
        thirdRow: review.restaurant.address
      }
    case PARSE_RECIPES:
      return {
        avatorUrl: Photos.getListThumbnailUrl(review.recipe),
        title: review.recipe.displayName,
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

export default Reviews;
