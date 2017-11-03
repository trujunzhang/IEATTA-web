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
import {fromParsePhoto, fromParseRecipe} from "../parse/parseModels";

const Parse = require('parse')
const _ = require('underscore')
import type {ThunkAction, Action} from './types'

const {
  getRestaurantParameters,
  getReviewsParameters,
  getRecipesParameters,
  getPhotosParameters,
  getEventParameters,
  getPeopleInEventParameters,
  getUsersParameters,
  // By
  getQueryParameters,
} = require('../parse/parseUtiles').default

const {
  fromParseRestaurant,
  fromParseEvent,
  fromParseReview,
  fromParsePeopleInEvent,
  fromParseUser
} = require('../parse/parseModels')

import PeopleInEvent from '../lib/peopleInEvent'

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_BY_TYPE,
  EMAIL_SEND_CLOUD_MODEL,
  // Photos Terms parameters type
  PHOTOS_TERMS_PARAM_FOR_SLIDE_SHOW,
} = require('../lib/constants').default

async function _loadRecipeListForEvent(listTask,
                                       objectsQuery,
                                       terms,
                                       parseFun): Promise<Array<Action>> {
  const results = await objectsQuery.find()
  const peopleInEventModels = (results || []).map(fromParsePeopleInEvent);
  const recipeIds = PeopleInEvent.getRecipeIdsForQuery(peopleInEventModels)

  const recipesQuery = getRecipesParameters({recipeIds})
  const recipeResults = await recipesQuery.find()

  const payload = {
    list: (recipeResults || []).map(parseFun),
    listTask: listTask,
    listId: terms.listId,
    limit: terms.limit,
    totalCount: -1
  }

  const action = {type: LIST_VIEW_LOADED_BY_TYPE, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

async function _loadPhotosList(terms, listTask, list) {
  const {
    objectSchemaName
  } = terms;

  const modelIds = _.pluck(list, 'id')

  const listPhotosDict = {}

  for (let id of modelIds) {
    const array = await getPhotosParameters({
      photoParamsType: PHOTOS_TERMS_PARAM_FOR_SLIDE_SHOW,
      objectSchemaName,
      forObjectId: id
    }, false).find()

    listPhotosDict[id] = (array || []).map(fromParsePhoto)
  }

  return {listPhotosDict}
}

async function _loadListByType(listTask,
                               objectsQuery,
                               terms,
                               parseFun,
                               afterFetchHook,
                               type): Promise<Array<Action>> {
  const {
    pageIndex,
    limit,
    allItems = false
  } = listTask

  console.log("current:", pageIndex)

  const totalCount = await objectsQuery.count()

  let results = [];
  if (allItems || limit === -1) {
    results = await objectsQuery.find()
  } else {
    const skipCount = (pageIndex - 1) * limit
    results = await objectsQuery.skip(skipCount).limit(limit).find()
  }

  let list = (results || []).map(parseFun)

  let extendProps = {}
  if (!!afterFetchHook) {
    extendProps = afterFetchHook(terms, listTask, list)
  }

  const payload = {
    ...extendProps,
    list,
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

async function _callCloudInviteEmailMethod(params, toEmailsObject): ThunkAction {
  const {emails} = toEmailsObject;
  if (emails['0'] !== '') {
    await Parse.Cloud.run('inviteCompose', {...params, toEmail: emails['0']})
  }
  if (emails['1'] !== '') {
    await Parse.Cloud.run('inviteCompose', {...params, toEmail: emails['1']})
  }
  if (emails['2'] !== '') {
    await Parse.Cloud.run('inviteCompose', {...params, toEmail: emails['2']})
  }

  const action = {type: EMAIL_SEND_CLOUD_MODEL}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function callCloudInviteEmailMethod(params, toEmailsObject): ThunkAction {
  return (dispatch) => {
    const action = _callCloudInviteEmailMethod(params, toEmailsObject)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


function loadListByType({
                          listTask,
                          objectsQuery,
                          terms,
                          parseFun,
                          invokeListFunc = _loadListByType,
                          afterFetchHook,
                          type = LIST_VIEW_LOADED_BY_TYPE
                        }): ThunkAction {
  return (dispatch) => {
    const action = invokeListFunc(listTask, objectsQuery, terms, parseFun, afterFetchHook, type)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

function loadRestaurantsList(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getRestaurantParameters(terms), terms,
    parseFun: fromParseRestaurant,
    afterFetchHook: _loadPhotosList
  })
}

function loadEventsList(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getEventParameters(terms), terms,
    parseFun: fromParseEvent
  })
}

function loadPeopleInEventList(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getPeopleInEventParameters(terms), terms,
    parseFun: fromParsePeopleInEvent
  })
}

function loadOtherUsersAlsoOrderedRecipeList(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getPeopleInEventParameters(terms), terms,
    parseFun: fromParsePeopleInEvent,
    afterFetchHook: PeopleInEvent.getOtherUsersAlsoOrderedRecipe
  })
}

function loadReviewsList(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getReviewsParameters(terms), terms,
    parseFun: fromParseReview
  })
}

function loadRecipesListForRestaurant(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getRecipesParameters(terms), terms,
    parseFun: fromParseRecipe
  })
}

function loadRecipesListForEvent(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getPeopleInEventParameters(terms),
    terms,
    parseFun: fromParseRecipe,
    invokeListFunc: _loadRecipeListForEvent
  })
}

function loadRecipesListForCreator(listTask, terms): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getRecipesParameters(terms), terms,
    parseFun: fromParseRecipe
  })
}

function loadPhotosBrowser(terms): ThunkAction {
  return loadListByType({
    listTask: terms,
    objectsQuery: getPhotosParameters(terms), terms,
    parseFun: fromParsePhoto
  })
}

function loadUsersWithoutAnonymousList({listTask, terms}): ThunkAction {
  return loadListByType({
    listTask,
    objectsQuery: getUsersParameters(terms), terms,
    parseFun: fromParseUser
  })
}

export default {
  loadRestaurantsList,
  loadEventsList,
  loadPeopleInEventList,
  loadOtherUsersAlsoOrderedRecipeList,
  loadReviewsList,
  // Recipes List
  loadRecipesListForRestaurant,
  loadRecipesListForEvent,
  loadRecipesListForCreator,
  // Send invite email
  callCloudInviteEmailMethod,
  // Photo
  loadPhotosBrowser,
  loadUsersWithoutAnonymousList,
}
