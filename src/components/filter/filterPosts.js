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
'use strict'

let {convertToObject} = require('../../lib/utils')

let _ = require('underscore')

export function getDefaultListTask(terms: Any) {
  const {listId, limit} = terms;
  return {
    id: listId,
    ready: false,
    totalCount: 0,
    limit: limit,
    firstPagination: true,
    pageIndex: 1,
    results: []
  }
}

export function byListId(listContainerTasks: Any, terms: Any, lastTask: Any) {
  const {listId, limit} = terms;

  const taskObject = convertToObject(listContainerTasks)

  let task = taskObject[listId]
  if (!!task) {
    return task
  }

  if (!!lastTask) return lastTask;

  return {
    id: listId,
    ready: false,
    totalCount: 0,
    limit: limit,
    firstPagination: true,
    pageIndex: 1,
    results: []
  }
}

export function getModelByObjectId(nextProps: Any, forObjectId: string, lastModel: Any) {
  const {detailedModelsOverlay} = nextProps,
    {currentModel} = detailedModelsOverlay;

  if (!!currentModel) {
    const {objectId, model} = currentModel;
    if (!!objectId && objectId === forObjectId) {
      return model;
    }
  }
  return lastModel;
}

export function generateMarkers(listContainerTasks: Any, terms: Any, lastModel: Any) {
  const {listId, limit} = terms;
  const taskObject = convertToObject(listContainerTasks)

  const task = (taskObject[listId])

  return (task.results || []).map((item, index) => {
    return {lat: item.geoLocation.latitude, lng: item.geoLocation.longitude}
  })
}

