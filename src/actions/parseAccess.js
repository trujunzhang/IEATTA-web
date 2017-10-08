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
import Records from "../lib/records";
import Photos from "../lib/photos";

const {
  getInstanceWithoutData,
  createParseInstance,
} = require('../parse/objects').default


const {
  getQueryByType,
} = require('../parse/parseUtiles').default

const {
  updateParseRecorder,
  updateParseRecorderFlagStatus,
} = require('../parse/recorderUtiles').default

const {
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
  // Parse Object Model Status
  PARSE_OBJECT_FLAG_NORMAL,
  PARSE_OBJECT_FLAG_REMOVED,
} = require('../lib/constants').default

async function _writeOnlineParseObject(editModelType,
                                       objectSchemaName,
                                       model: object): Promise<Array<Action>> {
  let onlineParseObject = null;
  switch (editModelType) {
    case MODEL_FORM_TYPE_NEW:
      onlineParseObject = createParseInstance(objectSchemaName)
      debugger
      break;
    case MODEL_FORM_TYPE_EDIT:
      onlineParseObject = await getQueryByType(objectSchemaName).get(model.parseId)
      debugger
      break;
  }

  // First of all, set fields.
  await  Records.createOnlineParseInstance(editModelType, onlineParseObject, objectSchemaName, model)

  // step1: save the online object.
  await onlineParseObject.save()

  // step2: save it's recorder.
  // await updateParseRecorder(objectSchemaName, onlineParseObject)

  const _originalModel = parseOnlineParseObject(objectSchemaName, onlineParseObject);
  const action = {
    type: WRITE_MODEL_DONE,
    payload: {parseId: model.parseId, originModel: _originalModel}
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


async function _uploadPhoto({newPhotoInstance, file}): Promise<Array<Action>> {
  const thumbnailFile = new Parse.File('image', file)
  await thumbnailFile.save()
  const photo = createParseInstance(PARSE_PHOTOS)

  // step1: generate photo.
  await  Records.createOnlineParseInstance(
    MODEL_FORM_TYPE_NEW,
    photo,
    PARSE_PHOTOS,
    Object.assign({}, newPhotoInstance, {
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


async function _uploadLoggedUser(model: object): Promise<Array<Action>> {
  // step1: get logged user.
  const current = await getQueryByType(PARSE_USERS).get(model.parseId)

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


function invokeEventFromAction(action: Promise<Array<Action>>): ThunkAction {
  return (dispatch) => {
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

async function _ownPhotoForRecipe(recipeId: string, photoId: string): Promise<Array<Action>> {
  // step1: get photo.
  const photo = await getQueryByType(PARSE_PHOTOS).get(photoId)

  const isOwner = Photos.isPhotoParseObjectOwnRecipe(recipeId, photo);

  if (isOwner) {
    photo.set('photoType', 'restaurant')
    photo.set('recipe', null)
  } else {
    photo.set('photoType', 'recipe')
    photo.set('recipe', getInstanceWithoutData(PARSE_RECIPES, recipeId))
  }

  // step2: update photo.
  await photo.save()

  const action = {
    type: SAVE_MODEL_REQUEST,
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}

/**
 * http://docs.parseplatform.org/js/guide/#objects
 * @param photo
 * @returns {Promise.<*[]>}
 * @private
 */
async function _removeSelectedPhoto(photo: object): Promise<Array<Action>> {

  // step1: get online photo instance.
  const onlinePhoto = await getQueryByType(PARSE_PHOTOS).get(photo.id)

  onlinePhoto.destroy()

  // step2: update the recorder
  await updateParseRecorderFlagStatus(PARSE_PHOTOS, onlinePhoto, PARSE_OBJECT_FLAG_REMOVED)

  const action = {
    type: SAVE_MODEL_REQUEST,
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}

async function _ownAnotherPhotoUser(photoId: string, selectedUserId: string): Promise<Array<Action>> {
  // step1: get online photo instance.
  const onlinePhoto = await getQueryByType(PARSE_PHOTOS).get(photoId)

  const _creator = getInstanceWithoutData(PARSE_USERS, selectedUserId)
  onlinePhoto.set('creator', _creator);

  // step2: update user.
  await onlinePhoto.save()

  // step3: save it's recorder.
  await updateParseRecorder(PARSE_PHOTOS, onlinePhoto)

  const action = {
    type: SAVE_MODEL_REQUEST,
  }
  return Promise.all([
    Promise.resolve(action)
  ])
}


export default {
  writeOnlineParseObject({
                           editModelType,
                           objectSchemaName,
                           model
                         }): ThunkAction {
    return invokeEventFromAction(_writeOnlineParseObject(editModelType, objectSchemaName, model))
  },

  // write Online parse Objects.
  // Photos

  uploadPhoto(model: object): ThunkAction {
    return invokeEventFromAction(_uploadPhoto(model))
  },

  uploadLoggedUser(model: object): ThunkAction {
    return invokeEventFromAction(_uploadLoggedUser(model))
  },

  // Photos owner
  ownAnotherPhotoUser(photoId: string, selectedUserId: string): ThunkAction {
    return invokeEventFromAction(_ownAnotherPhotoUser(photoId, selectedUserId))
  },

  // Remove Photos
  removeSelectedPhoto(photo: object): ThunkAction {
    return invokeEventFromAction(_removeSelectedPhoto(photo))
  },

  // Relate photo for recipe.
  ownPhotoForRecipe({recipeId, photoId}): ThunkAction {
    return invokeEventFromAction(_ownPhotoForRecipe(recipeId, photoId))
  }
}
