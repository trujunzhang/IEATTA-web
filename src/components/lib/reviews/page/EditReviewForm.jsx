import Telescope from '../../../lib'
import React, {Component} from 'react'


// import t from '../../../vendor/tcomb-form/main'
import t from 'tcomb-form';

const Form = t.form.Form;

const I18n = require('react-redux-i18n').I18n;

const reviewBodyPlaceHolder = I18n.t('editReview.reviewBodyPlaceHolder');

const myDescriptionTemplate = t.form.Form.templates.textbox.clone({
  // override just the input default implementation (labels, help, error will be preserved)
  renderInput: (locals) => {
    return (
      <textarea
        className="review-textarea expanded placeholder"
        placeholder={reviewBodyPlaceHolder}
        id="description"
        defaultValue={locals.value}
        // onChange={locals.onChange}
        value={locals.value}
        name="description"/>
    )
  }
})

class EditReviewForm extends Component {


  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {


    let reviewBody = {
      label: I18n.t('editReview.reviewBody'),
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.reviewBodyHasError,
      error: I18n.t(this.props.form.fields.reviewBodyErrorMsg),
      template: myDescriptionTemplate
    }

    const editReviewForm = t.struct({
      reviewBody: t.String,
    })

    let options = {
      fields: {
        reviewBody: reviewBody
      }
    }

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
            type={editReviewForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default EditReviewForm;
