const {
  ParseRestaurant,
  ParseEvent,
  ParseRecipe,
  ParseUser,
  ParseReview
} = require('../parse/objects').default

import Reviews from '../lib/reviews'

import {equalRelationObject} from './parseQuery'

import Records from '../lib/records'

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
          // Here, sorted by default.
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
      equalRelationObject(PARSE_USERS, terms.forObject.id)
    }

    const {reviewType, forObject} = terms;
    if (!!reviewType) {
      this.query.equalTo('reviewType', reviewType)
      const {objectSchemaName} = Records.realmObjects[reviewType]
      equalRelationObject(objectSchemaName, terms.forObject.id)
    }


    return this
  }

  end() {
    return this.query
  }

}


