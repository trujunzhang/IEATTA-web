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

    this.state = this.initialState = {
      // formState: LOGIN_FORM_TYPE_LOGIN,
      formState: (pathname.indexOf('login') !== -1) ? LOGIN_FORM_TYPE_LOGIN : LOGIN_FORM_TYPE_REGISTER,
    }
  }

  switchFormState(e, state) {
    e.preventDefault()
    this.setState({formState: state})
  }

  async loginViaSocial(type = 'facebook') {
    let loginEvent = (type === 'twitter') ? logInWithTwitter : logInWithFacebook

    let errorMessage = null

    try {
      await Promise.race([
        this.props.dispatch(loginEvent()),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message
        // alert(message);
        // console.warn(e);
      }
    } finally {
      if (!!errorMessage) {
        this.setState({errorMessage: errorMessage})
      } else {
        this.props.router.push({pathname: '/'})
      }
    }
  }

  render() {
    return (
      <div id="wrap" className="lang-en">
        {this.renderTitle()}

        <div className="main-content-wrap main-content-wrap--full">
          <div id="super-container" className="content-container">
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

  renderTitle() {
    return (
      <div className="page-header">
        <div className="main-header main-content-wrap js-main-header webview-hidden main-header--simple">
          <div className="main-header_wrapper">
            <div className="content-container">
              <div className="arrange arrange--18 arrange--middle main-header_arrange">
                <div
                  className="arrange_unit arrange_unit--fill align-middle main-header--full_arrange_unit main-header_search-container">
                  <div className="main-header_logo js-analytics-click" id="logo" data-analytics-label="logo">
                    <a href="/">Yelp</a>
                  </div>
                </div>
              </div>
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
            actions={this.props.actions}
            auth={this.props.auth}
            loginViaSocial={this.loginViaSocial.bind(this)}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case LOGIN_FORM_TYPE_REGISTER:
        return (
          <Telescope.components.UserEmailSignUp
            actions={this.props.actions}
            auth={this.props.auth}
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
          <img src="https://s3-media4.fl.yelpcdn.com/assets/2/www/img/1e82406ff345/signup/signup_illustration.png"/>
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


function select(store) {
  return {
    auth: store.auth
  }
}

export default withRouter(connect(select)(UserLoginMain))


