const Parse = require('parse')
import moment from 'moment'

let {ParseRestaurant, ParseFolder, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {
  USERPROFILE_TYPE_UPVOTE,
  USERPROFILE_TYPE_DOWNVOTE,
  USERPROFILE_TYPE_SUBMITTED_POSTS,
  USERPROFILE_TYPE_FOLDER_LIST
} = require('../lib/constants').default

export default class UsersParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.userIds) { // related posts
      this.query.include(terms.useIds)
    }


    return this
  }

  end() {
    return this.query
  }

}


