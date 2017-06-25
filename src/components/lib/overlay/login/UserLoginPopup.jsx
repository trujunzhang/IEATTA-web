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
          <div className='tcomb_panel'>
            <Telescope.components.UserLoginMain
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case 'SIGNIN':
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignIn
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case 'REGISTER':
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignUp
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
    }
  }

  render() {
    const {formState, titles} = this.state,
      comp = this.props.comp || {showCloseIcon: false, title: null},
      showCloseIcon = comp.model || false,
      title = comp.model || 'Politicl'

    const formTitle = titles[formState],
      extTitle = (title)

    return (
      <Telescope.components.UserLoginLayout
        title={formTitle + ' ' + extTitle}
        showCloseIcon={showCloseIcon}
        formState={formState}
        child={this.renderLoginPanel()}/>
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
