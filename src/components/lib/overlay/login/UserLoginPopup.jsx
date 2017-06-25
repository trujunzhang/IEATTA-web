import Telescope from '../../index'
import React, {Component} from 'react'

class UserLoginPopup extends Component {
  constructor(props) {
    super(props)

    const comp = this.props.comp || {},
      model = comp.model

    var _formState = 'MAIN'
    if (model && Object.keys(model).indexOf('formState') !== -1) {
      _formState = model['formState']
    }

    this.state = this.initialState = {
      titles: {
        MAIN: 'Login to',
        SIGNIN: 'Login to',
        REGISTER: 'Sign up to'
      },
      formState: _formState,
    }
  }

  switchFormState(event, state) {
    event.preventDefault()
    this.setState({formState: state})
  }

  renderLoginPanel() {
    switch (this.state.formState) {
      case 'MAIN':
        return (
          <Telescope.components.UserLoginMain
            actions={this.props.actions}
            auth={this.props.auth}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case 'SIGNIN':
        return (
          <Telescope.components.UserEmailSignIn
            actions={this.props.actions}
            auth={this.props.auth}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
      case 'REGISTER':
        return (
          <Telescope.components.UserEmailSignUp
            actions={this.props.actions}
            auth={this.props.auth}
            toggleEvent={this.switchFormState.bind(this)}/>
        )
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
    return this.renderLoginPanel()
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
var {connect} = require('react-redux')

import * as authActions from '../../../../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function select(store) {
  return {
    auth: store.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(UserLoginPopup)
