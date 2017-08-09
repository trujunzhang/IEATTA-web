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
import {fromParsePhoto, fromParseRecipe} from "../reducers/parseModels";

const Parse = require('parse')
import type {ThunkAction} from './types'

const {
  getRestaurantParameters,
  getReviewsParameters,
  getRecipesParameters,
  getPhotosParameters,
  getEventParameters,
  getPeopleInEventParameters,
  getUsersParameters,
  getQueryByType
} = require('../parse/parseUtiles').default

const {
  fromParseRestaurant,
  fromParseEvent,
  fromParseReview,
  fromParsePeopleInEvent,
  fromParseUser
} = require('../reducers/parseModels')

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_BY_TYPE,
  LOADED_PHOTOS_BROWSER,
} = require('../lib/constants').default

async function _loadListByType(listTask: Any, objectsQuery: Parse.Query, terms: Any, parseFun: Any, type: Any): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  const totalCount = await objectsQuery.count()
  const results = await objectsQuery.skip(skipCount).limit(limit).find()

  const payload = {
    list: (results || []).map(parseFun),
    listTask: listTask,
    listId: terms.listId,
    limit: terms.limit,
    totalCount: totalCount
  }

  const action = {type, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadListByType(listTask: Any, objectsQuery: Parse.Query, terms: Any, parseFun: Any, type: Any = LIST_VIEW_LOADED_BY_TYPE): ThunkAction {
  return (dispatch) => {
    const action = _loadListByType(listTask, objectsQuery, terms, parseFun, type)
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
  return loadListByType(listTask, getPeopleInEventParameters(terms), terms, fromParsePeopleInEvent)
}

function loadReviewsList(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getReviewsParameters(terms), terms, fromParseReview)
}

function loadRecipesList(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getRecipesParameters(terms), terms, fromParseRecipe)
}

function loadPhotosBrowser(listTask: Any, terms: Any): ThunkAction {
  return loadListByType(listTask, getPhotosParameters(terms), terms, fromParsePhoto, LOADED_PHOTOS_BROWSER)
}

export default {
  loadRestaurantsList,
  loadEventsList,
  loadPeopleInEventList,
  loadReviewsList,
  loadRecipesList,
  loadPhotosBrowser,
}
