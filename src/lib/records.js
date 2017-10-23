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
  MODEL_FORM_TYPE_FOR_PEOPLE_IN_EVENT,
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
  if (!localRecorder.uniqueId) {
    throw new Error('You need to set a model uniqueId!')
  }

  onlineParseObject.set('flag', '1')

  if (editModelType === MODEL_FORM_TYPE_NEW || editModelType === MODEL_FORM_TYPE_FOR_PEOPLE_IN_EVENT) {
    onlineParseObject.set('uniqueId', localRecorder.uniqueId)
  }

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

      // relation(restaurant)
      _online_restaurant_instance = getInstanceWithoutData(PARSE_RESTAURANTS, localRecorder.restaurant.id)
      onlineParseObject.set('restaurant', _online_restaurant_instance)

      _online_user_Instance = getInstanceWithoutData(PARSE_USERS, localRecorder.creator.id)
      onlineParseObject.set('creator', _online_user_Instance)

      break;

    case PARSE_PHOTOS:

      // step1: common fields.
      onlineParseObject.set('photoType', localRecorder.photoType)
      // Photo images.
      onlineParseObject.set('thumbnailUrl', localRecorder.thumbnailUrl)
      onlineParseObject.set('originalUrl', localRecorder.originalUrl)

      // step2: the logged user submitted the photo(for web).
      if (!!localRecorder.creator) {
        _online_user_Instance = getInstanceWithoutData(PARSE_USERS, localRecorder.creator.id)
        onlineParseObject.set('creator', _online_user_Instance)
      }

      // step3: set the relation by photo type(for web).
      Records.setParseObjectFieldWithoutData(localRecorder.photoType, onlineParseObject, localRecorder.forObjectId)

      // step4: save the restaurant and recipe together.
      if (localRecorder.photoType === 'recipe') {
        _online_restaurant_instance = getInstanceWithoutData(PARSE_RESTAURANTS, localRecorder.restaurant.id)
        onlineParseObject.set('restaurant', _online_restaurant_instance)
      }


      break;

    case PARSE_REVIEWS:

      // step1: common fields.
      onlineParseObject.set('rate', localRecorder.reviewRating)
      onlineParseObject.set('body', localRecorder.reviewBody)

      if (editModelType === MODEL_FORM_TYPE_NEW) {

        onlineParseObject.set('reviewType', localRecorder.reviewType)

        // step2: the logged user submitted the review.
        if (!!localRecorder.currentUserId) {
          onlineParseObject.set('creator', getInstanceWithoutData(PARSE_USERS, localRecorder.currentUserId))
        }

        // step3: set the relation by review type.
        Records.setParseObjectFieldWithoutData(localRecorder.reviewType, onlineParseObject, localRecorder.forObjectId)
      }
      break;

    case PARSE_PEOPLE_IN_EVENTS:

      // Restaurant
      _online_restaurant_instance = getInstanceWithoutData(PARSE_RESTAURANTS, localRecorder.restaurant.id)
      onlineParseObject.set('restaurant', _online_restaurant_instance)

      // Event
      _online_event_instance = getInstanceWithoutData(PARSE_EVENTS, localRecorder.event.id)
      onlineParseObject.set('event', _online_event_instance)

      // User
      _online_user_Instance = getInstanceWithoutData(PARSE_USERS, localRecorder.user.id)
      onlineParseObject.set('user', _online_user_Instance)
      onlineParseObject.set('creator', _online_user_Instance)

      // Recipes Array
      const _recipes_array = localRecorder.newOrderedRecipeIds.map(function (recipeId) {
        return getInstanceWithoutData(PARSE_RECIPES, recipeId)
      })
      onlineParseObject.set('recipes', _recipes_array)

      break;
  }

}


export default Records;
