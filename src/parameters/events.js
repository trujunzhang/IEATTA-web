import moment from 'moment'

const {ParseRestaurant, ParseEvent, ParseUser} = require('../parse/objects').default

const Parse = require('parse')

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class EventsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    debugger

    if (terms.restaurantId) {
      this.query.equalTo('restaurant', ParseRestaurant.createWithoutData(terms.restaurantId))
    }

    return this
  }

  end() {
    return this.query
  }

}


