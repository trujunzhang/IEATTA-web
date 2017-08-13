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
const {logOut, showAlertMessage, dismissAlertMessage, timeout, logInWithPassword} = require('../../../actions').default

class UserLogOut extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}
  }

  onButtonPress() {
    this.props.dispatch(logOut())
    this.props.router.push({pathname: '/'})
  }


  render() {
    return (
      <div className="login">
        <div className="signup-form-container">
          <div className="header">
            <h2>Log out to IEATTA</h2>
          </div>
        </div>
        {this.renderForm()}
      </div>
    )
  }

  renderForm() {

    return (
      <div className="yform" id="ajax-login">

        <button type="submit"
                onClick={this.onButtonPress.bind(this)}
                value="submit" className="ybtn ybtn--primary submit ybtn-full">
          <span>Log Out</span>
        </button>

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

export default connect()(UserLogOut)
