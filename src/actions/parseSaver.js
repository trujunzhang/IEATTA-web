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
  fromParseEvent,
  parseOnlineParseObject,
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
  // Edit form
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
  WRITE_MODEL_DONE,
} = require('../lib/constants').default

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


async function _writeOnlineParseObject(editModelType,
                                       objectSchemaName,
                                       model: object): Promise<Array<Action>> {
  let onlineParseObject = null;
  switch (editModelType) {
    case MODEL_FORM_TYPE_NEW:
      debugger
      // _lastRealmInstance = newLocalRealmObject(objectSchemaName, model, lastPosition)
      // RecorderService.writeRecorder(_lastRealmInstance, objectSchemaName)

      break;
    case MODEL_FORM_TYPE_EDIT:

      debugger

      onlineParseObject = await getQueryByType(objectSchemaName).get(model.objectId)
      await  Records.createOnlineParseInstance(onlineParseObject, objectSchemaName, model)

      debugger

      // step1: save the online object.
      await onlineParseObject.save()

      // step2: save it's recorder.
      await updateParseRecorder(objectSchemaName, onlineParseObject)

      break;
  }

  debugger

  const action = {
    type: WRITE_MODEL_DONE,
    payload: {objectId: model.objectId, originModel: parseOnlineParseObject(onlineParseObject)}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


function writeOnlineParseObject(editModelType,
                                objectSchemaName,
                                model: object): ThunkAction {
  return (dispatch) => {
    const action = _writeOnlineParseObject(editModelType, objectSchemaName, model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


async function _uploadPhoto(model: object): Promise<Array<Action>> {
  const thumbnailFile = new Parse.File('image', model.file)
  await thumbnailFile.save()
  const photo = createParseInstance(PARSE_PHOTOS)

  // step1: generate photo.
  await  Records.createOnlineParseInstance(
    photo,
    PARSE_PHOTOS,
    Object.assign({}, model, {
      thumbnail: thumbnailFile,
      original: thumbnailFile,
    })
  )

  // step2: save photo.
  await photo.save()

  // step3: update the recorder
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

async function _uploadLoggedUser(model: object): Promise<Array<Action>> {
  // step1: get logged user.
  const current = await getQueryByType(PARSE_USERS).get(model.objectId)

  current.set('username', model.username)
  current.set('email', model.email)

  // step2: update user.
  await current.save()

  const action = {
    type: SAVE_MODEL_REQUEST,
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


function uploadLoggedUser(model: object): ThunkAction {
  return (dispatch) => {
    const action = _uploadLoggedUser(model)
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


export default {
  // write Online parse Objects.
  writeOnlineParseObject,
  // Update
  updateRecipe,
  // Photos
  uploadPhoto,
  uploadLoggedUser,
}
