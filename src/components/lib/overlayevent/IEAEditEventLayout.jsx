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
      }
    }
    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT);
    props.actions.onEditModelFormFieldChange('displayName', props.event.displayName || '', true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        displayName: nextProps.editModel.form.fields.displayName,
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
          <span>Submit Changes</span>
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
        className="event-attrib-form yform"
        id="event_attrib_form"
        name="event_attrib_form">

        {this.renderLeft()}
        {this.renderLeftButton()}

      </div>

    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">


          <div className="container">
            <div className="clearfix layout-block layout-full" id="update-biz-details">

              <div className="column column-alpha ">

                <h2>Update Event Details</h2>

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
