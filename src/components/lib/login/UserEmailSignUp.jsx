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
  ALERT_TYPE_ERROR,
} = require('../../../lib/constants').default


const I18n = require('react-redux-i18n').I18n;
const {showAlertMessage, dismissAlertMessage, timeout, signUpWithPassword} = require('../../../actions').default

class UserEmailSignUp extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}


    props.dispatch(dismissAlertMessage())
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  async onButtonPress() {
    const {dispatch} = this.props

    const username = this.props.auth.form.fields.username
    const email = this.props.auth.form.fields.email
    const password = this.props.auth.form.fields.password

    let errorMessage = null

    this.props.dispatch(dismissAlertMessage())
    this.props.actions.signupRequest()

    try {
      await Promise.race([
        dispatch(signUpWithPassword(username, email, password)),
        timeout(15000)
      ])
    } catch (e) {
      this.props.actions.signupFailure(e)
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.actions.signupSuccess()
        this.props.router.push({pathname: '/'})
      }
    }
  }

  render() {
    return (
      <div className="login">
        <div className="signup-form-container">

          <div className="header">
            <h2>Sign Up for IEATTA</h2>
            <p className="subheading">Connect with great local businesses</p>
          </div>

          {this.renderFacebookSection()}

          <p className="legal-copy">Don't worry, we never post without your permission.</p>

          <fieldset className="hr-line">
            <legend>OR</legend>
          </fieldset>

          {this.renderForm()}

        </div>

        <div className="sub-text-box">
          <small className="subtle-text">{'Already on IEATTA? '}
            <a onClick={(e) => {
              this.props.toggleEvent(e, LOGIN_FORM_TYPE_LOGIN)
            }}
               className="signup-link" href="/signup">{'Log in'}</a>
          </small>
        </div>
      </div>
    )
  }

  renderForm() {
    let buttonText = I18n.t('Register.register');
    const buttonDisabled = !this.props.auth.form.isValid || this.props.auth.form.isFetching;

    return (
      <div className="yform signup-form  city-hidden"
           id="signup-form">

        <div className="js-password-meter-container">

          <Telescope.components.LoginRender
            formType={REGISTER}
            loginButtonText={buttonText}
            auth={this.props.auth}
          />

        </div>

        <div className="captcha" id="signup-captcha"/>

        <p className="legal-copy legal-left">
          {'By signing up, you agree to IEATTA’s '}
          <a className="legal-link" href="https://www.yelp.com.sg/static?p=tos">
            {'Terms of Service'}
          </a>
          {' and '}
          <a className="legal-link" href="/tos/privacy_en_ie_20160131">Privacy Policy</a>
          {'.'}
        </p>
        <button id="signup-button"
                disabled={buttonDisabled}
                type="submit"
                value="Sign Up"
                onClick={this.onButtonPress.bind(this)}
                className="ybtn ybtn--primary disable-on-submit submit signup-button">
          <span>Sign Up</span>
        </button>
      </div>
    )
  }

  renderFacebookSection() {
    return (
      <p className="fb-start">
        <button
          onClick={(e) => {
            this.props.loginViaSocial(this.props.dispatch)
          }}
          type="submit" value="submit" className="ybtn ybtn--social ybtn--facebook ybtn-full">
              <span>
                <div className="u-text-centered">
              <span id="login_facebook_icon"
                    aria-hidden="true"
                    className="icon icon--24-facebook icon--size-24 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M13 21v-8h3.15l.412-3H13V7.547C13 6.62 13.65 6 14.98 6H17V3.126C16 3.086 15.493 3 14.323 3 11.88 3 10 4.49 10 7.23V10H7v3h3v8h3z"/>
                </svg>
              </span> Sign Up with Facebook</div>
              </span>
        </button>
      </p>

    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
const {connect} = require('react-redux')

export default connect()(UserEmailSignUp)
