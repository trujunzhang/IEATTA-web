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

    const {userId, eventId, restaurantId, recipeId} = terms;

    if (!!userId) {
      equalToRelationObject(this.query, PARSE_USERS, userId)
    }

    if (!!eventId) {
      equalToRelationObject(this.query, PARSE_EVENTS, eventId)
    }

    if (!!restaurantId) {
      equalToRelationObject(this.query, PARSE_RESTAURANTS, restaurantId)
    }

    if (!!recipeId) {
      containInRelationObject(this.query, PARSE_RECIPES, recipeId, 'recipes')
    }

    return this
  }

  end() {
    return this.query
  }

}


