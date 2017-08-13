const Parse = require('parse')

let Parameters = require('../parameters').default

let {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  ParsePeopleInEvent,
  ParseReview,
  ParseRecipe,
  ParseRecord,
  ParsePhoto,
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
  return new Parameters.PeopleInEvent(getQueryByType(PARSE_PEOPLE_IN_EVENTS, ['user', 'user.photos']))
    .addParameters(terms)
    .end()
}

function getReviewsParameters(terms) {
  return new Parameters.Reviews(getQueryByType(PARSE_REVIEWS, ['restaurant', 'event', 'recipe', 'user', 'user.photos']))
    .addParameters(terms)
    .end()
}

function getRecipesParameters(terms) {
  return new Parameters.Recipes(getQueryByType(PARSE_RECIPES, ['restaurant', 'event', 'recipe', 'user', "photos", 'user.photos']))
    .addParameters(terms)
    .end()
}

function getPhotosParameters(terms) {
  return new Parameters.Photos(getQueryByType(PARSE_PHOTOS))
    .addParameters(terms)
    .end()
}


function setParseObjectFieldWithoutData(parseType, instance, objectId) {
  switch (parseType) {
    case "restaurant":
      instance.set('restaurant', ParseRestaurant.createWithoutData(objectId))
      break;
    case "event":
      instance.set('event', ParseEvent.createWithoutData(objectId))
      break;
    case "recipe":
      instance.set('recipe', ParseRecipe.createWithoutData(objectId))
      break;
    case "user":
      instance.set('user', ParseUser.createWithoutData(objectId))
      break;
    case "review":
      instance.set('review', ParseReview.createWithoutData(objectId))
      break;
    default:
      throw new Error('No matched parseType to create parse without data!')
      break;
  }
}

async function updateParseRecord(recordType, parseInstance) {
  const record = await getQueryByType(PARSE_RECORDS).equalTo(recordType, parseInstance).first()
  if (!!record) {
    await record.save()
  } else {
    const newRecord = new ParseRecord()

    newRecord.set('recordType', recordType)
    // newRecord.set('', model.reviewBody)

  }


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
  updateParseRecord,
}
