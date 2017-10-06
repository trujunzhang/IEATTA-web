const Parse = require('parse')
import {equalRelationObject} from './parseQuery'

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENT,
} = require('../lib/constants').default


export default class RecipesParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {
    if (!!terms.restaurantId) {
      equalRelationObject(this.query, PARSE_RESTAURANTS, terms.restaurantId)
    }

    if (!!terms.recipeIds) {
      this.query.containedIn('objectId', terms.recipeIds)
    }

    return this
  }

  end() {
    return this.query
  }

}


