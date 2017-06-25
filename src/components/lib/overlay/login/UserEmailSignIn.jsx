import Telescope from '../../index'
import React, {Component} from 'react'
/**
 *   LoginRender
 */
import LoginRender from './LoginRender'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

const {timeout, logInWithPassword, dismissPopModel} = require('../../../../actions').default

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
    var errorMessage = null

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
      <form className="yform" id="ajax-login" method="POST">
        <input type="hidden" name="csrftok" className="csrftok"
               value="b5c33ec0e829354e49049e83557f8c5fb0ce4a1fd9a060aa83f0cee58b0be72e"/>
        <label className="placeholder-sub">Email</label>
        <input id="email" name="email" placeholder="Email" required="required" type="email" value=""
               className="login_input_email"
               autocomplete="off"/>
        <label className="placeholder-sub">Password</label>
        <input id="password" name="password" placeholder="Password" required="required" type="password" value=""
               className="login_input_password"
               autocomplete="off"/>
        <div className="forgot-password">
          <a href="/forgot" className="forgot-link">Forgot password?</a>
        </div>
        <div className="captcha login-captcha"/>
        <p className="legal-copy legal-left">
          {'By logging in, you agree to Yelp’s '}<a className="legal-link" href="https://www.yelp.com.sg/static?p=tos">
          {'Terms of Service'}</a> and <a className="legal-link" href="/tos/privacy_en_ie_20160131">Privacy Policy</a>.
        </p>
        <button type="submit" value="submit" className="ybtn ybtn--primary submit ybtn-full"><span>Log In</span>
        </button>
      </form>
    )
  }


  renderxxx() {
    return (
      <span>
          {!!this.state.errorMessage ? <div className='errorMessage_2lxEG'>{this.state.errorMessage}</div> : null}
        <LoginRender
          formType={LOGIN}
          loginButtonText={I18n.t('Login.login')}
          onButtonPress={this.onButtonPress.bind(this)}
          onForgotPasswordPress={this.onForgotPasswordPress.bind(this)}
          footerLink={{
            left: {title: 'Sign In', tag: 'MAIN'},
            right: {title: 'Sign Up With Email', tag: 'REGISTER'}
          }}
          auth={this.props.auth}
          toggleEvent={this.props.toggleEvent}
        />
      </span>
    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

export default connect()(UserEmailSignIn)
