import moment from 'moment'


export default class RestaurantsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    if (terms.search) {
      this.query.matches('displayName',
        `.*${terms.search}.*`,
        'i'
      )
    }

    if (terms.userProfileType) {
      let userId = terms.userId
      if (typeof userId === 'undefined') {
        throw new Error('You need to set a proper User Id before query posts')
      }
    }

    if (terms.related) { // related posts
      // this.query.notContainedIn('objectId', terms.related.id)
      // this.query.equalTo('author', terms.related.author)
    }

    if (terms.before && terms.after) { // Calendar posts

      let mAfter = moment(terms.after, 'YYYY-MM-DD')
      let startOfDay = mAfter.startOf('day')

      // from the start of the date (inclusive)
      this.query.greaterThanOrEqualTo('postedAt', startOfDay.toDate())

      let mBefore = moment(terms.before, 'YYYY-MM-DD')
      let endOfDay = mBefore.endOf('day')

      // till the start of tomorrow (non-inclusive)
      this.query.lessThan('postedAt', endOfDay.toDate())
    }


    return this
  }

  end() {
    return this.query
  }

}


