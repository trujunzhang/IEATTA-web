const Parse = require('parse')

let Parameters = require('../parameters').default

let {ParseRestaurant, ParseEvent, ParseUser, ParsePeopleInEvent} = require('./objects').default


/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_PEOPLE_IN_EVENTS,
  PARSE_USERS,
} = require('../lib/constants').default

function getQueryByType(type: string, includes: Array = []) {
  let query = null;
  switch (type) {
    case PARSE_RESTAURANTS:
      query = new Parse.Query(ParseRestaurant).include('photos')
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
  }

  includes.map((include) => {
    query = query.include(include)
  })
  return query;
}

function getRestaurantParameters(terms) {
  return new Parameters.Posts(getQueryByType(PARSE_RESTAURANTS))
    .addParameters(terms)
    .end()
}

function getEventParameters(terms) {
  return new Parameters.Events(getQueryByType(PARSE_EVENTS))
    .addParameters(terms)
    .end()
}

function getUsersParameters(terms) {
  return new Parameters.Users(getQueryByType(PARSE_USERS))
    .addParameters(terms)
    .end()
}

function getPeopleInEventParameters(terms) {
  return new Parameters.PeopleInEvent(getQueryByType(PARSE_PEOPLE_IN_EVENTS, ['user']))
    .addParameters(terms)
    .end()
}

export default {
  getQueryByType,
  getRestaurantParameters,
  getEventParameters,
  getUsersParameters,
  getPeopleInEventParameters,
}
