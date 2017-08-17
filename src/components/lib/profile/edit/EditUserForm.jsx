import Telescope from '../../index'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form/main'
import t from 'tcomb-form';

const Form = t.form.Form;

const I18n = require('react-redux-i18n').I18n;

class EditUserForm extends Component {


  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {

    let username = {
      label: I18n.t('editUser.displayName'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: I18n.t(this.props.form.fields.usernameErrorMsg),
      attrs: {
        placeholder: I18n.t('editUser.displayNamePlaceHolder')
      }
    }

    let email = {
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: I18n.t(this.props.form.fields.emailErrorMsg)
    }

    const editUserForm = t.struct({
      username: t.String,
      email: t.String,
    })

    let options = {
      fields: {
        username: username,
        email: email,
      }
    }

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
            type={editUserForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default EditUserForm;
