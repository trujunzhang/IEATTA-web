const Parse = require('parse')
import moment from 'moment'

let {ParseRestaurant, ParseEvent, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class RecipesParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    debugger

    if (terms.orderedUserId) {
      this.query.equalTo('user', ParseUser.createWithoutData(terms.orderedUserId))
    }

    if (terms.eventId) {
      this.query.equalTo('event', ParseEvent.createWithoutData(terms.eventId))
    }

    if (terms.restaurantId) {
      this.query.equalTo('restaurant', ParseRestaurant.createWithoutData(terms.restaurantId))
    }

    return this
  }

  end() {
    return this.query
  }

}


