import Telescope from '../index'
import React, {Component} from 'react'


/**
 * States of login display
 */
const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../lib/constants').default


const I18n = require('react-redux-i18n').I18n;

const {timeout, logInWithPassword, dismissPopModel} = require('../../../actions/index').default

class UserEmailSignIn extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {
      // Message
      errorMessage: null
    }
  }

  async onButtonPress() {
    const {dispatch} = this.props

    let username = this.props.auth.form.fields.username
    let password = this.props.auth.form.fields.password

    this.setState({errorMessage: null})
    let errorMessage = null

    this.props.actions.loginRequest()

    try {
      await Promise.race([
        dispatch(logInWithPassword(username, password)),
        timeout(15000),
      ])
    } catch (e) {
      this.props.actions.loginFailure(e)
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
        this.props.dispatch(dismissPopModel())
        this.props.actions.loginSuccess()
      }
    }
  }

  onForgotPasswordPress() {
  }

  render() {
    return (
      <div className="login">
        <div className="signup-form-container">
          <div className="header">
            <h2>Log In to IEATTA</h2>
            <p className="subheading">{'New to IEATTA? '}
              <a onClick={(e) => {
                this.props.toggleEvent(e, LOGIN_FORM_TYPE_REGISTER)
              }}
                 className="signup-link u-pseudo-link" href="/signup">{'Sign up'}
              </a>
            </p>
          </div>

          <ul className="ylist">
            <li className="fb-login">
              <button
                onClick={(e) => {
                  this.props.loginViaSocial('facebook')
                }}
                type="submit" value="submit" className="ybtn ybtn--social ybtn--facebook ybtn-full">
                <span>
                <div className="u-text-centered">
                <span id="login_facebook_icon" className="icon icon--24-facebook icon--size-24 icon--currentColor">
                  <svg className="icon_svg">
                    <path
                      d="M13 21v-8h3.15l.412-3H13V7.547C13 6.62 13.65 6 14.98 6H17V3.126C16 3.086 15.493 3 14.323 3 11.88 3 10 4.49 10 7.23V10H7v3h3v8h3z"/>
                  </svg>
                </span>
                Log In with Facebook</div>
              </span>
              </button>
            </li>
          </ul>

          <fieldset className="hr-line">
            <legend>OR</legend>
          </fieldset>

          {this.renderForm()}

        </div>
        <div className="sub-text-box">
          <small className="subtle-text">{'New to IEATTA? '}
            <a onClick={(e) => {
              this.props.toggleEvent(e, LOGIN_FORM_TYPE_REGISTER)
            }}
               className="signup-link" href="/signup">{'Sign up'}</a>
          </small>
        </div>
      </div>
    )
  }

  renderForm() {
    let buttonText = I18n.t('Login.login');

    return (
      <div className="yform"
           id="ajax-login">


        <Telescope.components.LoginRender
          formType={LOGIN}
          loginButtonText={buttonText}
          auth={this.props.auth}
        />


        {/*<label className="placeholder-sub">Email</label>*/}
        {/*<input*/}
        {/*id="email"*/}
        {/*name="email"*/}
        {/*placeholder="Email"*/}
        {/*required="required"*/}
        {/*type="email"*/}
        {/*value=""*/}
        {/*className="login_input_email"*/}
        {/*/>*/}

        {/*<label className="placeholder-sub">Password</label>*/}

        {/*<input*/}
        {/*id="password"*/}
        {/*name="password"*/}
        {/*placeholder="Password"*/}
        {/*required="required"*/}
        {/*type="password"*/}
        {/*value=""*/}
        {/*className="login_input_password"/>*/}

        {this.renderForgot()}

        <div className="captcha login-captcha"/>

        <p className="legal-copy legal-left">
          {'By logging in, you agree to IEATT’s '}
          <a className="legal-link" href="https://www.yelp.com.sg/static?p=tos">
            {'Terms of Service'}
          </a>
          {" and "}
          <a className="legal-link" href="/tos/privacy_en_ie_20160131">
            {'Privacy Policy'}
          </a>
          {"."}
        </p>

        <button type="submit" value="submit" className="ybtn ybtn--primary submit ybtn-full">
          <span>Log In</span>
        </button>

      </div>
    )
  }

  renderForgot() {
    return (
      <div className="forgot-password">
        <a href="/forgot" className="forgot-link">Forgot password?</a>
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

export default connect()(UserEmailSignIn)
