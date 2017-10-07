const {
  ParseRestaurant,
  ParseEvent,
  ParseRecipe,
  ParseUser,
  ParseReview
} = require('../parse/objects').default

import Reviews from '../lib/reviews'
import AppConstants from '../lib/appConstants'

import {equalToRelationObject} from './parseQuery'


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
  // Parse Model Types
  PARSE_USERS,
  // Review List Type
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
} = require('../lib/constants').default

export default class ReviewsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms) {
    const {reviewType, forObject, sort_by, reviewListType} = terms;

    if (!!sort_by) {
      const sortTag = Reviews.getSortTag(sort_by)
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

    if (!!reviewListType) {
      switch (reviewListType) {
        case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
          equalToRelationObject(this.query, PARSE_USERS, forObject.id, 'creator')
          break;
      }
    }

    if (!!reviewType) {
      this.query.equalTo('reviewType', reviewType)
      const {objectSchemaName} = AppConstants.realmObjects[reviewType]
      equalToRelationObject(this.query, objectSchemaName, forObject.id)
    }


    return this
  }

  end() {
    return this.query
  }

}


