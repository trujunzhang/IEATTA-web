import AppConstants from '../lib/appConstants'

const Records = require("../lib/records").default

const {
  ParseRestaurant,
  ParseEvent,
  ParseUser,
  ParsePeopleInEvent,
  ParseReview,
  ParseRecipe,
  ParseRecord,
  ParsePhoto,
  createParseInstance,
} = require('./objects').default

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_PEOPLE_IN_EVENTS,
  PARSE_USERS,
  PARSE_REVIEWS,
  PARSE_RECIPES,
  PARSE_RECORDS,
  PARSE_PHOTOS,
  // Parse Object Model Status
  PARSE_OBJECT_FLAG_NORMAL,
  PARSE_OBJECT_FLAG_REMOVED,
} = require('../lib/constants').default

const {
  getQueryByType
} = require('./parseUtiles').default

/**
 *
 * @param objectSchemaName
 * @param parseInstance: It is a parse object instance.
 * @returns {Promise.<void>}
 */
async function updateParseRecorder(objectSchemaName, parseInstance) {

  const recordType = AppConstants.realmTypes[objectSchemaName]
  let recorder = await getQueryByType(PARSE_RECORDS).equalTo(recordType, parseInstance).first()
  if (!!recorder) {
    debugger
  } else {
    recorder = createParseInstance(PARSE_RECORDS)

    // Two fields('recordType' and 'flag').
    recorder.set('recordType', recordType)
    recorder.set('flag', AppConstants.parseObjectFlags[PARSE_OBJECT_FLAG_NORMAL])

    recorder.set(recordType, parseInstance);// For (web app)
  }

  await _save_recorder(recorder)
}

async function _save_recorder(recorder) {
  // ==Important(web)==
  // After saved recorder, the 'updatedAt' column will be updated automatically.
  // So that new 'updatedAt' will notify the mobile app to update their local database.
  await recorder.save()
}

async function updateParseRecorderFlagStatus(objectSchemaName, parseInstance, newFlagType = PARSE_OBJECT_FLAG_NORMAL) {
  const recordType = AppConstants.realmTypes[objectSchemaName]
  let recorder = await getQueryByType(PARSE_RECORDS).equalTo(recordType, parseInstance).first()

  if (!!recorder) {// Exist, set 'flag' to new value and add new field called "removedObjectUniqueId".
    recorder.set('flag', AppConstants.parseObjectFlags[newFlagType])
    recorder.set('removedObjectUniqueId', parseInstance.get('uniqueId'))
  } else {
    throw new Error(`The recorder that recorded the ${objectSchemaName} had been removed!`)
  }

  await _save_recorder(recorder)
}

export default {
  // Update the model's record after saved it.
  updateParseRecorder,
  updateParseRecorderFlagStatus,
}
