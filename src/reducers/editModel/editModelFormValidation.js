/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## Imports
 * the actions being addressed
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  MENU_ITEM_ADD_OR_EDIT_REVIEW,
  MENU_ITEM_ADD_OR_EDIT_USER,
  MENU_ITEM_ADD_OR_EDIT_RECIPE
} = require('../../lib/constants').default


import Events from '../../lib/events'
import Recipes from '../../lib/recipes'

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation(state) {
  const originModel = state.form.originModel;
  let validate = false;
  switch (state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
    case MENU_ITEM_ADD_OR_EDIT_RESTAURANT:
      if (state.form.fields.displayName !== '' &&
        !state.form.fields.displayNameHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
      break;
    case MENU_ITEM_ADD_OR_EDIT_EVENT:
      validate = Events.validateModel(state, originModel)
      return state.setIn(['form', 'isValid'], validate)
    case MENU_ITEM_ADD_OR_EDIT_RECIPE:
      validate = Recipes.validateModel(state, originModel)
      return state.setIn(['form', 'isValid'], validate)
    case MENU_ITEM_ADD_OR_EDIT_REVIEW:
      if (state.form.fields.reviewBody !== '' &&
        state.form.fields.reviewRating !== 0 &&
        !state.form.fields.reviewBodyHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
      break;
    case MENU_ITEM_ADD_OR_EDIT_USER:
      if (state.form.fields.displayName !== '' &&
        !state.form.fields.displayNameHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
      break;
  }
  return state
}
