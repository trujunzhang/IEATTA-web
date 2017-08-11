import Telescope from '../../../lib'
import React, {Component} from 'react'

import t from 'tcomb-form';

const Form = t.form.Form;

const I18n = require('react-redux-i18n').I18n;


class EditRecipeForm extends Component {

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {

    let displayName = {
      label: I18n.t('editRecipe.displayName'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.displayNameHasError,
      error: I18n.t(this.props.form.fields.displayNameErrorMsg),
      attrs: {
        placeholder: I18n.t('editRecipe.displayNamePlaceHolder')
      }
    }

    const editRecipeForm = t.struct({
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
            type={editRecipeForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default EditRecipeForm;
