import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

/**
 * ### Translations
 */
// const I18n = require('react-i18n')
// import Translations from '../../../lib/Translations'

// I18n.translations = Translations

const {updateEvent, timeout} = require('../../../actions').default


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
      editModel: this.pageForm,
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
        rate: nextProps.editModel.form.fields.rate,
        body: nextProps.editModel.form.fields.body,
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
    if (value.body !== '') {
      this.props.actions.onEditModelFormFieldChange('body', value.body)
    }

    this.setState(
      {value}
    )
  }

  renderLeft() {
    return (
      <Telescope.components.EditReviwForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {dispatch, event} = this.props;

    const objectId = event.id;
    const rate = this.props.editModel.form.fields.rate;
    const body = this.props.editModel.form.fields.body;

    this.props.actions.updateModelRequest();

    try {
      await Promise.race([
        dispatch(updateEvent({objectId, displayName, eventWhat, eventStart, eventEnd})),
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
      <div className="form-footer">
        <button
          onClick={this.onButtonPress.bind(this)}
          disabled={isDisabled}
          id="submit-biz-details-changes"
          name="action_submit"
          type="submit"
          value="Submit Changes"
          className="ybtn ybtn--primary">
          <span>{`${isNewModelPage(this.state.pageForm) ? 'Create' : 'Update'} Event`}</span>
        </button>
        <a onClick={this.props.goBack}>
          {'Cancel'}
        </a>
      </div>
    )
  }

  renderContent() {
    return (
      <div
        className="yform create-event-container js-event-create-form"
        id="create_event"
        name="create_event">

        {this.renderLeft()}

        {this.renderLeftButton()}

      </div>

    )
  }


  renderTitle() {
    return (
      <div className="section-header">
        <h2>{`${isNewModelPage(this.state.pageForm) ? 'Submit' : 'Update'} an Review`}</h2>
      </div>
    )
  }

  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container create-event-page">

            {this.renderTitle()}

            <div className="clearfix layout-block layout-a">

              <div className="column column-alpha ">
                {this.renderContent()}
              </div>

            </div>

          </div>
        </div>
      </div>
    );
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
