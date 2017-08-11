import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

/**
 * ### Translations
 */
// const I18n = require('react-i18n')
// import Translations from '../../../lib/Translations'

// I18n.translations = Translations

const {updateRestaurant, timeout} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  // Sections
  SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
  // Model Form Type
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class IEAEditEventLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      value: {
        displayName: props.editModel.form.fields.displayName,
        eventWhat: props.editModel.form.fields.eventWhat,
      }
    }
    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT);
    props.actions.onEditModelFormFieldChange('displayName', props.event.displayName || '', true)
    props.actions.onEditModelFormFieldChange('eventWhat', props.event.want || '', true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        displayName: nextProps.editModel.form.fields.displayName,
        eventWhat: nextProps.editModel.form.fields.eventWhat,
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
    if (value.displayName !== '') {
      this.props.actions.onEditModelFormFieldChange('displayName', value.displayName)
    }
    if (value.eventWhat !== '') {
      this.props.actions.onEditModelFormFieldChange('eventWhat', value.eventWhat)
    }
    this.setState(
      {value}
    )
  }

  renderLeft() {
    return (
      <Telescope.components.EditEventForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {dispatch, event} = this.props;

    let displayName = this.props.editModel.form.fields.displayName;

    this.props.actions.updateModelRequest();

    try {
      await Promise.race([
        dispatch(updateRestaurant({objectId: event.id, displayName: displayName})),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        debugger
        // alert(message);
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
    const isNewModel = true;

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
          <span>{`${isNewModel ? 'Create' : 'Update'} Event`}</span>
        </button>
        <a onClick={this.props.goBack}>
          Cancel
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

        <label>When</label>

        <div className="js-event-set-date event-calendar-fields">
          <div className="js-event-start-date-container date-container">
            <Telescope.components.F8CalenderView field="start"/>
          </div>
          <div className="js-event-end-date-container date-container">
            <strong className="create-event-date-middle-link">to</strong>
            <Telescope.components.F8CalenderView field="end"/>
          </div>
        </div>

        {this.renderLeftButton()}

      </div>

    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container create-event-page">


            <div className="section-header">
              <h2>Submit an Event</h2>
            </div>

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

export default withRouter(connect(select, mapDispatchToProps)(IEAEditEventLayout));