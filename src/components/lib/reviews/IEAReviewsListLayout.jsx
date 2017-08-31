import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  createNewReview,
  showAlertMessage,
  timeout
} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_REVIEW
} = require('../../../lib/constants').default

const {
  isNewModelPage
} = require('../../filter/filterRoutes')


class IEAReviewsListLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      pageForm: props.pageForm,
      value: {
        reviewRating: props.editModel.form.fields.reviewRating,
        reviewBody: props.editModel.form.fields.reviewBody,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_REVIEW);
    props.actions.onEditModelFormFieldChange('reviewRating', props.review.rate || 0, true)
    props.actions.onEditModelFormFieldChange('reviewBody', props.review.body || '')
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


  async onButtonPress() {
    const {dispatch, forObject} = this.props;

    const forObjectId = forObject.id;
    const currentUserId = this.props.currentUserId;
    const reviewType = this.props.reviewType;
    const reviewRating = this.props.editModel.form.fields.reviewRating;
    const reviewBody = this.props.editModel.form.fields.reviewBody;

    this.props.actions.updateModelRequest();

    let errorMessage = null
    try {
      await Promise.race([
        dispatch(createNewReview({forObjectId, reviewType, reviewRating, reviewBody, currentUserId})),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage(errorMessage))
        // debugger
        alert(message);
        // console.warn(e);
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.actions.updateModelSuccess();
        this.props.router.goBack();
      }
      // this._isMounted && this.setState({isLoading: false});
    }
  }


  renderLeftButton() {
    const {editModel} = this.props;
    const buttonDisabled = (!editModel.form.isValid || editModel.form.isFetching);

    return (
      <div className="ysection">
        <div className="arrange arrange--middle arrange--30">
          <div className="arrange_unit nowrap">

            <p className="action-buttons below-the-fold">
              <button
                onClick={this.onButtonPress.bind(this)}
                value="submit"
                disabled={buttonDisabled}
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

  renderForm() {
    return (
      <div className="yform" id="review_rate_form" name="review_rate_form">

        <div className="write-review integrated-rating-comment ysection js-war-compose_review-section expanded">

          {this.renderFormTitle()}

          <div className="js-character-counter">

            <Telescope.components.EditReviewForm
              form={this.props.editModel.form}
              value={this.state.value}
              actions={this.props.actions}
            />

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
    const {forObject, reviewType} = this.props;

    switch (reviewType) {
      case "restaurant":
        return (<Telescope.components.EditReviewTopRestaurant {...this.props}/>)
      case "recipe":
        return (<Telescope.components.EditReviewTopRecipe {...this.props}/>)
      case "event":
        return (<Telescope.components.EditReviewTopEvent {...this.props}/>)
    }

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
    currentUserId: store.user.id,
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAReviewsListLayout));
