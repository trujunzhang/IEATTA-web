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

const Parse = require('parse')

const _ = require('underscore')
import type {Action, ThunkAction} from './types'
import {fromParseRecipe} from "../parse/parseModels";
import Records from "../lib/records";


const {
  createParseInstance,
} = require('../parse/objects').default

const {
  getUsersParameters,
  getQueryByType,
  updateParseRecorder,
} = require('../parse/parseUtiles').default

const {
  fromParseUser,
  fromParseRestaurant,
  fromParseEvent
} = require('../parse/parseModels')

/**
 * The states were interested in
 */
const {
  // parse models
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // Rest API
  SAVE_MODEL_REQUEST,
  UPDATE_MODEL_REQUEST,
} = require('../lib/constants').default


async function _updateRestaurant(model: object): Promise<Array<Action>> {
  const restaurant = await getQueryByType(PARSE_RESTAURANTS).get(model.objectId)
  restaurant.set('displayName', model.displayName)

  const _geoLocation = new Parse.GeoPoint({latitude: model.latitude, longitude: model.longitude})

  // debugger

  restaurant.set('geoLocation', _geoLocation)
  restaurant.set('address', model.address)
  restaurant.set('street_number', model.street_number)
  restaurant.set('route', model.route)
  restaurant.set('locality', model.locality)
  restaurant.set('sublocality', model.sublocality)
  restaurant.set('country', model.country)
  restaurant.set('postal_code', model.postal_code)
  restaurant.set('administrative_area', model.administrative_area)

  await restaurant.save()

  await updateParseRecorder(PARSE_RESTAURANTS, restaurant)

  const action = {
    type: UPDATE_MODEL_REQUEST,
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

  await updateParseRecorder(PARSE_EVENTS, event)

  const action = {
    type: UPDATE_MODEL_REQUEST,
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

  await updateParseRecorder(PARSE_RECIPES, recipe)

  const action = {
    type: UPDATE_MODEL_REQUEST,
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
  const review = createParseInstance(PARSE_REVIEWS)

  // step1: generate review.
  Records.generateNewOnlineParseInstance(review, PARSE_REVIEWS, model)

  // step2: save review.
  await review.save()

  // step5: update the recorder
  await updateParseRecorder(PARSE_REVIEWS, review)

  const action = {
    type: SAVE_MODEL_REQUEST,
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


async function _uploadPhoto(model: object): Promise<Array<Action>> {
  const thumbnailFile = new Parse.File(model.file.name, model.file)
  await thumbnailFile.save()

  const photo = createParseInstance(PARSE_PHOTOS)

  // step1: generate photo.
  Records.generateNewOnlineParseInstance(
    photo,
    PARSE_PHOTOS,
    Object.assign({}, model, {
      thumbnail: thumbnailFile,
    })
  )

  // step2: save photo.
  await photo.save()

  // step5: update the recorder
  await updateParseRecorder(PARSE_PHOTOS, photo)

  const action = {
    type: SAVE_MODEL_REQUEST,
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


function uploadPhoto(model: object): ThunkAction {
  return (dispatch) => {
    const action = _uploadPhoto(model)
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
  // Photos
  uploadPhoto,
}
