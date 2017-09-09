/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'


/**
 * ## Imports
 *
 * The actions supported
 */
const {
  ON_EDIT_MODEL_FORM_FIELD_CHANGE,
  ON_RESTAURANT_MODEL_FORM_ADDRESS_FIELD_CHANGE,
  EDIT_MODEL_TOGGLE_TYPE,
  UPDATE_MODEL_REQUEST,
  UPDATE_MODEL_SUCCESS,
  UPDATE_MODEL_FAILURE,
} = require('../../lib/constants').default


const _ = require('underscore')

/**
 * ## State actions
 * controls which form is displayed to the user
 */
export function toggleEditModelType(tag, model, editModelType) {
  return {
    type: EDIT_MODEL_TOGGLE_TYPE,
    payload: {tag, model, editModelType}
  }
}


/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onEditModelFormFieldChange(field, value, ignoreValidation = false) {
  return {
    type: ON_EDIT_MODEL_FORM_FIELD_CHANGE,
    payload: {field: field, value: value, ignoreValidation: ignoreValidation}
  }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onRestaurantFormAddressFieldChange(restaurant) {
  return {
    type: ON_RESTAURANT_MODEL_FORM_ADDRESS_FIELD_CHANGE,
    payload: {restaurant}
  }
}

/**
 * ## Login actions
 */
export function updateModelRequest() {
  return {
    type: UPDATE_MODEL_REQUEST
  }
}

export function updateModelSuccess() {
  return {
    type: UPDATE_MODEL_SUCCESS
  }
}

export function updateModelFailure(error) {
  return {
    type: UPDATE_MODEL_FAILURE,
    payload: error
  }
}
