const Parse = require('parse')

let Parameters = require('../parameters').default

let {ParseRestaurant, ParseEvent, ParseUser} = require('./objects').default


/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_USERS,
} = require('../lib/constants').default

function getQueryByType(type: string = PARSE_RESTAURANTS) {
  switch (type) {
    case PARSE_RESTAURANTS:
      return new Parse.Query(ParseRestaurant).include('photos')
    case PARSE_EVENTS:
      return new Parse.Query(ParseEvent)
    case PARSE_USERS:
      return new Parse.Query(ParseUser)
  }

}

function getRestaurantParameters(terms) {
  return new Parameters.Posts(getQueryByType())
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

function getTopicsParameters(terms) {
  return new Parameters.Topics(getQueryByType(PARSE_TOPICS))
    .addParameters(terms)
    .end()
}

export default {
  getQueryByType,
  getRestaurantParameters,
  getEventParameters,
  getUsersParameters,
  getTopicsParameters
}
