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


export function equalToRelationObject(query, objectSchemaName, parseId, fieldName) {
  if (!!parseId) {
    const modelType = AppConstants.realmTypes[objectSchemaName]
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseId)
    query.equalTo(modelType, instanceWithoutData)
  }
}

export function containInRelationObject(query, objectSchemaName, parseId, fieldName) {
  if (!!parseId) {
    const modelType = AppConstants.realmTypes[objectSchemaName]
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseId)
    query.containedIn(modelType, instanceWithoutData)
  }
}

