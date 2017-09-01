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

    equalRelationObject(this.query, PARSE_USERS, terms.orderedUserId)

    equalRelationObject(this.query, PARSE_EVENTS, terms.eventId)

    equalRelationObject(this.query, PARSE_RESTAURANTS, terms.restaurantId)

    return this
  }

  end() {
    return this.query
  }

}


