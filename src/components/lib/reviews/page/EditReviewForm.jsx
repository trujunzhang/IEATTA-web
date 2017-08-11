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
      <div className="review-widget">
      <textarea
        className="review-textarea expanded placeholder"
        placeholder={reviewBodyPlaceHolder}
        id="review-text"
        defaultValue={locals.value}
        // onChange={locals.onChange}
        value={locals.value}
        name="description"/>
      </div>
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
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.reviewBodyHasError,
      error: I18n.t(this.props.form.fields.reviewBodyErrorMsg),
      template: myDescriptionTemplate
    }

    const editReviewForm = t.struct({
      reviewBody: t.String,
    })

    let options = {
      auto: 'placeholders',
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
