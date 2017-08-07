/**
 * # editModelReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./editModelInitialState').default
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./editModelFormValidation').default

/**
 * ## Auth actions
 */
const {
    SET_STATE,
    ON_EDIT_MODEL_FORM_FIELD_CHANGE,
    EDIT_MODEL_TOGGLE_TYPE,
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
} = require('../../lib/constants').default

const initialState = new InitialState()

/**
 * ## editModelReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function editModelReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

    switch (action.type) {

        /**
         * ### Loggin in state
         * The user isn't logged in, and needs to
         *
         * Set the form state and clear any errors
         */
        case EDIT_MODEL_TOGGLE_TYPE:
            return new InitialState()
                .setIn(['form', 'state'], action.payload)

        /**
         * ### Auth form field change
         *
         * Set the form's field with the value
         * Clear the forms error
         * Pass the fieldValidation results to the
         * the formValidation
         */
        case ON_EDIT_MODEL_FORM_FIELD_CHANGE: {
            const {field, value, ignoreValidation} = action.payload
            let nextState = state.setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null)

            if (ignoreValidation) return nextState;

            return formValidation(
                fieldValidation(nextState, action)
                , action)
        }

        /**
         * ### Hot Loading support
         *
         * Set all the field values from the payload
         */
        case SET_STATE:
            let form = JSON.parse(action.payload).auth.form

            let next = state.setIn(['form', 'state'], form.state)
                .setIn(['form', 'disabled'], form.disabled)
                .setIn(['form', 'error'], form.error)
                .setIn(['form', 'isValid'], form.isValid)
                .setIn(['form', 'isFetching'], false)
                .setIn(['form', 'fields', 'displayName'], form.fields.displayName)
                .setIn(['form', 'fields', 'displayNameHasError'], form.fields.displayNameHasError)
                .setIn(['form', 'fields', 'eventWhat'], form.fields.eventWhat)
                .setIn(['form', 'fields', 'eventWhatHasError'], form.fields.eventWhatHasError)
                .setIn(['form', 'fields', 'price'], form.fields.price)
                .setIn(['form', 'fields', 'priceHasError'], form.fields.priceHasError)

            return next

    }
    /**
     * ## Default
     */
    return state
}

export default editModelReducer;
