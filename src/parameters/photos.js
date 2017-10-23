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
  PARSE_USERS,
  // Photos Terms parameters type
  PHOTOS_TERMS_PARAM_NORMAL,
  PHOTOS_TERMS_PARAM_FOR_EDIT_RECIPE,
} = require('../lib/constants').default

export default class photosParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms) {
    switch (terms.photoParamsType) {
      case PHOTOS_TERMS_PARAM_NORMAL:
        this.queryPhotoNormal(terms)
        break;
      case PHOTOS_TERMS_PARAM_FOR_EDIT_RECIPE:
        this.queryPhotoForEditRecipe(terms)
        break;
    }

    return this
  }

  queryPhotoForEditRecipe(terms) {
    const {objectSchemaName, forObjectId} = terms;

    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, forObjectId)
    this.query.equalTo('restaurant', instanceWithoutData)
  }


  queryPhotoNormal(terms) {
    const {objectSchemaName, forObjectId, creatorId, withoutPhotoType} = terms;

    if (!!creatorId) {// This is the query for the user profile's photos page.
      const instanceWithoutData = getInstanceWithoutData(objectSchemaName, creatorId)
      this.query.equalTo('creator', instanceWithoutData)
    }
    else if (!!objectSchemaName) {
      const photoType = AppConstants.realmTypes[objectSchemaName]

      if (!withoutPhotoType && objectSchemaName !== PARSE_USERS) {
        this.query.equalTo('photoType', photoType)
      }

      if (!!forObjectId) {
        const instanceWithoutData = getInstanceWithoutData(objectSchemaName, forObjectId)
        this.query.equalTo(photoType, instanceWithoutData)
      }
    }

  }

  end() {
    return this.query
  }

}


