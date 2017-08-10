import Telescope from '../../../lib'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form'
import t from 'tcomb-form';

const Form = t.form.Form;

const I18n = require('react-redux-i18n').I18n;

class EditEventForm extends Component {


  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {


    // const label = I18n.t('FieldValidation.valid_password');
    // debugger

    let displayName = {
      label: I18n.t('editRestaurant.displayName'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.displayNameHasError,
      // hasError: true,
      error: I18n.t(this.props.form.fields.displayNameErrorMsg),
      // error: "errorxxx ",
      attrs: {
        placeholder: I18n.t('editRestaurant.displayNamePlaceHolder')
      }
    }

    const editEditEventForm = t.struct({
      displayName: t.String
    })


    let options = {
      fields: {
        displayName: displayName
      }
    }

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
            type={editEditEventForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default EditEventForm;
