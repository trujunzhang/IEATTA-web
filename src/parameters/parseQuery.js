const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  getInstanceWithoutData
} = require('../parse/objects').default

import Records from '../lib/records'

/**
 * The states were interested in
 */
const {
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
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, objectId)
    const modelType = Records.realmTypes[objectSchemaName]
    query.equalTo(modelType, instanceWithoutData)
  }
}
