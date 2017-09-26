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
const {} = require('../../lib/constants').default

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */
const paginationReducer = require('../listContainerReducer').default

/**
 * ## Tests
 *
 * paginationReducer
 */
describe('paginationReducer', () => {

})// paginationReducer
