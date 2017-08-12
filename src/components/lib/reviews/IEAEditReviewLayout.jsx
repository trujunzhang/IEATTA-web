import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

/**
 * ### Translations
 */
// const I18n = require('react-i18n')
// import Translations from '../../../lib/Translations'

// I18n.translations = Translations

const {
  createNewReview,
  timeout
} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
} = require('../../../lib/constants').default

const {
  isNewModelPage
} = require('../../filter/filterRoutes')


class IEAEditReviewLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      pageForm: props.pageForm,
      rateStarHoverIndex: 0,
      rateStarSelectIndex: 0,
      value: {
        reviewRating: props.editModel.form.fields.reviewRating,
        reviewBody: props.editModel.form.fields.reviewBody,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT);
    props.actions.onEditModelFormFieldChange('reviewRating', props.review.rate || 0, true)
    props.actions.onEditModelFormFieldChange('reviewBody', props.review.body || '', true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        reviewRating: nextProps.editModel.form.fields.reviewRating,
        reviewBody: nextProps.editModel.form.fields.reviewBody,
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.reviewBody !== '') {
      this.props.actions.onEditModelFormFieldChange('reviewBody', value.reviewBody)
    }

    this.setState(
      {value}
    )
  }

  renderFormBody() {
    return (
      <Telescope.components.EditReviewForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {dispatch, forObject} = this.props;

    const forObjectId = forObject.id;
    const reviewType = this.state.reviewType;
    const reviewRating = this.props.editModel.form.fields.reviewRating;
    const reviewBody = this.props.editModel.form.fields.reviewBody;

    this.props.actions.updateModelRequest();

    try {
      await Promise.race([
        dispatch(createNewReview({forObjectId, reviewType, reviewRating, reviewBody})),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        // debugger
        alert(message);
        // console.warn(e);
      }
    } finally {
      this.props.actions.updateModelSuccess();
      // this._isMounted && this.setState({isLoading: false});
    }
  }


  renderLeftButton() {
    const {editModel} = this.props;
    const isDisabled = (!editModel.form.isValid || editModel.form.isFetching);

    return (
      <div className="ysection">
        <div className="arrange arrange--middle arrange--30">
          <div className="arrange_unit nowrap">

            <p className="action-buttons below-the-fold">
              <button
                onClick={this.onButtonPress.bind(this)}
                value="submit"
                className="ybtn ybtn--primary ybtn--small ybtn-full-responsive-small">
                <span>{`${isNewModelPage(this.state.pageForm) ? 'Post' : 'Update'} Review`}</span>
              </button>
              <a onClick={this.props.goBack}>
                {'Cancel'}
              </a>
            </p>

          </div>
        </div>
        <small className="subtle-text">* You can always edit or remove reviews later.</small>
      </div>
    )
  }

  renderFormTitle() {
    return (
      <div>
        <label>Your review</label>
      </div>
    )
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

  renderForm() {
    return (
      <div className="yform" id="review_rate_form" name="review_rate_form">

        <div className="write-review integrated-rating-comment ysection js-war-compose_review-section expanded">

          {this.renderFormTitle()}

          <div className="js-character-counter">
            <div className="rating-and-comment pseudo-input">

              {this.renderRating()}
              {this.renderFormBody()}

            </div>
          </div>
        </div>

        <div className="js-war-compose_survey-section ysection">

          {this.renderLeftButton()}

        </div>
      </div>
    )
  }


  renderTitle() {
    return (
      <div className="section-header">
        <h3
          className="js-war_main-header">{`${isNewModelPage(this.state.pageForm) ? 'Write' : 'Update'} an Review`}</h3>
      </div>
    )
  }


  renderLeftPanel() {
    return (

      <div className="clearfix layout-block layout-a layout-border column--responsive">

        {this.renderTitle()}
        {this.renderTopSection()}

        {this.renderForm()}
      </div>
    )
  }

  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          {this.renderLeftPanel()}

        </div>
      </div>
    );
  }

  renderTopSection() {
    return (
      <Telescope.components.EditReviewTopSection  {...this.props}/>
    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(editModelActions, dispatch)
  }
}

function select(store, ownProps) {
  return {
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAEditReviewLayout));
