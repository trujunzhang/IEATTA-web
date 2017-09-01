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


    return this
  }

  end() {
    return this.query
  }

}


