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


const {
  getInstanceWithoutData,
} = require('../parse/objects').default

const Parse = require('parse')

const UUID = require('../components/vendor/uuid');
const Records = {}


Records.SubDomainPhotos = {
  'restaurant': 'biz_photos',
  'recipe': 'recipe_photos',
}

Records.realmObjects = {
  'record': {objectSchemaName: PARSE_RECORDS},
  'restaurant': {objectSchemaName: PARSE_RESTAURANTS},
  'event': {objectSchemaName: PARSE_EVENTS},
  'peopleInEvent': {objectSchemaName: PARSE_PEOPLE_IN_EVENTS},
  'user': {objectSchemaName: PARSE_USERS},
  'recipe': {objectSchemaName: PARSE_RECIPES},
  'photo': {objectSchemaName: PARSE_PHOTOS},
  'review': {objectSchemaName: PARSE_REVIEWS},
}

Records.realmTypes = {
  PARSE_RECORDS: 'record',
  PARSE_RESTAURANTS: 'restaurant',
  PARSE_EVENTS: 'event',
  PARSE_PEOPLE_IN_EVENTS: 'peopleInEvent',
  PARSE_USERS: 'user',
  PARSE_RECIPES: 'recipe',
  PARSE_PHOTOS: 'photo',
  PARSE_REVIEWS: 'review'
}

Records.toFirstUpperString = function (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

Records.generateNewOnlineParseInstance = function (onlineParseObject, objectSchemaName, model) {

  onlineParseObject.set('flag', '1')
  onlineParseObject.set('uniqueId', UUID.create().toString())

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', model.displayName)
      const _geoLocation = new Parse.GeoPoint({
        latitude: model.latitude,
        longitude: model.longitude
      })
      onlineParseObject.set('geoLocation', _geoLocation)

      break;
    case PARSE_EVENTS:
      debugger
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', model.displayName)
      // onlineParseObject.set('start', model.start)
      // onlineParseObject.set('end', model.end)
      onlineParseObject.set('want', model.want)
      break;
    case PARSE_RECIPES:
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', model.displayName)
      onlineParseObject.set('price', model.price)
      break;
    case PARSE_PHOTOS:
      debugger
      // step1: common fields.
      onlineParseObject.set('photoType', model.modelType)
      onlineParseObject.set('thumbnail', model.thumbnail)

      // step2: the logged user submitted the review.
      Records.setParseObjectFieldWithoutData('user', onlineParseObject, model.currentUserId)

      // step3: set the relation by review type.
      Records.setParseObjectFieldWithoutData(model.modelType, onlineParseObject, model.forObjectId)
      break;
    case PARSE_USERS:

      break;
    case PARSE_REVIEWS:
      // step1: common fields.
      onlineParseObject.set('rate', model.reviewRating)
      onlineParseObject.set('body', model.reviewBody)
      onlineParseObject.set('reviewType', model.reviewType)

      // step2: the logged user submitted the review.
      Records.setParseObjectFieldWithoutData('user', onlineParseObject, model.currentUserId)

      // step3: set the relation by review type.
      Records.setParseObjectFieldWithoutData(model.reviewType, onlineParseObject, model.forObjectId)
      break;
  }
}

Records.setParseObjectFieldWithoutData = function (parseType, instance, parseInstanceId) {
  const {objectSchemaName, realmSchema} = Records.realmObjects[parseType];
  const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseInstanceId)
  instance.set(parseType, instanceWithoutData);
}


export default Records;
