import Telescope from '../../index'
import React, {Component} from 'react'

const {timeout, logInWithFacebook, logInWithTwitter, dismissPopModel} = require('../../../../actions').default

class UserLoginMain extends Component {

  async loginViaSocial(type) {
    this.props.actions.loginRequest()

    let loginEvent = (type === 'twitter') ? logInWithTwitter : logInWithFacebook

    var errorMessage = null

    try {
      await Promise.race([
        this.props.dispatch(loginEvent()),
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

  renderLoginFooterLinks() {
    return (
      <div className='login_footer_links light' id='__w2_VNnJBb6_social_signup_links'>
        <a onClick={(e) => {
          this.props.toggleEvent(e, 'SIGNIN')
        }}>
          I Have a Politicl Account
        </a>
        <span className='bullet'> · </span>
        <a onClick={(e) => {
          this.props.toggleEvent(e, 'REGISTER')
        }}>
          Sign Up With Email
        </a>
      </div>
    )
  }

  renderLoginForm() {
    return (
      <div className='buttonGroup_1mB5C'>
        <a rel='login-with-twitter'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf'
           onClick={this.loginViaSocial.bind(this, 'twitter')}>
          <div className='buttonContainer_wTYxi'>Log in with twitter</div>
        </a>
        <a rel='login-with-facebook'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf'
           onClick={this.loginViaSocial.bind(this, 'facebook')}>
          <div className='buttonContainer_wTYxi'>Log in with facebook</div>
        </a>
      </div>
    )
  }

  renderxxx() {
    return (
      <div id='login_main_section'>
        <span>
          {this.renderLoginForm()}
          <p className='login-fullscreen--login-info'>
            {'We\'ll never post to Twitter or Facebook without your permission.'}
          </p>
          {this.renderLoginFooterLinks()}
        </span>
      </div>
    )
  }


  render() {
    return (
      <div className="signup-wrapper">
        <div className="signup-flow on-flow-start " data-component-bound="true">

          {this.renderMainRows()}

        </div>
      </div>
    )
  }

  renderMainRows() {
    return (
      <div className="login" data-component-bound="true">
        <div className="signup-form-container">
          <div className="header">
            <h2>Log In to Yelp</h2>
            <p className="subheading">New to Yelp? <a className="signup-link u-pseudo-link" href="/signup">Sign up</a>
            </p>
          </div>

          <div className="js-biz-owner-alert alert u-hidden">
            Want Yelp for Business Owners? <a href="https://biz.yelp.com/">Go there now »</a>
          </div>

          <ul className="ylist">
            <li className="fb-login" data-component-bound="true">
              <button type="submit" value="submit" className="ybtn ybtn--social ybtn--facebook ybtn-full"><span><div
                className="u-text-centered">
                <span id="login_facebook_icon"
                      className="icon icon--24-facebook icon--size-24 icon--currentColor">
                  <svg className="icon_svg"></svg>
                </span>
                Log In with Facebook</div>
              </span>
              </button>
            </li>
          </ul>

          <fieldset className="hr-line">
            <legend align="center">OR</legend>
          </fieldset>

          {/*{this.renderLoginForm()}*/}
          {this.renderSignUp()}

        </div>
        <div className="sub-text-box">
          <small className="subtle-text">New to Yelp? <a className="signup-link" href="/signup">Sign up</a></small>
        </div>
      </div>
    )
  }

  renderLoginForm() {
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

  renderSignUp() {
    return (

    )
  }


}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

export default connect()(UserLoginMain)

