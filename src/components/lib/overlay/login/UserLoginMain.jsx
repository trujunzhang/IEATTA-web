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
      <div className="column column-alpha column--responsive">
        <div className="signup-wrapper">
          <div className="signup-flow on-flow-start " data-component-bound="true">
            <div className="flow-start hidden" data-component-bound="true">
              <div className="sub-text-box">
                <small className="subtle-text">Already on Yelp? <a className="login-link" href="javascript:;">Log in</a></small>
              </div>
            </div>


            <div className="js-matches-biz-credentials-modal u-hidden">
              <div className="modal_head">
                <h2>Log in as a Business Owner?</h2>
              </div>
              <div className="modal_body">
                <p className="u-space-b3">
                  Your credentials match a business user account. Click below to log in at Yelp for Business Owners.
                </p>
                <a href="javascript:;" className="ybtn ybtn--primary js-go-to-biz-login">Log in to Yelp for Business
                  Owners</a>
                <a className="cancel-link js-modal-close" href="javascript:;">No thanks</a>
              </div>
            </div>

            <div className="login" data-component-bound="true">
              <div className="signup-form-container">
                <div className="header">
                  <h2>Log In to Yelp</h2>
                  <p className="subheading">New to Yelp? <a className="signup-link u-pseudo-link" href="/signup">Sign up</a></p>
                </div>
                <div className="js-biz-owner-alert alert u-hidden">
                  Want Yelp for Business Owners? <a href="https://biz.yelp.com/">Go there now »</a>
                </div>
                <ul className="ylist">
                  <li className="fb-login" data-component-bound="true">
                    <button type="submit" value="submit" className="ybtn ybtn--social ybtn--facebook ybtn-full"><span>
                      <div className="u-text-centered">
                        <span aria-hidden="true" className="icon icon--24-facebook icon--size-24 icon--currentColor">
    <svg className="icon_svg">
    </svg>
</span> Log In with Facebook</div></span></button>
                  </li>


                </ul>


              </div>
              <div className="sub-text-box">
                <small className="subtle-text">New to Yelp? <a className="signup-link" href="/signup">Sign up</a></small>
              </div>
            </div>

            <div className="forgot hidden" data-component-bound="true">
              <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <p>
                  Please enter your email address and we will send you an email about how to reset your password.
                </p>


                <form action="/forgot/ajax" className="yform" method="POST" name="forgot_form">
                  <input type="hidden" name="csrftok" className="csrftok"
                         value="93c20737a3dfe692924e8e2222bd82e1b5eb39e44780027b28e1b71b6c93a5d3"/>
                  <label className="placeholder-sub">Email</label>
                  <input name="email" placeholder="Email" required="required" type="email"/>
                  <button type="submit" value="submit" className="ybtn ybtn--primary submit ybtn-full">
                    <span>Reset Password</span></button>
                </form>
              </div>
              <div className="sub-text-box">
                <a className="login-link">
                  <small> Back to Login</small>
                </a>
              </div>
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
var {connect} = require('react-redux')

export default connect()(UserLoginMain)

