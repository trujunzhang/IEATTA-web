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
  // Edit form
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
} = require('./constants').default

const {
  getInstanceWithoutData,
  appendGeoLocation
} = require('../parse/objects').default

import AppConstants from './appConstants'

const UUID = require('../components/vendor/uuid');

const {
  getFirstOnlineParseInstance
} = require('../parse/parseUtiles').default

const Records = {}

Records.toFirstUpperString = function (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

Records.setParseObjectFieldWithoutData = function (parseType, instance, parseInstanceId) {
  const {objectSchemaName} = AppConstants.realmObjects[parseType];
  const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseInstanceId)
  instance.set(parseType, instanceWithoutData);
}

Records.setParseObjectFieldWithoutDataBySchema = function (objectSchemaName, instance, parseInstanceId) {
  const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseInstanceId)
  const parseType = AppConstants.realmTypes[objectSchemaName]
  instance.set(parseType, instanceWithoutData);
}


Records.createOnlineParseInstance = async function (editModelType, onlineParseObject, objectSchemaName, localRecorder) {

  debugger

  if (!localRecorder.uniqueId) {
    throw new Error('You need to set a model uniqueId!')
  }

  onlineParseObject.set('flag', '1')

  if (editModelType === MODEL_FORM_TYPE_NEW) {
    onlineParseObject.set('uniqueId', localRecorder.uniqueId)
  }

  debugger

  let _online_user_Instance = null;
  let _online_restaurant_instance = null;
  let _online_event_instance = null;
  let _online_recipe_instance = null;

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', localRecorder.displayName)
      appendGeoLocation(onlineParseObject, localRecorder, 'geoLocation')

      // Extend google address information.
      onlineParseObject.set('address', localRecorder.address)
      onlineParseObject.set('street_number', localRecorder.street_number)
      onlineParseObject.set('route', localRecorder.route)
      onlineParseObject.set('locality', localRecorder.locality)
      onlineParseObject.set('sublocality', localRecorder.sublocality)
      onlineParseObject.set('country', localRecorder.country)
      onlineParseObject.set('postal_code', localRecorder.postal_code)
      onlineParseObject.set('administrative_area', localRecorder.administrative_area)
      break;
    case PARSE_EVENTS:
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', localRecorder.displayName)
      onlineParseObject.set('start', localRecorder.start)
      onlineParseObject.set('end', localRecorder.end)
      onlineParseObject.set('want', localRecorder.want)

      if (editModelType === MODEL_FORM_TYPE_NEW) {
        // relation
        _online_restaurant_instance = await getFirstOnlineParseInstance(PARSE_RESTAURANTS, localRecorder.restaurant)
        onlineParseObject.set('restaurant', _online_restaurant_instance)
      }
      break;
    case PARSE_RECIPES:
      // Basic Fields
      // Attributes
      onlineParseObject.set('displayName', localRecorder.displayName)
      onlineParseObject.set('price', localRecorder.price)
      break;
    case PARSE_PHOTOS:
      // step1: common fields.
      onlineParseObject.set('photoType', localRecorder.modelType)
      // Photo images.
      onlineParseObject.set('thumbnail', localRecorder.thumbnail)
      onlineParseObject.set('original', localRecorder.thumbnail)

      // step2: the logged user submitted the photo (for web).
      Records.setParseObjectFieldWithoutData('user', onlineParseObject, localRecorder.currentUserId)

      // step3: set the relation by photo type(for web).
      Records.setParseObjectFieldWithoutData(localRecorder.modelType, onlineParseObject, localRecorder.forObjectId)
      break;
    case PARSE_REVIEWS:
      debugger

      // step1: common fields.
      onlineParseObject.set('rate', localRecorder.reviewRating)
      onlineParseObject.set('body', localRecorder.reviewBody)


      debugger

      if (editModelType === MODEL_FORM_TYPE_NEW) {

        debugger

        onlineParseObject.set('reviewType', localRecorder.reviewType)

        // step2: the logged user submitted the review.
        Records.setParseObjectFieldWithoutData('user', onlineParseObject, localRecorder.currentUserId)

        // step3: set the relation by review type.
        Records.setParseObjectFieldWithoutData(localRecorder.reviewType, onlineParseObject, localRecorder.forObjectId)
      }
      break;
  }

}


export default Records;
