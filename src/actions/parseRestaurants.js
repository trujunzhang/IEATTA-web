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

const Parse = require('parse')
import type {ThunkAction} from './types'

let {getRestaurantParameters, getEventParameters, getQueryByType} = require('../parse/parseUtiles').default

const {fromParseRestaurant, fromParseEvent} = require('../reducers/parseModels')

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_BY_TYPE,
} = require('../lib/constants').default

async function _loadListByType(listTask: Any, objectsQuery: Parse.Query, terms: Any, parseFun: Any): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  const totalCount = await objectsQuery.count()

  const results = await objectsQuery.skip(skipCount).limit(limit).find()

  const payload = {
    list: (results || []).map(parseFun),
    listTask: listTask,
    listId: terms.listId,
    limit: limit,
    totalCount: totalCount
  }

  const action = {LIST_VIEW_LOADED_BY_TYPE, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadListByType(listTask: Any, objectsQuery: Parse.Query, terms: Any, parseFun: Any): ThunkAction {
  return (dispatch) => {
    const action = _loadListByType(listTask, objectsQuery, terms, parseFun)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

function loadRestaurantsList(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getRestaurantParameters(terms), terms, fromParseRestaurant)
}

function loadEventsList(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getEventParameters(terms), terms, fromParseEvent)
}

function loadPeopleInEventList(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getRestaurantParameters(terms), terms, fromParseRestaurant)
}

export default {
  loadRestaurantsList,
  loadEventsList,
  loadPeopleInEventList
}
