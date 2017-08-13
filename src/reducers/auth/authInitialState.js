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
  REGISTER
} = require('../../lib/constants').default

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: REGISTER,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    // username: 'Jaron Lawrence',
    username: 'djzhang',
    // username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: 'djzhang@gmail.com',
    // email: '',
    emailHasError: false,
    emailErrorMsg: '',
    // password: 'jaronIEATTA@123',
    password: 'djzhang@123',
    // password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
    // passwordAgain: 'jaronIEATTA@123',
    passwordAgain: 'djzhang@123',
    // passwordAgain: '',
    passwordAgainHasError: false,
    passwordAgainErrorMsg: '',
    showPassword: false
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

