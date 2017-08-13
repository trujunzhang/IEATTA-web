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


'use strict';


const _ = require('underscore')
import type {Action, ThunkAction} from './types'
import {fromParseRecipe} from "../reducers/parseModels";


const {
  ParseRestaurant,
  ParseEvent,
  ParsePeopleInEvent,
  ParseUser,
  ParseReview,
  ParseRecipe,
  ParseRecord,
  ParsePhoto,
} = require('../parse/objects').default

const {
  getUsersParameters,
  getQueryByType, updateParseRecord,
  setParseObjectFieldWithoutData
} = require('../parse/parseUtiles').default

const {
  fromParseUser,
  fromParseRestaurant,
  fromParseEvent
} = require('../reducers/parseModels')

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
  SAVED_MODEL_REQUEST,
} = require('../lib/constants').default


async function _updateRestaurant(model: object): Promise<Array<Action>> {
  const restaurant = await getQueryByType(PARSE_RESTAURANTS).get(model.objectId)
  restaurant.set('displayName', model.displayName)

  await restaurant.save()

  await updateParseRecord('restaurant', restaurant)

  const action = {
    type: SAVED_MODEL_REQUEST,
    payload: {objectId: model.objectId, model: fromParseRestaurant(restaurant)}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}

function updateRestaurant(model: object): ThunkAction {
  return (dispatch) => {
    const action = _updateRestaurant(model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


async function _updateEvent(model: object): Promise<Array<Action>> {
  const event = await getQueryByType(PARSE_EVENTS).get(model.objectId)
  event.set('displayName', model.displayName)
  event.set('want', model.eventWhat)
  event.set('start', model.eventStart)
  event.set('end', model.eventEnd)

  await event.save()

  await updateParseRecord('event', event)

  const action = {
    type: SAVED_MODEL_REQUEST,
    payload: {objectId: model.objectId, model: fromParseEvent(event)}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


function updateEvent(model: object): ThunkAction {
  return (dispatch) => {
    const action = _updateEvent(model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


async function _updateRecipe(model: object): Promise<Array<Action>> {
  const recipe = await getQueryByType(PARSE_RECIPES).get(model.objectId)

  recipe.set('displayName', model.displayName)
  recipe.set('price', model.price)

  await recipe.save()

  await updateParseRecord('recipe', recipe)

  const action = {
    type: SAVED_MODEL_REQUEST,
    payload: {objectId: model.objectId, model: fromParseRecipe(recipe)}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}

function updateRecipe(model: object): ThunkAction {
  return (dispatch) => {
    const action = _updateRecipe(model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


async function _createNewReview(model: object): Promise<Array<Action>> {
  const review = new ParseReview()

  review.set('rate', model.reviewRating)
  review.set('body', model.reviewBody)
  review.set('reviewType', model.reviewType)

  // the logged user submitted the review.
  review.set('user', ParseUser.createWithoutData(model.currentUserId))

  switch (model.reviewType) {
    case "restaurant":
      review.set('restaurant', ParseRestaurant.createWithoutData(model.forObjectId))
      break;
    case "event":
      review.set('event', ParseEvent.createWithoutData(model.forObjectId))
      break;
    case "recipe":
      review.set('recipe', ParseRecipe.createWithoutData(model.forObjectId))
      break;
  }

  await review.save()

  // await updateParseRecord('review', review)

  const action = {
    type: SAVED_MODEL_REQUEST,
    payload: {objectId: model.objectId, model: fromParseRecipe(recipe)}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


function createNewReview(model: object): ThunkAction {
  return (dispatch) => {
    const action = _createNewReview(model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

export default {
  // Update
  updateRestaurant,
  updateEvent,
  updateRecipe,
  // Create
  createNewReview,
}
