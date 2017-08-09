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
import {fromParseRecipe} from "../reducers/parseModels";


const Parse = require('parse')

import type {ThunkAction} from './types'

let {ParseUser} = require('../parse/objects').default
let {getUsersParameters, getQueryByType} = require('../parse/parseUtiles').default

const {fromParseUser, fromParseRestaurant, fromParseEvent} = require('../reducers/parseModels')

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_RESTAURANTS,
  DASHBOARD_LOADED_PAGINATION,
  OVERLAY_LOADED_MODEL_PAGE,
  OVERLAY_LOADED_MODEL_RESET,
  USERPROFILE_LOADED,
  PARSE_USERS,
  PARSE_TOPICS,
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_COMMENTS,
} = require('../lib/constants').default


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
  loadUserProfile: (userId: string, slug: string): ThunkAction => {
    let pageQuery = new Parse.Query(ParseUser).equalTo('objectId', userId)

    return loadParseObject(USERPROFILE_LOADED, pageQuery, userId)
  },

  loadRestaurantPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RESTAURANTS), objectId, fromParseRestaurant)
  },

  loadEventPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_EVENTS, ['restaurant', 'photos']), objectId, fromParseEvent)
  },

  loadOrderedUserPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_USERS, ['photos']), objectId, fromParseUser)
  },

  loadOrderedRecipePage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_MODEL_PAGE, getQueryByType(PARSE_RECIPES, ['restaurant', 'event', 'user']), objectId, fromParseRecipe)
  },

  resetLoadPage: Action => {
    return {
      type: OVERLAY_LOADED_MODEL_RESET,
    }
  }
}
