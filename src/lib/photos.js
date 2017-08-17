import Telescope from './settings'

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

const Records = require('./records').default
const Photos = {}

/**
 * @summary Photos config namespace
 * @type {Object}
 */
Photos.config = {}

Photos.getThumbnailUrl = function (photo) {
  return photo.thumbnail._url;
}

Photos.getOriginalUrl = function (photo) {
  return photo.original._url;
}

Photos.getThumbnailUrlByReviewType = function (review) {
  const {reviewType} = review;

  const {objectSchemaName} = Records.realmObjects[reviewType]

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return Photos.getListThumbnailUrl(review.restaurant);
    case PARSE_EVENTS:
      return Photos.getListThumbnailUrl(review.event.restaurant);
    case PARSE_RECIPES:
      return Photos.getListThumbnailUrl(review.recipe);
  }
}


Photos.getListThumbnailUrl = function (item) {
  const photos = item.photos || [];

  if (photos.length > 0) {
    const firstPhoto = photos[0];
    const _thumbnail = firstPhoto.thumbnail || {};
    return _thumbnail._url || '';
  }

  return '';
}

Photos.getPhotoThumbnailByPosition = function (photos, index) {
  const firstPhoto = photos[index];
  return Photos.getThumbnailUrl(firstPhoto)
}


export default Photos
