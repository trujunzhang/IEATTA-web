import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  updateEvent,
  showAlertMessage,
  timeout
} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_USER,
} = require('../../../lib/constants').default

const {
  isNewModelPage
} = require('../../filter/filterRoutes')


class IEAEditUserLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      pageForm: props.pageForm,
      value: {
        displayName: props.editModel.form.fields.displayName,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_USER);
    props.actions.onEditModelFormFieldChange('displayName', props.userProfile.username || '', true)
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
      <Telescope.components.EditUserForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {dispatch, userProfile} = this.props;

    const objectId = userProfile.id;
    const displayName = this.props.editModel.form.fields.displayName;
    const eventWhat = this.props.editModel.form.fields.eventWhat;
    const eventStart = this.props.editModel.form.fields.start;
    const eventEnd = this.props.editModel.form.fields.end;

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
        this.props.dispatch(showAlertMessage(message))
        // debugger
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
          <span>{"Save Changes"}</span>
        </button>
        <a onClick={this.props.goBack}>
          {'Cancel'}
        </a>
      </div>
    )
  }


  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="clearfix layout-block layout-n column--responsive account-settings_container">


            <div className="column column-beta column--responsive">
              <div className="account-settings_content">
                <div className="section-header clearfix">
                  <h2>Profile</h2>
                </div>

                <div className="profile-bio yform yform-vertical-spacing" name="profile_bio">

                  <div className="profile-bio">
                    {this.renderLeft()}

                    {this.renderLeftButton()}

                  </div>

                </div>
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

export default withRouter(connect(select, mapDispatchToProps)(IEAEditUserLayout));
