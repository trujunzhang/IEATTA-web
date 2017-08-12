import React, {Component} from 'react'

/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../lib/constants').default

const I18n = require('./Translate').default

const {timeout, signUpWithPassword, dismissPopModel} = require('../../../actions/index').default

class UserEmailSignUp extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {
      formState: 'COMMON',
      // Message
      errorMessage: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  async onButtonPress() {
    const {dispatch} = this.props

    let username = this.props.auth.form.fields.username
    let email = this.props.auth.form.fields.email
    let password = this.props.auth.form.fields.password

    this.setState({errorMessage: null})
    let errorMessage = null

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
        errorMessage = message
        // alert(message);
        // console.warn(e);
      }
    } finally {
      if (!!errorMessage) {
        this.setState({errorMessage: errorMessage})
      } else {
        this.props.dispatch(dismissPopModel())
        this.props.actions.signupSuccess()
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

          <p className="fb-start">
            <button
              onClick={(e) => {
                this.props.loginViaSocial('facebook')
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
    return (
      <form className="yform signup-form  city-hidden" id="signup-form" method="POST">
        <div className="js-password-meter-container">
          <ul className="inline-layout clearfix">
            <li>
              <label className="placeholder-sub">First Name</label>
              <input id="first_name"
                     name="first_name"
                     placeholder="First Name"
                     required="required" type="text" value=""
                     className="login_input_email"/>
            </li>

            <li>
              <label className="placeholder-sub">Last Name</label>
              <input id="last_name" name="last_name" placeholder="Last Name" required="required" type="text" value=""/>
            </li>

          </ul>
          <label className="placeholder-sub">Email</label>
          <input id="email" name="email" placeholder="Email" required="required" type="email" value=""/>

          <label className="placeholder-sub">Password</label>
          <input id="password" name="password" placeholder="Password" required="required" type="password" value=""
                 className="login_input_password"/>
        </div>

        <div className="captcha" id="signup-captcha"/>

        <p className="legal-copy legal-left">
          {'By signing up, you agree to IEATTA’s '}
          <a className="legal-link" href="https://www.yelp.com.sg/static?p=tos">
            {'Terms of Service'}</a>
          {' and '}
          <a className="legal-link" href="/tos/privacy_en_ie_20160131">Privacy Policy</a>{'.'}
        </p>
        <button id="signup-button" type="submit" value="Sign Up"
                className="ybtn ybtn--primary disable-on-submit submit signup-button">
          <span>Sign Up</span>
        </button>
      </form>
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
