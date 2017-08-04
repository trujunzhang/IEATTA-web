const Parse = require('parse')
import moment from 'moment'

let {ParseRestaurant, ParseRecipes, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class RecipesParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.parseUsers) { // related posts
      this.query.include('objectId', terms.parseUsers)
    }

    return this
  }

  end() {
    return this.query
  }

}


