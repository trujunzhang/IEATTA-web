

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
  PARSE_PEOPLE_IN_EVENTS
} = require('./constants').default


const Records = {}

Records.realmObjects = {
  'record': {objectSchemaName: PARSE_RECORDS},
  'restaurant': {objectSchemaName: PARSE_RESTAURANTS},
  'event': {objectSchemaName: PARSE_EVENTS},
  'peopleInEvent': {objectSchemaName: PARSE_PEOPLE_IN_EVENTS},
  'user': {objectSchemaName: PARSE_USERS},
  'recipe': {objectSchemaName: PARSE_RECIPES},
  'photo': {objectSchemaName: PARSE_PHOTOS},
  'review': {objectSchemaName: PARSE_REVIEWS},
}

Records.realmTypes = {
  PARSE_RECORDS: 'record',
  PARSE_RESTAURANTS: 'restaurant',
  PARSE_EVENTS: 'event',
  PARSE_PEOPLE_IN_EVENTS: 'peopleInEvent',
  PARSE_USERS: 'user',
  PARSE_RECIPES: 'recipe',
  PARSE_PHOTOS: 'photo',
  PARSE_REVIEWS: 'review'
}

export default Records;
