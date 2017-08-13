import Telescope from '../index'
import React, {Component} from 'react'


import {withRouter} from 'react-router'

const {timeout, logInWithFacebook} = require('../../../actions/index').default


/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../lib/constants').default


class UserLoginMain extends Component {
  constructor(props) {
    super(props)

    const {location} = props,
      {pathname} = location

    const formState = (pathname.indexOf('login') !== -1) ? LOGIN_FORM_TYPE_LOGIN : LOGIN_FORM_TYPE_REGISTER;
    this.state = this.initialState = {
      // formState: LOGIN_FORM_TYPE_LOGIN,
      formState: formState,
      alertMessage: null
    }

    this.toggleFormState(formState)
  }

  toggleFormState(state) {
    switch (state) {
      case LOGIN_FORM_TYPE_REGISTER:
        this.props.actions.registerState()
        break;
      case LOGIN_FORM_TYPE_LOGIN:
        this.props.actions.loginState()
        break;
    }
  }

  switchFormState(e, state) {
    e.preventDefault()
    this.toggleFormState(state);
    this.setState({formState: state})
  }

  async loginViaSocial() {
    let errorMessage = null

    try {
      await Promise.race([
        this.props.dispatch(logInWithFacebook()),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        // errorMessage = message
        alert(message);
        // console.warn(e);
      }
    } finally {
      if (!!errorMessage) {
        this.updateAlertMessage(errorMessage)
      } else {
        this.props.router.push({pathname: '/'})
      }
    }
  }

  updateAlertMessage(message) {
    this.setState({alertMessage: message})
  }

  renderAlert() {

    return (
      <div id="alert-container">

        <div className="alert alert-error">
          <a
            onClick={() => {
              this.updateAlertMessage(null)
            }}
            className="js-alert-dismiss dismiss-link">×</a>
          <p className="alert-message">
            <ul>
              <li>
                {this.state.alertMessage}
              </li>
            </ul>
          </p>
        </div>
      </div>
    )
  }

  render() {
    const {alertMessage} = this.state;
    return (
      <div id="wrap" className="lang-en">

        <Telescope.components.LoginHeaderContent/>

        <div className="main-content-wrap main-content-wrap--full">
          <div id="super-container" className="content-container">

            {!!alertMessage ? this.renderAlert() : null}

            <div className="clearfix layout-block layout-h row--responsive">

              <div className="column column-alpha column--responsive">
                {this.renderLeftPanel()}
              </div>

              {this.renderRightPanel()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLeftPanel() {
    return (
      <div className="signup-wrapper">
        <div className="signup-flow on-flow-start ">

          {this.renderLeftLoginForm()}

        </div>
      </div>
    )
  }

  renderLeftLoginForm() {
    switch (this.state.formState) {
      case LOGIN_FORM_TYPE_LOGIN:
        return (
          <Telescope.components.UserEmailSignIn
            {...this.props}
            updateAlertMessage={this.updateAlertMessage.bind(this)}
            loginViaSocial={this.loginViaSocial.bind(this)}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case LOGIN_FORM_TYPE_REGISTER:
        return (
          <Telescope.components.UserEmailSignUp
            {...this.props}
            updateAlertMessage={this.updateAlertMessage.bind(this)}
            loginViaSocial={this.loginViaSocial.bind(this)}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case LOGIN_FORM_TYPE_FORGOTPASSWORD:
        return (
          <Telescope.components.UserEmailSignUp
            actions={this.props.actions}
            auth={this.props.auth}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
    }
  }

  renderRightPanel() {
    return (
      <div className="column column-beta responsive-visible-large-block">
        <div className="picture-container">
          <img src="/images/signup_illustration.png"/>
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
const {connect} = require('react-redux')

import * as authActions from '../../../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  }
}

function select(store) {
  return {
    auth: store.auth
  }
}

export default withRouter(connect(select, mapDispatchToProps)(UserLoginMain))


