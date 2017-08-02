/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */


import type {ThunkAction} from './types'

let {getRestaurantParameters, getEventParameters, getQueryByType} = require('../parse/parseUtiles').default

const {fromParseRestaurant, fromParseEvent} = require('../reducers/parseModels')

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_RESTAURANTS,
  LIST_VIEW_LOADED_EVENTS,
} = require('../lib/constants').default


async function _loadEventsList(listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_EVENTS): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  const objectsQuery = getEventParameters(terms)
  const totalCount = await objectsQuery.count()

  const results = await objectsQuery.skip(skipCount).limit(limit).find()

  debugger

  const payload = {
    list: (results || []).map(fromParseEvent),
    listTask: listTask,
    listId: listId,
    limit: limit,
    totalCount: totalCount
  }

  const action = {type, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadEventsList(listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_EVENTS): ThunkAction {
  return (dispatch) => {
    const action = _loadEventsList(listTask, listId, terms, type)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

async function _loadRestaurantsList(listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_RESTAURANTS): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  const objectsQuery = getRestaurantParameters(terms)
  const totalCount = await objectsQuery.count()

  const results = await objectsQuery.skip(skipCount).limit(limit).find()

  const payload = {
    list: (results || []).map(fromParseRestaurant),
    listTask: listTask,
    listId: listId,
    limit: limit,
    totalCount: totalCount
  }

  const action = {type, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadRestaurantsList(listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_RESTAURANTS): ThunkAction {
  return (dispatch) => {
    const action = _loadRestaurantsList(listTask, listId, terms, type)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


export default {
  loadRestaurantsList,
  loadEventsList,
}
