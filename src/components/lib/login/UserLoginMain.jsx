import Telescope from '../index'
import React, {Component} from 'react'


import {withRouter} from 'react-router'

const {showAlertMessage, dismissAlertMessage, timeout, logInWithFacebook} = require('../../../actions').default

const {
  getLoginFormType,
  ALERT_TYPE_ERROR,
} = require('../../filter/filterRoutes')

/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_LOG_OUT,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../lib/constants').default


class UserLoginMain extends Component {
  constructor(props) {
    super(props)

    const formType = getLoginFormType(props);
    this.state = this.initialState = {
      // formType: LOGIN_FORM_TYPE_LOGIN,
      formType: formType,
    }

    this.toggleFormState(formType)
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
    this.setState({formType: state})
  }

  async loginViaSocial(dispatch) {
    let errorMessage = null

    try {
      await Promise.race([
        dispatch(logInWithFacebook()),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.router.push({pathname: '/'})
      }
    }
  }

  render() {
    return (
      <div id="wrap" className="lang-en">

        <Telescope.components.LoginHeaderContent/>

        <div className="main-content-wrap main-content-wrap--full">
          <div id="super-container" className="content-container">

            <Telescope.components.F8AppAlertSection/>

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
    switch (this.state.formType) {
      case LOGIN_FORM_TYPE_LOGIN:
        return (
          <Telescope.components.UserEmailSignIn
            {...this.props}
            loginViaSocial={this.loginViaSocial.bind(this)}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case LOGIN_FORM_TYPE_REGISTER:
        return (
          <Telescope.components.UserEmailSignUp
            {...this.props}
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
      case LOGIN_FORM_TYPE_LOG_OUT:
        return (
          <Telescope.components.UserLogOut
            {...this.props}
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


