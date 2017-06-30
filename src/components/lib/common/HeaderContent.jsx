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
                   className="user-account clearfix drop-menu-origin hidden-non-responsive-block responsive-visible-small-block">

                <a className="ybtn ybtn--primary drop-menu-link user-account_button"
                   id="topbar-account-link">
                  <span aria-hidden="true" id="icon_14X14"
                        className="icon icon--14-triangle-down icon--size-14 icon--inverse icon--fallback-inverted u-triangle-direction-down user-account_button-arrow responsive-visible-large-inline-block">
                    <svg className="icon_svg">
                      <path d="M7 9L3.5 5h7L7 9z"/>
                    </svg>
                  </span>
                  <span aria-hidden="true" id="icon_24X24"
                        className="icon icon--24-hamburger icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_open">
                    <svg className="icon_svg">
                      <path d="M3 18v-2h18v2H3zm0-7h18v2H3v-2zm0-5h18v2H3V6z"/>
                    </svg>
                  </span>
                  <span aria-hidden="true" id="icon_24X24"
                        className="icon icon--24-close icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_close">
                    <svg className="icon_svg">
                      <path
                        d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"/>
                    </svg>
                  </span>
                </a>
                <div id="topbar-account-wrap" className="drop-menu drop-menu-has-arrow">
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
                    <span aria-hidden="true" id="icon_24X24"
                          className="icon icon--24-profile icon--size-24 u-space-r1">
                      <svg className="icon_svg">

                      </svg>
                    </span>About Me</strong>
                        <span className="arrange_unit arrange_unit--fill u-text-right">
                <span aria-hidden="true" id="icon_24X24"
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
                    <span aria-hidden="true" id="icon_24X24"
                          className="icon icon--24-talk icon--size-24 u-space-r1">
                      <svg className="icon_svg"></svg>
                    </span>Talk</strong>
                        <span className="arrange_unit arrange_unit--fill u-text-right">
                <span aria-hidden="true" id="icon_24X24"
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

  renderLeftSearchbar() {
    return (
      <div className="arrange_unit main-search_search-field-arrange">
        <div className="main-search_suggestions-field search-field-container find-decorator">
          <label className="main-search_pseudo-input main-search_pseudo-input--find pseudo-input">
            <span className="pseudo-input_text">Find</span>
            <span className="pseudo-input_field-holder"
            >
                <input disabled="" autoComplete="off" spellCheck="false" tabIndex="-1"
                       className="header_content_middle_input"/>
                  <input maxLength="64" id="find_desc" autoComplete="off" value=""
                         placeholder="pizza, pub, Mustafa" className="main-search_field pseudo-input_field"
                         tabIndex="1"/>
                    <input type="hidden" maxLength="64" name="find_desc" value=""/>
                        </span>
          </label>
          <div
            className="main-search_suggestions suggestions-list-container search-suggestions-list-container hidden"
          >
            <ul className="suggestions-list" role="listbox"></ul>
          </div>
        </div>

      </div>
    )
  }

  renderRightSearchbar() {
    return (
      <div
        className="arrange_unit main-search_near-field-arrange  main-search_search-field-arrange arrange_unit--stack-12">
        <div className="main-search_suggestions-field search-field-container near-decorator">
          <label className="main-search_pseudo-input main-search_pseudo-input--near pseudo-input">
            <span className="pseudo-input_text">Near</span>
            <span className="main-search_field-holder pseudo-input_field-holder">
                          <input maxLength="80" id="dropperText_Mast" autoComplete="off" value="Los Angeles, CA"
                                 placeholder="Address, Neighbourhood, or Postcode" data-query="Los Angeles, CA"
                                 className="main-search_field pseudo-input_field" tabIndex="2"/>
                          <input type="hidden" maxLength="80"
                                 name="find_loc" value="Los Angeles, CA"/>
                        </span>
          </label>
          <div
            className="main-search_suggestions suggestions-list-container location-suggestions-list-container hidden"
          >
            <ul className="suggestions-list" role="listbox"></ul>
          </div>
        </div>

      </div>
    )
  }

  renderMiddle() {
    return (
      <div
        className="arrange_unit arrange_unit--fill align-middle main-header--full_arrange_unit main-header_search-container">
        <div className="main-header_search responsive-hidden-medium-only">
          <form method="get" action="/search" id="header_find_form" className="main-search yform u-space-b0"
                role="search">
            <div className="arrange arrange--stack">
              <div className="arrange_unit arrange_unit--fill">
                <div className="arrange arrange--equal arrange--stack">
                  {this.renderLeftSearchbar()}
                  {/*{this.renderRightSearchbar()}*/}
                </div>
              </div>
              <div className="arrange_unit main-search_actions arrange_unit--stack-12">
                <div className="arrange arrange--wrap arrange--6">
                  <div
                    className="arrange_unit hidden-non-responsive-inline-block responsive-visible-small-inline-block main-search_action">

                    <a className="ybtn ybtn--primary main-header_button js-search-close main-search_close">
                      Cancel
                    </a>
                  </div>
                  <div className="arrange_unit main-search_action arrange_unit--stack-12">

                    <button className="ybtn ybtn--primary main-search_submit main-header_button"
                            id="header-search-submit" tabIndex="3" title="Search" type="submit" value="submit">
                            <span className="main-search_action-icon-wrap js-search-icon-wrap">
                                <span aria-hidden="true" id="icon_24X24"
                                      className="icon icon--24-search icon--size-24 icon--inverse icon--fallback-inverted">
                                  <svg className="icon_svg">
                                    <path
                                      d="M20.753 19.34l-4.295-4.297A7.46 7.46 0 0 0 18 10.5a7.5 7.5 0 1 0-7.5 7.5 7.46 7.46 0 0 0 4.543-1.542l4.296 4.295a1 1 0 1 0 1.412-1.414zM10.5 16A5.506 5.506 0 0 1 5 10.5C5 7.467 7.467 5 10.5 5S16 7.467 16 10.5 13.533 16 10.5 16z"/>
                                  </svg>
                                </span>
                                <span className="u-offscreen">Search</span>
                            </span>
                      <div className="circle-spinner js-circle-spinner hidden">
                        <div className="circle-spinner_segment container1">
                          <div className="circle1"></div>
                          <div className="circle2"></div>
                          <div className="circle3"></div>
                          <div className="circle4"></div>
                        </div>
                        <div className="circle-spinner_segment container2">
                          <div className="circle1"></div>
                          <div className="circle2"></div>
                          <div className="circle3"></div>
                          <div className="circle4"></div>
                        </div>
                        <div className="circle-spinner_segment container3">
                          <div className="circle1"></div>
                          <div className="circle2"></div>
                          <div className="circle3"></div>
                          <div className="circle4"></div>
                        </div>
                      </div>

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>

      </div>
    )
  }

  render() {
    return (
      <div className="main-header main-content-wrap js-main-header webview-hidden">
        <div className="main-header_wrapper">
          <div className="content-container">

            <div className="arrange arrange--18 arrange--middle main-header_arrange">
              {this.renderLeft()}
              {this.renderMiddle()}
              {this.renderRight()}
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
