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
  // Parse Object Model Status
  PARSE_OBJECT_FLAG_NORMAL,
  PARSE_OBJECT_FLAG_REMOVED,
} = require('./constants').default

const UUID = require('../components/vendor/uuid');

const AppConstants = {}

AppConstants.parseObjectFlags = {
  PARSE_OBJECT_FLAG_NORMAL: '1',
  PARSE_OBJECT_FLAG_REMOVED: '0',
}

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
    parseId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    listPhotoId: ''
  }
}

AppConstants.generateNewRecipeParseObject = function () {
  return {
    id: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    displayName: '',
    price: 0
  }
}

AppConstants.generateNewEventRealmObject = function (restaurant) {
  return {
    parseId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    start: new Date(),
    end: new Date(),
    restaurant: {
      id: restaurant.parseId,
      uniqueId: restaurant.uniqueId
    },
    displayName: '',
    want: ''
  }
}

AppConstants.getRelativeModel = function (modelType, objectSchemaName, parseRelationInstance) {// (For Web)
  const currentPhotoType = AppConstants.realmTypes[objectSchemaName]
  return (currentPhotoType === modelType) ?
    {
      id: parseRelationInstance.id,
      uniqueId: parseRelationInstance.uniqueId
    } :
    {
      id: '',
      uniqueId: ''
    };

}

AppConstants.generateNewRealmPhotoObject = function ({modelType, forObject, currentUser}) { // (For Web)
  let _owner = {id: '', uniqueId: ''}
  if (currentUser.isLoggedIn) {
    _owner = {id: currentUser.id, uniqueId: currentUser.uniqueId}
  }
  return {
    objectId: UUID.create().toString(),
    uniqueId: UUID.create().toString(),
    photoType: modelType,
    forObjectId: forObject.id,
    // Pointer
    restaurant: AppConstants.getRelativeModel(modelType, PARSE_RESTAURANTS, forObject),
    recipe: AppConstants.getRelativeModel(modelType, PARSE_RECIPES, forObject),
    owner: _owner
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

AppConstants.generateNewReviewParseObject = function (user, forItem, objectSchemaName, lastModel = {
  rate: 0,
  body: ''
}) {
  const reviewType = AppConstants.realmTypes[objectSchemaName]
  const relativeObject = AppConstants.generateRelativeObjects(forItem, reviewType);

  return {
    id: lastModel.id || UUID.create().toString(),
    uniqueId: lastModel.uniqueId || UUID.create().toString(),
    // Attributes
    rate: lastModel.rate,
    body: lastModel.body,
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

AppConstants.getUniqueIdByType = function (instance, modelType) {
  const {objectSchemaName} = AppConstants.realmObjects[modelType]

  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return instance.restaurant.uniqueId;
    case PARSE_RECIPES:
      return instance.recipe.uniqueId;
    case PARSE_USERS:
      return instance.user.uniqueId;
  }
}


export default AppConstants;

