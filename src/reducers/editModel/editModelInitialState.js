/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
} = require('../../lib/constants').default

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  disabled: false,
  error: null,
  isValid: true,
  isFetching: false,
  fields: new (Record({
    displayName: '',
    displayNameHasError: false,
    displayNameErrorMsg: '',
    eventWhat: '',
    eventWhatHasError: false,
    eventWhatErrorMsg: '',
    start: new Date(),
    end: new Date(),
    price: '',
    priceHasError: false,
    priceErrorMsg: '',
    reviewRating: 0,
    reviewBody: '',
    reviewBodyHasError: false,
    reviewBodyErrorMsg: '',
    //google address
    address: "",
    street_number: "",
    route: "",
    locality: "",
    sublocality: "",
    country: "",
    postal_code: "",
    administrative_area: ""
  }))()
})

/**
 * ## InitialState
 * The form is set
 */
let InitialState = Record({
  form: new Form()
})
export default InitialState

