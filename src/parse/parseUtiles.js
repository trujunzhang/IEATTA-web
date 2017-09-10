const Parse = require('parse')

const Parameters = require('../parameters').default

const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  ParsePeopleInEvent,
  ParseReview,
  ParseRecipe,
  ParseRecord,
  ParsePhoto,
  createParseInstance,
} = require('./objects').default

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_PEOPLE_IN_EVENTS,
  PARSE_USERS,
  PARSE_REVIEWS,
  PARSE_RECIPES,
  PARSE_RECORDS,
  PARSE_PHOTOS,
} = require('../lib/constants').default

function getQueryByType(type: string, includes: Array = []) {
  let query = null;
  switch (type) {
    case PARSE_RESTAURANTS:
      query = new Parse.Query(ParseRestaurant)
      break;
    case PARSE_EVENTS:
      query = new Parse.Query(ParseEvent)
      break;
    case PARSE_USERS:
      query = new Parse.Query(ParseUser)
      break;
    case PARSE_PEOPLE_IN_EVENTS:
      query = new Parse.Query(ParsePeopleInEvent)
      break;
    case PARSE_REVIEWS:
      query = new Parse.Query(ParseReview)
      break;
    case PARSE_RECIPES:
      query = new Parse.Query(ParseRecipe)
      break;
    case PARSE_RECORDS:
      query = new Parse.Query(ParseRecord)
      break;
    case PARSE_PHOTOS:
      query = new Parse.Query(ParsePhoto)
      break;
  }

  includes.map((include) => {
    query = query.include(include)
  })
  return query;
}

function getRestaurantParameters(terms) {
  return new Parameters.Posts(getQueryByType(PARSE_RESTAURANTS, ['photos']))
    .addParameters(terms)
    .end()
}

function getEventParameters(terms) {
  return new Parameters.Events(getQueryByType(PARSE_EVENTS))
    .addParameters(terms)
    .end()
}

function getUsersParameters(terms) {
  return new Parameters.Users(getQueryByType(PARSE_USERS, ['photos']))
    .addParameters(terms)
    .end()
}

function getPeopleInEventParameters(terms) {
  return new Parameters.PeopleInEvent(getQueryByType(PARSE_PEOPLE_IN_EVENTS, ['user', 'user.photos', 'event']))
    .addParameters(terms)
    .end()
}

function getReviewsParameters(terms) {
  return new Parameters.Reviews(getQueryByType(PARSE_REVIEWS, [
    'restaurant', 'restaurant.photos',
    'event', 'event.restaurant',
    'recipe', 'recipe.photos',
    'user', 'user.photos'
  ]))
    .addParameters(terms)
    .end()
}

function getRecipesParameters(terms) {
  return new Parameters.Recipes(getQueryByType(PARSE_RECIPES,
    ['restaurant', 'event', 'recipe', 'user', "photos", 'user.photos']
  ))
    .addParameters(terms)
    .end()
}

function getPhotosParameters(terms) {
  return new Parameters.Photos(getQueryByType(PARSE_PHOTOS,
    ['restaurant', 'recipe', 'user', 'user.photos']
  ))
    .addParameters(terms)
    .end()
}

async function checkExistOnlineParseInstance(objectSchemaName, realmInstance) {
  return await getQueryByType(objectSchemaName).equalTo('uniqueId', realmInstance.uniqueId).count() > 0
}

async function getFirstOnlineParseInstance(objectSchemaName, realmInstance) {
  if (!realmInstance || !realmInstance.uniqueId || realmInstance.uniqueId === "") {
    return null;
  }
  return await getQueryByType(objectSchemaName).equalTo('uniqueId', realmInstance.uniqueId).first()
}

async function getFirstOnlineRecorderInstance(localRecorderUniqueId) {
  return await getQueryByType(PARSE_RECORDS).equalTo('recordUniqueId', localRecorderUniqueId).first()
}

export default {
  getQueryByType,
  getRestaurantParameters,
  getEventParameters,
  getReviewsParameters,
  getPhotosParameters,
  getUsersParameters,
  getPeopleInEventParameters,
  getRecipesParameters,
  // Update the model's record after saved it.
  checkExistOnlineParseInstance,
  getFirstOnlineParseInstance,
  getFirstOnlineRecorderInstance
}
