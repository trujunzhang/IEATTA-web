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

const {
    RestaurantService, EventService, PeopleInEventService,
    RecipeService,
    PhotoService,
    UserService,
    ReviewService
} = require('../parse/realmApi').default

const {getLocalImageUri} = require('../parse/fsApi')

/**
 * The states were interested in
 */
const {
    QUERY_REVIEWS,
} = require('../lib/constants').default

async function _saveRealmRestaurant(model: object): Promise<Array<Action>> {
    const results = ReviewService.findBymodel(model)
    const action = {
        type: QUERY_REVIEWS,
        payload: {forObjectId: model.forObjectId, reviewType: model.reviewType, results}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function saveRealmRestaurant(model: object): ThunkAction {
    return (dispatch) => {
        const action = _saveRealmRestaurant(model)

        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}

export default {
    saveRealmRestaurant,
}
