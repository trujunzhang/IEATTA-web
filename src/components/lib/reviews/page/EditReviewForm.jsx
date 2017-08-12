import Telescope from '../../../lib'
import React, {Component} from 'react'

const I18n = require('react-redux-i18n').I18n;

const reviewBodyPlaceHolder = I18n.t('editReview.reviewBodyPlaceHolder');

class EditReviewForm extends Component {


  constructor(props, context) {
    super(props)

    this.state = {
      rateStarHoverIndex: 0,
      rateStarSelectIndex: 0,
    }
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
      rateStarSelectIndex: index
    });
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

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    const reviewBody = this.props.form.fields.reviewBody;

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <div className="rating-and-comment pseudo-input focused">
        {this.renderRating()}

        <div className="review-widget">
        <textarea
          className="review-textarea expanded placeholder"
          placeholder={reviewBodyPlaceHolder}
          id="review-text"
          defaultValue={reviewBody}
          // onChange={locals.onChange}
          value={reviewBody}
          name="review-text"/>
        </div>

      </div>
    )
  }
}

export default EditReviewForm;
