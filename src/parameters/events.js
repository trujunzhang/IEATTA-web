import moment from 'moment'

let {ParseEvent, ParseUser} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {
  USERPROFILE_TYPE_UPVOTE,
  USERPROFILE_TYPE_DOWNVOTE,
  USERPROFILE_TYPE_SUBMITTED_POSTS,
  USERPROFILE_TYPE_FOLDER_LIST
} = require('../lib/constants').default

export default class EventsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {
    if (terms.restaurantId) {

    }

    return this
  }

  end() {
    return this.query
  }

}


