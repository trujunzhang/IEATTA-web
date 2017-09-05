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

const {convertToObject} = require('../../lib/utils')

const _ = require('underscore')

/**
 * 1. Special Task for Photos List.
 *    when the last task already fetched the total photos count.
 *    So this time need to keep the 'total' field value.
 * @param terms
 * @param lastTask
 * @returns {{id: Any.listId, ready: boolean, totalCount: number, limit: Any.limit, firstPagination: boolean, pageIndex: (Any.pageIndex|number), results: Array}}
 */
export function getDefaultListTask(terms: Any, lastTask = {}) {
  const {listId, limit, pageIndex} = terms;

  debugger

  return {
    id: listId,
    ready: false,
    totalCount: lastTask.totalCount || -1,
    limit: limit,
    firstPagination: true,
    pageIndex: pageIndex || 1,
    results: []
  }
}

/**
 * Filter the taskList.
 *
 * @param listContainerTasks
 * @param listId
 * @param lastTask
 * @returns {Any}
 */
export function byListId(listContainerTasks: Any, {listId}, lastTask: Any) {
  const taskObject = convertToObject(listContainerTasks)
  let task = taskObject[listId]
  if (!!task) {
    return task
  }

  return lastTask;
}

export function getModelByObjectId(nextProps: Any, forObjectId: string, lastModel: Any, payLoadKey = "currentModel") {
  const {detailedModelsOverlay} = nextProps;
  const payLoad = detailedModelsOverlay[payLoadKey];


  if (!!payLoad) {
    const {objectId, model} = payLoad;
    if (!!objectId && objectId === forObjectId) {
      return model;
    }
  }
  return lastModel;
}

export function generateMarkers(listContainerTasks: Any, listId: string) {
  const taskObject = convertToObject(listContainerTasks)

  const task = (taskObject[listId] || {})

  return (task.results || []).map((restaurant, index) => {
    return getMarker(restaurant)
  })
}

export function getMarker(restaurant: Object) {
  return {lat: restaurant.geoLocation.latitude, lng: restaurant.geoLocation.longitude}
}


