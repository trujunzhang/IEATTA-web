import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  uploadLoggedUser,
  showAlertMessage,
  timeout
} = require('../../../actions').default

/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_USER,
  ALERT_TYPE_ERROR,
} = require('../../../lib/constants').default


class IEALoggedUserInviteLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      pageForm: props.pageForm,
      value: {
        username: props.auth.form.fields.username,
        email: props.auth.form.fields.email,
      }
    }

  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        username: nextProps.auth.form.fields.username,
        email: nextProps.auth.form.fields.email,
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
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }

    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    this.setState(
      {value}
    )
  }

  renderLeft() {
    return (
      <Telescope.components.EditUserForm
        form={this.props.auth.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {dispatch, userProfile} = this.props;

    const parseId = userProfile.id;
    const username = this.props.auth.form.fields.username;
    const email = this.props.auth.form.fields.email;

    this.props.actions.loginRequest()

    let errorMessage = null
    try {
      await Promise.race([
        dispatch(uploadLoggedUser({
          parseId,
          username, email
        })),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      this.props.actions.loginSuccess()
    }
  }


  renderLeftButton() {
    const {auth} = this.props;
    const isDisabled = (!auth.form.isValid || auth.form.isFetching);

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

                    <Telescope.components.EditUserProfilePhoto  {...this.props}/>

                    {this.renderLeft()}

                    {this.renderLeftButton()}

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

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

import * as authActions from '../../../reducers/auth/authActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  }
}

function select(store, ownProps) {
  return {
    auth: store.auth,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEALoggedUserInviteLayout));
