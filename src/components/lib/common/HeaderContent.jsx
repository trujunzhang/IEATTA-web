import Telescope from '../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

const {pushModel} = require('../../../actions').default

class HeaderContent extends Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      showSearchForm: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    //if ((!!nextProps.router.location.query.topicId) || (!nextProps.router.location.query.query)) {
    //this.setState({showSearchForm: false})
    //}
  }

  renderLeft() {
    return (
      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="main-header_logo js-analytics-click" id="logo" data-analytics-label="logo">
          <a href="/">Yelp</a>
        </div>
      </div>
    )
  }

  renderRight() {
    return (
      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="arrange arrange--6">
          <div className="arrange_unit u-nowrap">
            <div className="main-header_account webview-hidden">
              <ul className="header-nav">
                <li className="header-nav_item responsive-hidden-small js-analytics-click"
                    data-analytics-label="signup">

                  <a className="ybtn ybtn--primary main-header_button header-nav_button--sign-up js-sign-up-button"
                     href="/signup" id="header-sign-up">
                    Sign Up
                  </a>
                </li>
                <li className="header-nav_item">
                  <a className="header-nav_link header-nav_link--log-in js-log-in-button"
                     href="https://www.yelp.com.sg/login?return_url=%2Fsearch%3Fcflt%3Drestaurants%26find_loc%3DLos%2BAngeles%252C%2BCA">
                    Log In
                  </a>
                </li>
              </ul>

              <div id="topbar-account-item"
                   className="user-account clearfix drop-menu-origin hidden-non-responsive-block responsive-visible-small-block"
                   data-component-bound="true">

                <a className="ybtn ybtn--primary drop-menu-link user-account_button"
                   id="topbar-account-link" data-component-bound="true">
                  <span aria-hidden="true" style="width: 14px; height: 14px;"
                        className="icon icon--14-triangle-down icon--size-14 icon--inverse icon--fallback-inverted u-triangle-direction-down user-account_button-arrow responsive-visible-large-inline-block">
                    <svg className="icon_svg"></svg>
                  </span>
                  <span aria-hidden="true" style="width: 24px; height: 24px;"
                        className="icon icon--24-hamburger icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_open">
                    <svg className="icon_svg"></svg>
                  </span>
                  <span aria-hidden="true" style="width: 24px; height: 24px;"
                        className="icon icon--24-close icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_close">
                    <svg className="icon_svg"></svg>
                  </span>
                </a>
                <div id="topbar-account-wrap" className="drop-menu drop-menu-has-arrow" data-component-bound="true">
                  <div className="drop-menu-arrow responsive-hidden-small"></div>

                  <div className="arrange arrange--6 arrange--equal drop-menu_auth-buttons">
                    <div className="arrange_unit">

                      <a className="ybtn ybtn-full"
                         href="https://www.yelp.com.sg/login?return_url=%2Fsearch%3Fcflt%3Drestaurants%26find_loc%3DLos%2BAngeles%252C%2BCA">
                        Login
                      </a>
                    </div>
                    <div className="arrange_unit">

                      <a className="ybtn ybtn--primary ybtn-full" href="/signup">
                        Sign Up
                      </a>
                    </div>
                  </div>

                  <ul className="drop-menu-group--nav drop-menu-group">
                    <li className="drop-down-menu-link">
                      <a className="js-analytics-click arrange arrange--middle arrange--6" href="/user_details"
                         data-analytics-label="">
                        <strong className="arrange_unit">
                    <span aria-hidden="true" style="width: 24px; height: 24px;"
                          className="icon icon--24-profile icon--size-24 u-space-r1">
                      <svg className="icon_svg"></svg>
                    </span>About Me</strong>
                        <span className="arrange_unit arrange_unit--fill u-text-right">
                <span aria-hidden="true" style="width: 24px; height: 24px;"
                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                  <svg className="icon_svg"></svg>
                </span>
                        </span>
                      </a>
                    </li>


                    <li className="drop-down-menu-link hidden-non-responsive-block responsive-visible-medium-block">
                      <a className="js-analytics-click arrange arrange--middle arrange--6" href="/talk"
                         data-analytics-label="">
                        <strong className="arrange_unit">
                    <span aria-hidden="true" style="width: 24px; height: 24px;"
                          className="icon icon--24-talk icon--size-24 u-space-r1">
                      <svg className="icon_svg"></svg>
                    </span>Talk</strong>
                        <span className="arrange_unit arrange_unit--fill u-text-right">
                <span aria-hidden="true" style="width: 24px; height: 24px;"
                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                  <svg className="icon_svg"></svg>
                </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="page-header">

        <div className="main-header main-content-wrap js-main-header webview-hidden">
          <div className="main-header_wrapper">
            <div className="content-container">

              <div className="arrange arrange--18 arrange--middle main-header_arrange">
                {this.renderLeft()}

                {this.renderRight()}
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
let {connect} = require('react-redux')

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(HeaderContent)
