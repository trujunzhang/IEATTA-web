const {
  ParseRestaurant, ParseEvent, ParseUser,
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

export default class PeopleInEventParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.eventId) {
      const instanceWithoutData = getInstanceWithoutData(PARSE_USERS, terms.eventId)
      this.query.equalTo('event', instanceWithoutData)
    }

    if (terms.restaurantId) {
      const instanceWithoutData = getInstanceWithoutData(PARSE_RESTAURANTS, terms.restaurantId)
      this.query.equalTo('restaurant', instanceWithoutData)
    }

    return this
  }

  end() {
    return this.query
  }

}


