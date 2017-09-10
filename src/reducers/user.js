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

/**
 * The states were interested in
 */
const {
  LOGGED_IN,
  LOGGED_OUT,
  SET_SHARING,
} = require('../lib/constants').default


import type {Action} from '../actions/types'

export type State = {
  isLoggedIn: boolean,
  hasSkippedLogin: boolean,
  // User Instance
  id: ? string,
  username: ? string,
  loginType: ? string,
  email: ? string,
  defaultAvatarUrl: ? string,
  updatedAt: ? Date,
  uniqueId: ?string;
}


const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  // User Instance
  id: null,
  username: null,
  loginType: null,
  email: null,
  defaultAvatarUrl: null,
  updatedAt: null,
  uniqueId: null,
}

function user(state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOGGED_IN: {
      let {id, username, loginType, email, defaultAvatarUrl, updatedAt, uniqueId} = action.payload
      return {
        isLoggedIn: true,
        hasSkippedLogin: false,
        id, username, loginType, email, defaultAvatarUrl, updatedAt, uniqueId
      }
    }
    case LOGGED_OUT: {
      return initialState
    }
    case SET_SHARING: {
      return {
        ...state
      }
    }
  }

  return state
}

export default user;
