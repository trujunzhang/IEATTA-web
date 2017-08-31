/**
 * # paginationReducer-test.js
 *
 * Test the paginationReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */
'use strict'

/**
 * ## Imports
 *
 * These actions are sufficient to test the reducer as many of the
 * case statements are shared amongst the actions.
 */
const {
  PARSE_PHOTOS,
  LIST_VIEW_LOADED_RESTAURANTS
} = require('../../lib/constants').default

const {
  createParseInstance,
  getInstanceWithoutData,
} = require('../objects').default

/**
 * ## Tests
 */
describe('Object methods', () => {

  /**
   * ### The use LIST_VIEW_LOADED_RESTAURANTS
   *
   */
  describe('Check relation objects', () => {

    it('Photo have relative objects', () => {
      const photo = createParseInstance(PARSE_PHOTOS)
      debugger
      expect(next.form.state).toBe(LIST_VIEW_LOADED_RESTAURANTS)
      // expect(next.form.listContainer).toBe({})
    })

  })
})
