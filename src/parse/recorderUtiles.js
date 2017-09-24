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

    recorder.set('recordType', recordType)
    recorder.set('flag', '1')

    recorder.set(recordType, parseInstance);// For (web app)
  }

  // ==Important(web)==
  // After saved recorder, the 'updatedAt' column will be updated automatically.
  // So that new 'updatedAt' will notify the mobile app to update their local database.
  await recorder.save()

}

export default {
  // Update the model's record after saved it.
  updateParseRecorder,
}
