import Telescope from '../../../lib'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form'
import t from 'tcomb-form';

const Form = t.form.Form;

const I18n = require('react-redux-i18n').I18n;

class EditRestaurantForm extends Component {

  constructor(props, context) {
    super(props)

  }

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {

    let displayName = {
      label: I18n.t('editRestaurant.displayName'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.displayNameHasError,
      error: I18n.t(this.props.form.fields.displayNameErrorMsg),
      attrs: {
        placeholder: I18n.t('editRestaurant.displayNamePlaceHolder')
      }
    }

    const editEditRestaurantForm = t.struct({
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
            type={editEditRestaurantForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default EditRestaurantForm;
