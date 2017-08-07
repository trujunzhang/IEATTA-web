import Telescope from '../../../lib'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form'
import t from 'tcomb-form';

const Form = t.form.Form;

/**
 * ### Translations
 */
const I18n = require('react-i18n')
// import Translations from '../../../../lib/Translations'

// I18n.translations = Translations


class RestaurantForm extends Component {

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

    let options = {
      fields: {}
    }

    let displayName = {
      // label: I18n.t('editRestaurant.displayName'),
      label: "wanghao",
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.displayNameHasError,
      // error: I18n.t(this.props.form.fields.displayNameErrorMsg)
    }

    const editRestaurantForm = t.struct({
      displayName: t.String
    })

    options.fields['displayName'] = displayName
    // options.fields['displayName'].placeholder = I18n.t('editRestaurant.displayNamePlaceHolder')
    // options.fields['displayName'].attrs['placeholder'] = "place-wh"


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
            type={editRestaurantForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default RestaurantForm;
