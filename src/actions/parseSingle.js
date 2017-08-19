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
import {fromParseRecipe} from "../parse/parseModels";


const Parse = require('parse')

import type {ThunkAction} from './types'

const {ParseUser} = require('../parse/objects').default
const {getUsersParameters, getQueryByType} = require('../parse/parseUtiles').default

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
  LIST_VIEW_LOADED_RESTAURANTS,
  DASHBOARD_LOADED_PAGINATION,
  OVERLAY_LOADED_MODEL_PAGE,
  OVERLAY_LOADED_MODEL_RESET,
  STATISTIC_CLOUD_MODEL,
  USERPROFILE_LOADED,
  PARSE_USERS,
  PARSE_TOPICS,
  PARSE_RESTAURANTS,
  PARSE_PEOPLE_IN_EVENTS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_COMMENTS,
} = require('../lib/constants').default


function callCloudStatisticMethod(type: string, methodName: string, params: string, objectId: string): ThunkAction {

  return (dispatch) => {
    return Parse.Cloud.run(methodName, params, {
      success: (model) => {
        const payload = {objectId, model}
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })

  }

}

function loadParseObject(type: string, query: Parse.Query, objectId: string, parseFun: Any): ThunkAction {
  return (dispatch) => {
    return query.get(objectId, {
      success: (object) => {
        const model = parseFun(object);
        const payload = {objectId, model}
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
   * @param params
   * @returns {ThunkAction}
   */
  loadStatisticCloudPage: (method: string, params: Any): ThunkAction => {
    return callCloudStatisticMethod(STATISTIC_CLOUD_MODEL, 'statisticUserState', {userId: userId}, userId)
  },


  loadUserProfilePage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_USERS, ['photos']), objectId, fromParseUser)
  },

  loadRestaurantPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RESTAURANTS, ['photos']), objectId, fromParseRestaurant)
  },

  loadEventPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_EVENTS, ['restaurant', 'restaurant.photos']), objectId, fromParseEvent)
  },

  loadPeopleInEventPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_PEOPLE_IN_EVENTS,
      ['user', 'user.photos', 'event', 'restaurant']),
      objectId,
      fromParsePeopleInEvent)
  },

  loadOrderedRecipePage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RECIPES, ['restaurant', 'event', 'user', 'photos']), objectId, fromParseRecipe)
  },

  resetLoadPage: Action => {
    return {
      type: OVERLAY_LOADED_MODEL_RESET,
    }
  },


}
