import moment from 'moment'

const {ParseRestaurant, ParseEvent, ParseRecipe, ParseUser, ParseReview} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {} = require('../lib/constants').default

export default class ReviewsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.forUserProfile) {
      this.query.equalTo('user', ParseUser.createWithoutData(terms.forObject.id))
    }
    if (terms.reviewType) {
      this.query.equalTo('reviewType', terms.reviewType)
      if (terms.forObject) {

        switch (terms.reviewType) {
          case 'restaurant':
            this.query.equalTo('restaurant', ParseRestaurant.createWithoutData(terms.forObject.id))
            break;
          case 'event':
            this.query.equalTo('event', ParseEvent.createWithoutData(terms.forObject.id))
            break;
          case 'recipe':
            this.query.equalTo('recipe', ParseRecipe.createWithoutData(terms.forObject.id))
            break;
        }

      }
    }


    return this
  }

  end() {
    return this.query
  }

}


