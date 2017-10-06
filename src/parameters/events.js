/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS
} = require('../lib/constants').default

import {equalToRelationObject} from './parseQuery'

export default class EventsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    equalToRelationObject(this.query, PARSE_USERS, terms.userId)

    equalToRelationObject(this.query, PARSE_RESTAURANTS, terms.restaurantId)

    return this
  }

  end() {
    return this.query
  }

}


