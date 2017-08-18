const {ParseRestaurant, ParseEvent, ParseRecipe, ParseUser, ParseReview} = require('../parse/objects').default

import Reviews from '../lib/reviews'

/**
 * The states were interested in
 */
const {
  // Review Sort
  REVIEW_SORT_NORMAL,
  REVIEW_SORT_NEWEST,
  REVIEW_SORT_OLDEST,
  REVIEW_SORT_HIGHEST,
  REVIEW_SORT_LOWEST,
} = require('../lib/constants').default

export default class ReviewsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (!!terms.sort_by) {
      const sortTag = Reviews.getSortTag(terms.sort_by)
      switch (sortTag) {
        case REVIEW_SORT_NORMAL:
          break;
        case REVIEW_SORT_NEWEST:
          this.query.descending("updatedAt")
          break;
        case REVIEW_SORT_OLDEST:
          this.query.ascending("updatedAt")
          break;
        case REVIEW_SORT_HIGHEST:
          this.query.descending("rate")
          break;
        case REVIEW_SORT_LOWEST:
          this.query.ascending("rate")
          break;
      }
    }

    if (!!terms.reviewListType) {
      this.query.equalTo('user', ParseUser.createWithoutData(terms.forObject.id))
    }
    if (!!terms.reviewType) {
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


