const Parse = require('parse')
import moment from 'moment'

const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  ParsePhoto,
  ParseRecipe
} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class photosParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.photoType) {
      this.query.equalTo('photoType', terms.photoType)
      switch (terms.photoType) {
        case 'restaurant':
          this.query.equalTo('restaurant', ParseRestaurant.createWithoutData(terms.forObject.id))
          break;
        case 'recipe':
          this.query.equalTo('recipe', ParseRecipe.createWithoutData(terms.forObject.id))
          break;
      }
    }

    return this
  }

  end() {
    return this.query
  }

}


