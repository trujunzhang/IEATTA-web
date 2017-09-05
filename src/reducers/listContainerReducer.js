/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */

import type {Action} from '../actions/types'


const initialState = {}

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_BY_TYPE,
  LOADED_PHOTOS_BROWSER,
} = require('../lib/constants').default

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function listContainerReducer(state: State = initialState, action): State {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LIST_VIEW_LOADED_BY_TYPE: {
      const {list, listTask, listId, limit, totalCount} = action.payload

      // let nextTask = state.get(listId)
      // if (!!nextTask && false) {
      //   nextTask = nextTask.set('results', nextTask.get('results').concat(list))
      //     .set('pageIndex', listTask.pageIndex + 1)
      //     .set('totalCount', totalCount)
      // } else {
      // }

      let nextTask = {};
      nextTask[listId] = {
        id: listId,
        ready: true,
        totalCount: totalCount,
        limit: limit,
        pageIndex: listTask.pageIndex + 1,
        firstPagination: false,
        results: list
      };

      debugger

      const nextState = nextTask;

      return nextState
    }

  }

  /**
   * ## Default
   */
  return state
}

export default listContainerReducer;
