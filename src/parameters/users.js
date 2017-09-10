const Parse = require('parse')
import moment from 'moment'

let {ParseRestaurant, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class UsersParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {


    return this
  }

  end() {
    return this.query
  }

}


