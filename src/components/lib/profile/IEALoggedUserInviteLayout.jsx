import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'
import Users from '../../../lib/users'

import AppConstants from "../../../lib/appConstants";

import {
  getLoggedUserMenuLink
} from '../../../lib/link'

const {
  showAlertMessage,
  callCloudInviteEmailMethod,
  timeout
} = require('../../../actions').default

/**
 * The states were interested in
 */
const {
  CLOUD_INVITE_WITH_EMAILS,
  MENU_ITEM_ADD_OR_EDIT_USER,
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_ERROR,
  MENU_ITEM_LOGGED_USER_INVITE,
  EMAIL_SEND_CLOUD_MODEL,
} = require('../../../lib/constants').default


class IEALoggedUserInviteLayout extends Component {

  constructor(props, context) {
    super(props)


    this.props.actions.inviteState()
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {

  }

  async onButtonPress() {
    const {callCloudInviteEmailMethodAction, currentUser} = this.props;

    const homepage = AppConstants.config.ieattaWeb.serverURL;
    const username = currentUser.username;
    const fromEmail = currentUser.email;
    const userLink = (homepage + getLoggedUserMenuLink(currentUser))

    const toEmailsObject = Users.getInviteEmailObject(this.props)

    if (toEmailsObject.size === 0) {
      this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: 'At least, one email to invite!'}))
      return
    }

    const params = {
      username: username,
      userLink: userLink,
      homepage: homepage,
      fromEmail: fromEmail,
    }

    this.props.actions.loginRequest()

    let errorMessage = null
    try {
      await Promise.race([
        callCloudInviteEmailMethodAction(params, toEmailsObject),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      if (!!errorMessage) {
        this.props.actions.loginFailure()
      } else {
        this.props.actions.loginSuccess()

        this.props.dispatch(showAlertMessage({
          type: ALERT_TYPE_SUCCESS,
          text: `Sent ${toEmailsObject.size} emails successfully!`
        }))
      }
    }
  }


  renderInvitePanel() {
    const {auth} = this.props;
    const isDisabled = (!auth.form.isValid || auth.form.isFetching);


    return (
      <div className="column column-beta column--responsive">

        <div id="msf-step-container" className="find-friends inner-content clearfix">
          <span id="step-name" className="hidden">email_invite</span>
          <div className="section-header">
            <h2>Send IEATTA Invites To These Email Addresses:</h2>
          </div>

          <div className="yform email-invite-form" name="email-invite-form">

            <div className="content-field">
              <ul id="emails">

                <li>
                  <label>Email address</label>
                  <input id="email-invite-0"
                         type="email" name="contacts"
                         value={auth.form.fields.email}
                         onChange={(event) => {
                           this.props.actions.onAuthFormFieldChange('email', event.target.value)
                         }}
                         placeholder="e.g. bob@email.com"
                         className='first_invite_email_input'/>
                </li>
                <li>
                  <label className="u-offscreen">Email address</label>
                  <input type="email"
                         name="contacts"
                         value={auth.form.fields.email1}
                         onChange={(event) => {
                           this.props.actions.onAuthFormFieldChange('email1', event.target.value)
                         }}
                         id="email-invite-1"/>
                </li>
                <li>
                  <label className="u-offscreen">Email address</label>
                  <input
                    type="email"
                    name="contacts"
                    value={auth.form.fields.email2}
                    onChange={(event) => {
                      this.props.actions.onAuthFormFieldChange('email2', event.target.value)
                    }}
                    id="email-invite-2"/>
                </li>
              </ul>

            </div>
            <div className="content-field">
              <div className="action-buttons">
                <button type="buttom"
                        value="submit"
                        onClick={this.onButtonPress.bind(this)}
                        disabled={isDisabled}
                        className="ybtn ybtn--primary disable-on-submit">
                  <span>Send Email Invites</span>
                </button>

                {
                  auth.form.isFetching &&
                  <span className="throbber show-on-submit">Sending email invites...</span>
                }

              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container find-friends_container">

            <Telescope.components.F8AppAlertSection/>

            <div className="clearfix layout-block layout-n equalize-columns">

              {this.renderInvitePanel()}

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
    callCloudInviteEmailMethodAction: (params, toEmailsObject) => dispatch(callCloudInviteEmailMethod(params, toEmailsObject)),
  }
}

function select(store, ownProps) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user,
    auth: store.auth,
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEALoggedUserInviteLayout));
