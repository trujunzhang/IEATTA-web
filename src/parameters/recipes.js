import {equalRelationObject} from './parseQuery'


export default class RecipesParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    equalRelationObject(PARSE_USERS, terms.orderedUserId)

    equalRelationObject(PARSE_EVENTS, terms.eventId)

    equalRelationObject(PARSE_RESTAURANTS, terms.restaurantId)

    return this
  }

  end() {
    return this.query
  }

}


