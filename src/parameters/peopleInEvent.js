const Parse = require('parse')
import moment from 'moment'

let {ParseRestaurant, ParseEvent, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class PeopleInEventParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

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


