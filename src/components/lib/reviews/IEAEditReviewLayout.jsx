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

  renderRating() {
    return (
      <div className="arrange arrange--middle">
        <div className="arrange_unit arrange_unit--fill">
          <div className="clearfix">

            <fieldset className="star-selector js-star-selector">
              <ul
                className="star-selector_stars i-selector-stars js-star-selector_stars i-selector-stars--extra-large-0">
                <li className="star-selector_star js-star-selector_star show-tooltip">
                  <input className="star-selector_input js-star-selector_input" id="rating-1" name="rating" type="radio"
                         value="1"/>
                  <label className="star-selector_label">1 (Eek! Methinks not.)</label>
                </li>
                <li className="star-selector_star js-star-selector_star show-tooltip"
                    data-label="Meh. I've experienced better.">
                  <input className="star-selector_input js-star-selector_input" id="rating-2" name="rating" type="radio"
                         value="2"/>
                  <label className="star-selector_label">2 (Meh. I've experienced better.)</label>
                </li>
                <li className="star-selector_star js-star-selector_star show-tooltip" data-label="A-OK.">
                  <input className="star-selector_input js-star-selector_input" id="rating-3" name="rating" type="radio"
                         value="3"/>
                  <label className="star-selector_label">3 (A-OK.)</label>
                </li>
                <li className="star-selector_star js-star-selector_star show-tooltip" data-label="Yay! I'm a fan.">
                  <input className="star-selector_input js-star-selector_input" id="rating-4" name="rating" type="radio"
                         value="4"/>
                  <label className="star-selector_label">4 (Yay! I'm a fan.)</label>
                </li>
                <li className="star-selector_star js-star-selector_star show-tooltip star-selector_star--last"
                    data-label="Woohoo! As good as it gets!">
                  <input className="star-selector_input js-star-selector_input" id="rating-5" name="rating" type="radio"
                         value="5"/>
                  <label className="star-selector_label">5 (Woohoo! As good as it gets!)</label>
                </li>
              </ul>
              <p className="star-selector_description js-star-selector_description">Select your rating.</p>
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
        <h2>{`${isNewModelPage(this.state.pageForm) ? 'Write' : 'Update'} an Review`}</h2>
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
