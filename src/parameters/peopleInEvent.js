const {
  getInstanceWithoutData
} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_EVENTS
} = require('../lib/constants').default

import {equalRelationObject} from './parseQuery'

export default class PeopleInEventParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    debugger

    if (!!terms.userId) {
      equalRelationObject(this.query, PARSE_USERS, terms.userId)
    }

    if (!!terms.eventId) {
      equalRelationObject(this.query, PARSE_EVENTS, terms.eventId)
    }

    if (!!terms.restaurantId) {
      equalRelationObject(this.query, PARSE_RESTAURANTS, terms.restaurantId)
    }

    return this
  }

  end() {
    return this.query
  }

}


