import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

const {pushModel} = require('../../../../actions/index').default

class HeaderRightLoginPanel extends Component {

  renderTop() {
    return (
      <ul className="header-nav">
        <li className="header-nav_item responsive-hidden-small js-analytics-click">
          <a className="ybtn ybtn--primary main-header_button header-nav_button--sign-up js-sign-up-button"
             href="/signup" id="header-sign-up">
            Sign Up
          </a>
        </li>
      </ul>
    )
  }

  renderTopRight() {
    return (
      <ul className="header-nav margin-left-8">
        <li className="header-nav_item">
          <a className="header-nav_link header-nav_link--log-in js-log-in-button" href="/login">
            Log In
          </a>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="arrange arrange--6">
          <div className="arrange_unit u-nowrap">
            <div className="main-header_account webview-hidden">
              {this.renderTop()}
              {this.renderTopRight()}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default HeaderRightLoginPanel
