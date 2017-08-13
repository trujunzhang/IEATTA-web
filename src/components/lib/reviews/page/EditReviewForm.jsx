import Telescope from '../../../lib'
import React, {Component} from 'react'

const I18n = require('react-redux-i18n').I18n;

import onClickOutside from 'react-onclickoutside'

const reviewBodyPlaceHolder = I18n.t('editReview.reviewBodyPlaceHolder');

class EditReviewForm extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      rateStarHoverIndex: 0,
      rateStarSelectIndex: 0,
      hasFormFocus: false
    }
  }

  handleClickOutside(e) {
    this.setState({hasFormFocus: false})
    this.refs.reviewBodyRef.blur();
  }

  onMouseEnterHandler(index) {
    this.setState({
      rateStarHoverIndex: index
    });
  }

  onMouseLeaveHandler() {
    this.setState({
      rateStarHoverIndex: -1
    });
  }

  onRateStarPress(index) {
    this.setState({
      rateStarSelectIndex: index,
      hasFormFocus: true
    });

    this.props.actions.onEditModelFormFieldChange('reviewRating', index)
    this.refs.reviewBodyRef.focus();
  }

  renderRating() {
    const rateStarLabels = [
      'Select your rating.',
      "Eek! Methinks not.",
      "Meh. I've experienced better.",
      "A-OK.",
      "Yay! I'm a fan.",
      "Woohoo! As good as it gets!"
    ]
    const {rateStarHoverIndex, rateStarSelectIndex} = this.state;
    let currentRateIndex = rateStarSelectIndex;
    if (rateStarHoverIndex !== -1) {
      currentRateIndex = rateStarHoverIndex;
    }

    return (
      <div className="arrange arrange--middle">
        <div className="arrange_unit arrange_unit--fill">
          <div className="clearfix">

            <fieldset className="star-selector js-star-selector">
              <ul
                className={`star-selector_stars i-selector-stars js-star-selector_stars i-selector-stars--extra-large-${currentRateIndex}`}>
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <li key={index}
                        onMouseEnter={() => this.onMouseEnterHandler(index + 1)}
                        onMouseLeave={this.onMouseLeaveHandler.bind(this)}
                        onClick={() => this.onRateStarPress(index + 1)}
                        className="star-selector_star js-star-selector_star show-tooltip">
                    </li>
                  )
                })}
              </ul>
              <p className="star-selector_description js-star-selector_description">
                {rateStarLabels[currentRateIndex]}
              </p>
            </fieldset>


          </div>

        </div>
      </div>
    )
  }

  onReviewBodyChanged(e) {
    const value = e.target.value;
    this.props.actions.onEditModelFormFieldChange('reviewBody', value)
  }

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    const reviewBody = this.props.form.fields.reviewBody;
    const {hasFormFocus} = this.state;
    const formClass = `rating-and-comment pseudo-input${hasFormFocus ? " focused" : ""}`;
    const currentReviewBodyPlaceHolder = hasFormFocus ? "" : reviewBodyPlaceHolder;

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <div className={formClass}>
        {this.renderRating()}

        <div className="review-widget">
        <textarea
          ref={'reviewBodyRef'}
          onFocus={() => {
            this.setState({hasFormFocus: true})
          }}
          className="review-textarea expanded placeholder"
          placeholder={currentReviewBodyPlaceHolder}
          id="review-text"
          onChange={this.onReviewBodyChanged.bind(this)}
          value={reviewBody}
          name="review-text"/>
        </div>

      </div>
    )
  }
}

export default onClickOutside(EditReviewForm);
