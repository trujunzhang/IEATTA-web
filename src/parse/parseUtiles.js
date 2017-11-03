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
      query = new Parse.Query(ParseRestaurant).include('listPhoto')
      break;
    case PARSE_EVENTS:
      query = new Parse.Query(ParseEvent)
      break;
    case PARSE_USERS:
      query = new Parse.Query(ParseUser).include('listPhoto')
      break;
    case PARSE_PEOPLE_IN_EVENTS:
      query = new Parse.Query(ParsePeopleInEvent)
      break;
    case PARSE_REVIEWS:
      query = new Parse.Query(ParseReview)
      break;
    case PARSE_RECIPES:
      query = new Parse.Query(ParseRecipe).include('listPhoto')
      break;
    case PARSE_RECORDS:
      query = new Parse.Query(ParseRecord)
      break;
    case PARSE_PHOTOS:
      query = new Parse.Query(ParsePhoto)
      break;
  }

  let relationsArray = includes;
  switch (type) {
    case PARSE_RECORDS:
      break;
    default:
      relationsArray.push('creator')
      relationsArray.push('creator.listPhoto')
      break;
  }

  relationsArray.map((include) => {
    query = query.include(include)
  })
  return query;
}

function getRestaurantParameters(terms) {
  return new Parameters.Restaurants(getQueryByType(PARSE_RESTAURANTS))
    .addParameters(terms)
    .end()
}

function getEventParameters(terms) {
  return new Parameters.Events(getQueryByType(PARSE_EVENTS, ['restaurant', 'restaurant.listPhoto']))
    .addParameters(terms)
    .end()
}

function getUsersParameters(terms) {
  return new Parameters.Users(getQueryByType(PARSE_USERS))
    .addParameters(terms)
    .end()
}

function getPeopleInEventParameters(terms) {
  return new Parameters.PeopleInEvent(getQueryByType(PARSE_PEOPLE_IN_EVENTS,
    ['user', 'user.listPhoto',
      'event', "restaurant", "recipes"]))
    .addParameters(terms)
    .end()
}

function getReviewsParameters(terms) {
  return new Parameters.Reviews(getQueryByType(PARSE_REVIEWS,
    ['restaurant', 'restaurant.listPhoto',
      'event', 'event.restaurant',
      'recipe', 'recipe.listPhoto',
      'user', 'user.listPhoto'
    ]))
    .addParameters(terms)
    .end()
}

function getRecipesParameters(terms) {
  return new Parameters.Recipes(getQueryByType(PARSE_RECIPES,
    ['restaurant',
      'event',
      'recipe',
      'user', 'user.listPhoto']
  ))
    .addParameters(terms)
    .end()
}

function getPhotosParameters(terms, haveRelations = true) {
  const relations = haveRelations ?
    ['restaurant', 'recipe', 'user'] : []
  return new Parameters.Photos(
    getQueryByType(PARSE_PHOTOS, relations))
    .addParameters(terms)
    .end()
}

function getQueryParameters(objectSchemaName) {

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


export default {
  getQueryByType,
  getRestaurantParameters,
  getEventParameters,
  getReviewsParameters,
  getPhotosParameters,
  getUsersParameters,
  getPeopleInEventParameters,
  getRecipesParameters,
  // By
  getQueryParameters,
  // Update the model's record after saved it.
  checkExistOnlineParseInstance,
  getFirstOnlineParseInstance,
}
