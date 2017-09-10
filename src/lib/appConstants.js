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

const UUID = require('../components/vendor/uuid');

const AppConstants = {}

AppConstants.realmObjects = {
  'record': {objectSchemaName: PARSE_RECORDS},
  'restaurant': {objectSchemaName: PARSE_RESTAURANTS},
  'event': {objectSchemaName: PARSE_EVENTS},
  'peopleInEvent': {objectSchemaName: PARSE_PEOPLE_IN_EVENTS},
  'user': {objectSchemaName: PARSE_USERS},
  'recipe': {objectSchemaName: PARSE_RECIPES},
  'photo': {objectSchemaName: PARSE_PHOTOS},
  'review': {objectSchemaName: PARSE_REVIEWS},
}

AppConstants.realmTypes = {
  PARSE_RECORDS: 'record',
  PARSE_RESTAURANTS: 'restaurant',
  PARSE_EVENTS: 'event',
  PARSE_PEOPLE_IN_EVENTS: 'peopleInEvent',
  PARSE_USERS: 'user',
  PARSE_RECIPES: 'recipe',
  PARSE_PHOTOS: 'photo',
  PARSE_REVIEWS: 'review'
}

AppConstants.SubDomainPhotos = {
  PARSE_RESTAURANTS: 'biz_photos',
  PARSE_RECIPES: 'recipe_photos',
  PARSE_USERS: 'user_local_photos',
}


AppConstants.generateNewRestaurantRealmObject = function () {
  return {
    objectId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    listPhotoId: ''
  }
}

AppConstants.generateNewEventRealmObject = function (restaurant) {
  return {
    objectId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    start: new Date(),
    end: new Date(),
    restaurant: {
      id: restaurant.objectId,
      uniqueId: restaurant.uniqueId
    },
    // For test
    displayName: 'e001',
    want: 'first Event'
  }
}

AppConstants.getRelativeModel = function (modelType, objectSchemaName, modelSchema) {
  const currentPhotoType = AppConstants.realmTypes[objectSchemaName]

  return (currentPhotoType === modelType) ?
    {
      id: modelSchema.objectId,
      uniqueId: modelSchema.uniqueId
    } :
    {
      id: '',
      uniqueId: ''
    };

}

AppConstants.generateNewRealmPhotoObject = function ({modelType, model}) {
  return {
    objectId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    photoType: modelType,
    // Pointer
    restaurant: AppConstants.getRelativeModel(modelType, PARSE_RESTAURANTS, model),
    recipe: AppConstants.getRelativeModel(modelType, PARSE_RECIPES, model),
    user: AppConstants.getRelativeModel(modelType, PARSE_USERS, model),

  }
}

AppConstants.generateRelativeObjects = function (forParseInstance, reviewType) {
  const defaultRelativeObject =
    {
      restaurant: {id: '', uniqueId: ''},
      event: {id: '', uniqueId: ''},
      recipe: {id: '', uniqueId: ''}
    };
  defaultRelativeObject[reviewType] =
    {
      id: forParseInstance.id,
      uniqueId: forParseInstance.uniqueId
    }
  return defaultRelativeObject;
}

AppConstants.generateNewReviewObject = function (user, forItem, objectSchemaName, reviewRating = 0, lastModel = {}) {
  const reviewType = AppConstants.realmTypes[objectSchemaName]
  const relativeObject = AppConstants.generateRelativeObjects(forItem, reviewType);
  debugger
  return {
    objectId: lastModel.objectId || UUID.create().toString(),
    uniqueId: lastModel.uniqueId || UUID.create().toString(),
    // Attributes
    rate: reviewRating,
    body: lastModel.body || '',
    reviewType: reviewType,
    // Pointer
    user: {
      id: user.id || '',
      uniqueId: user.uniqueId || ''
    },
    // Relation
    ...relativeObject,
  }
}


export default AppConstants;

