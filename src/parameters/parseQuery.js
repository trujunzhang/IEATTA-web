const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  getInstanceWithoutData
} = require('../parse/objects').default

import AppConstants from '../lib/appConstants'

/**
 * The states were interested in
 */
const {
  // Parse Model Types
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENT,
} = require('../lib/constants').default


export function equalRelationObject(query, objectSchemaName, objectId, fieldName) {
  if (!!objectId) {
    const modelType = AppConstants.realmTypes[objectSchemaName]
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, objectId)
    query.equalTo(modelType, instanceWithoutData)
  }
}
