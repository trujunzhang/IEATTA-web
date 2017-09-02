import Records from '../lib/records'
import AppConstants from '../lib/appConstants'

const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  ParsePhoto,
  ParseRecipe,
  getInstanceWithoutData
} = require('../parse/objects').default

/**
 * The states were interested in
 */
const {
  PARSE_USERS
} = require('../lib/constants').default

export default class photosParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {

    const {objectSchemaName, forObjectId} = terms;
    if (!!objectSchemaName) {
      const photoType = AppConstants.realmTypes[objectSchemaName]

      if (objectSchemaName !== PARSE_USERS) {
        this.query.equalTo('photoType', photoType)
      }

      if (!!forObjectId) {
        const instanceWithoutData = getInstanceWithoutData(objectSchemaName, forObjectId)
        this.query.equalTo(photoType, instanceWithoutData)
      }

    }

    return this
  }

  end() {
    return this.query
  }

}


