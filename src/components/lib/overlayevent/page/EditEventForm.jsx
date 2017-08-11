import Telescope from '../../../lib'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form/main'
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

    let displayName = {
      label: I18n.t('editEvent.displayName'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.displayNameHasError,
      error: I18n.t(this.props.form.fields.displayNameErrorMsg),
      attrs: {
        placeholder: I18n.t('editEvent.displayNamePlaceHolder')
      }
    }

    const myDescriptionTemplate = t.form.Form.templates.textbox.clone({
      // override just the input default implementation (labels, help, error will be preserved)
      renderInput: (locals) => {
        return (
          <textarea
            className="review-textarea expanded placeholder"
            id="description"
            name="description"
            placeholder={I18n.t('editEvent.eventWhatPlaceHolder')}
          >
            {locals.value}
            </textarea>
        )
      }
    })

    let eventWhat = {
      label: I18n.t('editEvent.eventWhat'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.eventWhatHasError,
      error: I18n.t(this.props.form.fields.eventWhatErrorMsg),
      template: myDescriptionTemplate
    }

    const editEditEventForm = t.struct({
      displayName: t.String,
      eventWhat: t.String,
    })


    let options = {
      fields: {
        displayName: displayName,
        eventWhat: eventWhat
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
