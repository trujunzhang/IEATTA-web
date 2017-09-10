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

import type {Action} from '../actions/types'

/**
 * The states were interested in
 */
const {
  OVERLAY_LOADED_MODEL_PAGE,
  OVERLAY_LOADED_MODEL_RESET,
  STATISTIC_CLOUD_MODEL,
  RESTAURANT_CLOUD_ADDRESS_MODEL,
  // Edit Model.
  UPDATE_MODEL_REQUEST,
  WRITE_MODEL_DONE,
} = require('../lib/constants').default

const initialState = {
  currentModel: null,
  statistic: null,
  googleAddressReverse: null
}

function detailedModelsOverlay(state: State = initialState, action: Action): State {

  switch (action.type) {
    case OVERLAY_LOADED_MODEL_PAGE:
      const nextState = Object.assign({}, state, {
        currentModel: action.payload
      })
      return nextState
    case STATISTIC_CLOUD_MODEL:
      const nextState = Object.assign({}, state, {
        statistic: action.payload
      })
      return nextState
    case RESTAURANT_CLOUD_ADDRESS_MODEL:
      const nextState = Object.assign({}, state, {
        googleAddressReverse: action.payload
      })
      return nextState
    /**
     * Update the current model after saved the model.
     */
    case UPDATE_MODEL_REQUEST:
      const nextState = Object.assign({}, state, {
        currentModel: action.payload
      })
      return nextState
    /**
     * After saved the parse objects.
     * If go back to the previous detailed page.
     *
     * The detailed page can use 'currentModel' to refresh the page.
     */
    case WRITE_MODEL_DONE:
      const nextState = Object.assign({}, state, {
        currentModel: action.payload
      })
      return nextState

    case OVERLAY_LOADED_MODEL_RESET:
      const nextState = Object.assign({}, state, {
        currentModel: null
      })
      return nextState
  }

  return state
}

export default detailedModelsOverlay
