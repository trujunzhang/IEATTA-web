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

    equalRelationObject(PARSE_USERS, terms.userId)

    equalRelationObject(PARSE_EVENTS, terms.eventId)

    equalRelationObject(PARSE_RESTAURANTS, terms.restaurantId)

    return this
  }

  end() {
    return this.query
  }

}


