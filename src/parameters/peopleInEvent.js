/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_EVENTS,
  PARSE_RECIPES,
} = require('../lib/constants').default

import {
  equalToRelationObject,
  containInRelationObject
} from './parseQuery'

export default class PeopleInEventParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {
    if (!!terms.userId) {
      equalToRelationObject(this.query, PARSE_USERS, terms.userId)
    }

    if (!!terms.eventId) {
      equalToRelationObject(this.query, PARSE_EVENTS, terms.eventId)
    }

    if (!!terms.restaurantId) {
      equalToRelationObject(this.query, PARSE_RESTAURANTS, terms.restaurantId)
    }

    if (!!terms.recipeId) {
      containInRelationObject(this.query, PARSE_RECIPES, terms.recipeId)
    }

    return this
  }

  end() {
    return this.query
  }

}


