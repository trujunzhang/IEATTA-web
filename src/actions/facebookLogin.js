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
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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

// ========================
// For Web Apps
// ========================
const Parse = require('parse')

/**
 * The states were interested in
 */
const {
  LOGGED_IN,
  LOGGED_OUT,
  SET_SHARING,
  // parse models
  PARSE_RESTAURANTS,
  PARSE_USERS,
} = require('../lib/constants').default

const {
  getQueryByType
} = require('../parse/parseUtiles').default

const UUID = require('../components/vendor/uuid');

async function queryFacebookAPI(path, ...args): Promise {
  return new Promise((resolve, reject) => {
    FB.api('/me?fields=id,name,email,permissions', function (response) {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    })
  })
}


const slugify = require('slugify')
// const FacebookSDK = require('FacebookSDK')
const {updateInstallation} = require('./installation')

const {fromParseUser} = require('../parse/parseModels')

import type {Action, ThunkAction} from './types'


async function ParseFacebookLogin(scope): Promise {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    })
  })
}

async function _logInWithFacebook(source: ? object): Promise<Array<Action>> {
  const facebookUser = await ParseFacebookLogin('public_profile,email,name,user_friends');
  const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

  let user = facebookUser

  user.set('facebook_id', profile.id);
  user.set('username', profile.name)
  user.set('email', profile.email)
  user.set('slug', slugify(profile.name, '_'))
  user.set('uniqueId', UUID.create().toString())
  user.set('loginType', 'facebook')

  await user.save();

  const current = await getQueryByType(PARSE_USERS, ['photos']).get(user.id)

  // await updateInstallation({user})

  const action = {
    type: LOGGED_IN,
    payload: fromParseUser(current)
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function logInWithFacebook(source: ?object): ThunkAction {
  return (dispatch) => {
    const action = _logInWithFacebook(source)

    // Loading friends schedules shouldn't block the login process
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


export default {
  logInWithFacebook
}
