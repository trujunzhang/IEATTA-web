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

const {Map, List} = require('immutable')

const initialState = Map({})

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_BY_TYPE,
  LIST_VIEW_RESET_ALL_POSTS,
} = require('../lib/constants').default

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function paginationReducer(state: State = initialState, action): State {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LIST_VIEW_LOADED_BY_TYPE: {
      const {list, listTask, listId, limit, totalCount} = action.payload

      let nextTask = state.get(listId)
      if (!!nextTask && false) {
        nextTask = nextTask.set('results', nextTask.get('results').concat(list))
          .set('pageIndex', listTask.pageIndex + 1)
          .set('totalCount', totalCount)
      } else {
        nextTask = Map({
          id: listId,
          ready: true,
          totalCount: totalCount,
          limit: limit,
          pageIndex: listTask.pageIndex + 1,
          firstPagination: false,
          results: list
        })
      }

      let nextState = state.set(listId, nextTask)
      return nextState
    }

    case LIST_VIEW_RESET_ALL_POSTS: {
      return Map({})
    }

  }
  /**
   * ## Default
   */
  return state
}

export default paginationReducer