import React, {Component} from 'react'

const {
  LOGIN_VIA_SOCIAL,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

import LoginRender from './LoginRender'

const {timeout, signUpWithPassword, dismissPopModel} = require('../../../../actions').default

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
    var errorMessage = null

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

  renderResult() {
    return (
      <div>
        <div className='alert alert-info' role='alert'>
          <span className='glyphicon glyphicon-exclamation-sign'/>
          <span className='sr-only'>Error:</span>
          {'You need to verify your email address before using Politicl. '}
          <a className='resend_verification_link'
             onClick={this.onResendVerificationLinkClick.bind(this)}>Resend verification link</a>.
        </div>
      </div>
    )
  }

  renderxxx() {
    let content = null
    if (this.state.formState === 'RESULT') {
      content = this.renderResult()
    } else {
      content = (
        <LoginRender
          formType={REGISTER}
          loginButtonText={I18n.t('Register.register')}
          onButtonPress={this.onButtonPress.bind(this)}
          footerLink={{
            left: {title: 'Continue with Facebook and Twitter', tag: 'MAIN'},
            right: {title: 'Login', tag: 'SIGNIN'}
          }}
          displayPasswordCheckbox
          auth={this.props.auth}
          toggleEvent={this.props.toggleEvent}
        />
      )
    }

    return (
      <div>
        <span>
          {!!this.state.errorMessage ? <div className='errorMessage_2lxEG'>{this.state.errorMessage}</div> : null}
          { content }
        </span>
      </div>
    )
  }

  render() {
    return (
      <div className="login" data-component-bound="true">
        <div className="signup-form-container">

          <div className="header">
            <h2>Sign Up for Yelp</h2>
            <p className="subheading">Connect with great local businesses</p>
          </div>

          <p className="fb-start" data-component-bound="true">
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
                  {/*<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#24x24_facebook"></use>*/}
                </svg>
              </span> Sign Up with Facebook</div>
              </span>
            </button>
          </p>

          <p className="legal-copy">Don't worry, we never post without your permission.</p>

          <fieldset className="hr-line">
            <legend align="center">OR</legend>
          </fieldset>

          {this.renderForm()}

        </div>
        <div className="sub-text-box">
          <small className="subtle-text">{'Already on Yelp? '}
            <a onClick={(e) => {
              this.props.toggleEvent(e, 'SIGNIN')
            }}
               className="signup-link" href="/signup">{'Log in'}</a>
          </small>
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <form className="yform signup-form  city-hidden" id="signup-form" method="POST" data-component-bound="true"
            _lpchecked="1">
        <input type="hidden" name="csrftok" className="csrftok"
               value="c8e6c7c922ac7654aae354e91cd235b9f49aa746b1477d58242544ae585f7a8c"/>
        <div className="js-password-meter-container" data-component-bound="true">
          <ul className="inline-layout clearfix">
            <li>
              <label className="placeholder-sub">First Name</label>
              <input id="first_name"
                     name="first_name"
                     placeholder="First Name"
                     required="required" type="text" value=""
                     className="login_input_email"
                     autocomplete="off"/>
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
                 className="login_input_password"
                 autocomplete="off"/>

          <input id="signup_source" name="signup_source" type="hidden" value="default"/>
        </div>

        <div className="captcha" id="signup-captcha"/>

        <p className="legal-copy legal-left">
          {'By signing up, you agree to Yelp’s '}<a className="legal-link" href="https://www.yelp.com.sg/static?p=tos">
          {'Terms of Service'}</a> and <a className="legal-link" href="/tos/privacy_en_ie_20160131">Privacy Policy</a>.
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
var {connect} = require('react-redux')

function select(store) {
  return {
    auth: store.auth
  }
}

export default connect(select)(UserEmailSignUp)
