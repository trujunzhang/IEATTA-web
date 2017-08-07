import Telescope from '../../../lib'
import React, {Component} from 'react'

/**
 * ### Translations
 */
// const I18n = require('react-native-i18n')
// import Translations from '../../../../lib/Translations'

// I18n.translations = Translations

/**
 *  The fantastic little form library
 */
// const t = require('../../../vendor/tcomb-form')


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

    // let displayName = {
    // label: I18n.t('editRestaurant.displayName'),
    // editable: !this.props.form.isFetching,
    // hasError: this.props.form.fields.displayNameHasError,
    // error: I18n.t(this.props.form.fields.displayNameErrorMsg)
    // }

    // const editRestaurantForm = t.struct({
    //   displayName: t.String
    // })

    // options.fields['displayName'] = displayName
    // options.fields['displayName'].placeholder = I18n.t('editRestaurant.displayNamePlaceHolder')
    // options.fields['displayName'].autoCapitalize = 'none'


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <div>xxx</div>
    )
  }
}

export default RestaurantForm;
