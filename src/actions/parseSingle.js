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
import {fromParseRecipe, fromParseReview} from "../parse/parseModels";

const Parse = require('parse')

import type {ThunkAction} from './types'

const {
  getQueryByType,
  getReviewsParameters
} = require('../parse/parseUtiles').default

const {
  fromParseUser,
  fromParseRestaurant,
  fromParseEvent,
  fromParsePeopleInEvent
} = require('../parse/parseModels')

/**
 * The states were interested in
 */
const {
  DASHBOARD_LOADED_PAGINATION,
  OVERLAY_LOADED_MODEL_PAGE,
  OVERLAY_LOADED_MODEL_RESET,
  STATISTIC_CLOUD_MODEL,
  EMAIL_SEND_CLOUD_MODEL,
  USERPROFILE_LOADED,
  // parse models
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // statistic
  CLOUD_STATISTIC_FOR_USER_STATE,
  CLOUD_STATISTIC_FOR_REVIEWS,
  CLOUD_RESTAURANT_ADDRESS,
  CLOUD_INVITE_WITH_EMAILS,
} = require('../lib/constants').default

const cloudMethods = {
  CLOUD_STATISTIC_FOR_USER_STATE: 'statisticUserState',
  CLOUD_STATISTIC_FOR_REVIEWS: 'statisticReviews',
  CLOUD_RESTAURANT_ADDRESS: 'getAddressFromLocation',
  CLOUD_INVITE_WITH_EMAILS: 'inviteCompose',
}


function callCloudStatisticMethod(type: string, methodType: string, params: string, parseId: string): ThunkAction {
  const methodName = cloudMethods[methodType];
  return (dispatch) => {
    return Parse.Cloud.run(methodName, params, {
      success: (model) => {
        const payload = {parseId, model}
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })

  }

}

async function _loadPhotosListForRecipes(parseId, model) {
  const {objectSchemaName} = terms;

  const modelIds = _.pluck(list, 'id')

  const listPhotosDict = {}

  for (let id of modelIds) {
    const array = await getPhotosParameters({
      photoParamsType: PHOTOS_TERMS_PARAM_FOR_SLIDE_SHOW,
      objectSchemaName,
      forObjectId: id
    }, false).limit(1).find()

    listPhotosDict[id] = (array || []).map(fromParsePhoto)
  }

  return {listPhotosDict}
}

async function _loadParseObject(query,
                                parseId,
                                parseFun,
                                afterFetchHook,
                                type): Promise<Array<Action>> {
  const onlineParseInstance = await query.get(parseId)
  const model = parseFun(onlineParseInstance);

  let extendProps = {}
  if (!!afterFetchHook) {
    extendProps = await afterFetchHook(parseId, model)
  }

  const payload = {parseId, model}
  const action = {type, payload}

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadParseObject(query,
                         parseId,
                         parseFun,
                         afterFetchHook,
                         type = OVERLAY_LOADED_MODEL_PAGE): ThunkAction {
  return (dispatch) => {
    const action = _loadParseObject(query, parseId, parseFun, afterFetchHook, type)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


export default {
  /**
   * 'statisticUserState'
   * 'statisticReviews'
   * @param methodType
   * @param params
   * @param parseId
   * @param type
   * @returns {ThunkAction}
   */
  invokeParseCloudMethod: (methodType: string, params: Any, parseId: string, type: string = STATISTIC_CLOUD_MODEL): ThunkAction => {
    return callCloudStatisticMethod(type, methodType, params, parseId)
  },

  loadUserProfilePage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_USERS),
      parseId,
      fromParseUser
    )
  },

  loadRestaurantPage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_RESTAURANTS),
      parseId,
      fromParseRestaurant
    )
  },

  loadEventPage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_EVENTS, ['restaurant', 'restaurant.listPhoto']),
      parseId,
      fromParseEvent
    )
  },

  loadPeopleInEventPage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_PEOPLE_IN_EVENTS,
        ['user', 'user.listPhoto', 'event', 'restaurant', 'recipes', 'recipes.listPhoto']),
      parseId,
      fromParsePeopleInEvent,
      _loadPhotosListForRecipes
    )
  },

  loadOrderedRecipePage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_RECIPES, ['restaurant']),
      parseId,
      fromParseRecipe
    )
  },

  loadReviewPage: (parseId: string): ThunkAction => {
    return loadParseObject(
      getQueryByType(PARSE_REVIEWS, ['restaurant', 'event', 'recipe']),
      parseId,
      fromParseReview
    )
  },

  resetLoadPage: Action => {
    return {
      type: OVERLAY_LOADED_MODEL_RESET,
    }
  }

}
