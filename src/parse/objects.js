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


const Parse = require('parse')


const ParseRestaurant = Parse.Object.extend('Restaurant')
const ParseEvent = Parse.Object.extend('Event')
const ParsePeopleInEvent = Parse.Object.extend('PeopleInEvent')
const ParseUser = Parse.Object.extend('User')
const ParseReview = Parse.Object.extend('Review')
const ParseRecipe = Parse.Object.extend('Recipe')
const ParseRecord = Parse.Object.extend('Record')
const ParsePhoto = Parse.Object.extend('Photo')

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
} = require('../lib/constants').default


function createParseInstance(objectSchemaName) {
  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return new ParseRestaurant();
    case PARSE_RECORDS:
      return new ParseRecord();
    case PARSE_REVIEWS:
      return new ParseReview();
    case PARSE_PHOTOS:
      return new ParsePhoto();
  }
}

function setParseObjectFieldWithoutData(parseType, instance, parseInstanceId) {
  switch (parseType) {
    case "restaurant":
      instance.set('restaurant', ParseRestaurant.createWithoutData(parseInstanceId))
      break;
    case "event":
      instance.set('event', ParseEvent.createWithoutData(parseInstanceId))
      break;
    case "recipe":
      instance.set('recipe', ParseRecipe.createWithoutData(parseInstanceId))
      break;
    case "user":
      instance.set('user', ParseUser.createWithoutData(parseInstanceId))
      break;
    case "review":
      instance.set('review', ParseReview.createWithoutData(parseInstanceId))
      break;
    default:
      throw new Error('No matched parseType to create parse without data!')
      break;
  }
}


export default {
  ParseRestaurant,
  ParseEvent,
  ParsePeopleInEvent,
  ParseUser,
  ParseReview,
  ParseRecipe,
  ParseRecord,
  ParsePhoto,
  createParseInstance,
  setParseObjectFieldWithoutData,
}
