import moment from 'moment'

const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  getInstanceWithoutData
} = require('../parse/objects').default

const Parse = require('parse')

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS
} = require('../lib/constants').default

export default class EventsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {
    if (terms.userId) {
      const instanceWithoutData = getInstanceWithoutData(PARSE_USERS, terms.userId)
      this.query.equalTo('user', instanceWithoutData)
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


