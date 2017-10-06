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
} = require('../lib/constants').default

const cloudMethods = {
  CLOUD_STATISTIC_FOR_USER_STATE: 'statisticUserState',
  CLOUD_STATISTIC_FOR_REVIEWS: 'statisticReviews',
  CLOUD_RESTAURANT_ADDRESS: 'getAddressFromLocation'
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

function findParseObject(type: string, query: Parse.Query, parseId: string, parseFun: Any): ThunkAction {
  return (dispatch) => {
    return query.first({
      success: (object) => {
        const model = parseFun(object);
        const payload = {parseId, model}
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })
  }
}

function loadParseObject(type: string, query: Parse.Query, parseId: string, parseFun: Any): ThunkAction {
  return (dispatch) => {
    return query.get(parseId, {
      success: (object) => {
        const model = parseFun(object);
        const payload = {parseId, model}
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })
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
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_USERS, ['photos']), parseId, fromParseUser)
  },

  loadRestaurantPage: (parseId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RESTAURANTS, ['photos']), parseId, fromParseRestaurant)
  },

  loadEventPage: (parseId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_EVENTS, ['restaurant', 'restaurant.photos']), parseId, fromParseEvent)
  },

  loadPeopleInEventPage: (parseId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_PEOPLE_IN_EVENTS,
      ['user', 'user.listPhoto', 'event', 'restaurant', 'recipes', 'recipes.listPhoto']),
      parseId,
      fromParsePeopleInEvent)
  },

  loadOrderedRecipePage: (parseId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RECIPES,
      ['restaurant', 'event', 'user', 'photos']),
      parseId, fromParseRecipe)
  },

  loadReviewPage: (parseId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE,
      getQueryByType(PARSE_REVIEWS, ['restaurant', 'event', 'recipe', 'user']),
      parseId, fromParseReview)
  },

  resetLoadPage: Action => {
    return {
      type: OVERLAY_LOADED_MODEL_RESET,
    }
  },


}
