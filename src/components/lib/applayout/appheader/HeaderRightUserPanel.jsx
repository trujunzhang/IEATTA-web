import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

import onClickOutside from 'react-onclickoutside'

const {pushModel} = require('../../../../actions').default

class HeaderRightUserPanel extends Component {

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isOpen: false
    };
  }

  handleClickOutside = evt => {
    this.setState({isOpen: false})
  }

  renderTop() {
    const {isOpen} = this.state,
      extension = isOpen ? ' drop-menu-highlighted' : '',
      currentClass = `ybtn ybtn--primary drop-menu-link user-account_button ${extension}`

    return (
      <a className={currentClass} id="topbar-account-link" onClick={(e) => {
        this.setState({isOpen: !this.state.isOpen})
      }}>
                <span className="user-account_avatar responsive-visible-large-block">
                    <img alt="Trujun Z."
                         className="photo-box-img"
                         height="90"
                         src="https://s3-media4.fl.yelpcdn.com/photo/Hjd0EAdSH-gYJbRBF5nAnw/90s.jpg"
                         width="90"/>
                </span>
        <span id="icon_14X14"
              className="icon icon--14-triangle-down icon--size-14 icon--inverse icon--fallback-inverted u-triangle-direction-down user-account_button-arrow responsive-visible-large-inline-block">
                    <svg className="icon_svg">
                        <path d="M7 9L3.5 5h7L7 9z"/>
                    </svg>
                </span>
        <span id="icon_24X24"
              className="icon icon--24-hamburger icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_open">
                    <svg className="icon_svg">
                        <path d="M3 18v-2h18v2H3zm0-7h18v2H3v-2zm0-5h18v2H3V6z"/>
                    </svg>
                </span>
        <span id="icon_24X24"
              className="icon icon--24-close icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_close">
                    <svg className="icon_svg">
                        <path
                          d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"/>
                    </svg>
                </span>
      </a>
    )
  }

  renderBottom() {
    const {isOpen} = this.state,
      currentClass = isOpen ? "block" : "none";
    const {currentUser} = this.props;

    return (
      <div id="topbar-account-wrap" className="drop-menu drop-menu-has-arrow" style={{display: currentClass}}>
        <div className="drop-menu-arrow responsive-hidden-small"/>
        <div className="drop-menu-group responsive-visible-large-block">
          <div className="ypassport ypassport-notext media-block">
            <div className="media-avatar responsive-photo-box js-analytics-click">
              <div className="photo-box pb-60s" data-hovercard-id="XA2GwN6Ov4QwEuY2Pzwx4w">
                <a href="/user_details?userid=kIEHaO2vd6Lic4rwkMgH6Q"
                   className="js-analytics-click">
                  <img alt={currentClass.username}
                       className="photo-box-img"
                       height="60"
                       src="https://s3-media1.fl.yelpcdn.com/photo/Hjd0EAdSH-gYJbRBF5nAnw/60s.jpg"
                       width="60"
                  />

                </a>

              </div>


            </div>
            <div className="media-story">
              <ul className="user-passport-info">
                <li className="user-name">
                  <a className="user-display-name js-analytics-click"
                     href="/user_details?userid=kIEHaO2vd6Lic4rwkMgH6Q"
                     id="dropdown_user-name">
                    {currentUser.username}
                  </a>
                </li>
                <li className="user-location responsive-hidden-small">
                  <b>Manhattan, NY</b>
                </li>
              </ul>


              <ul className="user-passport-stats">
                <li className="friend-count">
                                    <span id="icon_fill_18X18"
                                          className="icon icon--18-friends icon--size-18">
                                        <svg className="icon_svg">
                                            <g>
                                                <path
                                                  d="M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                                                <path
                                                  d="M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                                                  opacity=".502"/>
                                            </g>
                                        </svg>
                                    </span>
                  <b>0</b>
                </li>
                <li className="review-count">
                                    <span id="icon_fill_18X18"
                                          className="icon icon--18-review icon--size-18">
                                        <svg className="icon_svg">
                                            <path
                                              d="M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z"/>
                                        </svg>
                                    </span>
                  <b>0</b>
                </li>

              </ul>

            </div>
          </div>

        </div>


        <ul className="drop-menu-group--nav drop-menu-group">
          <li className="drop-down-menu-link">
            <a className="js-analytics-click arrange arrange--middle arrange--6"
               href="/user_details?userid=kIEHaO2vd6Lic4rwkMgH6Q">
              <strong className="arrange_unit">
                                <span id="icon_24X24"
                                      className="icon icon--24-profile icon--size-24 u-space-r1">
                                    <svg className="icon_svg">
                                        <path
                                          d="M3 21.002h18a12.703 12.703 0 0 0-7.28-3.583v-1.46c1.156-.845 2.23-2.25 2.302-3.168 1.307-.634 1.58-2.213.65-2.562l-.02.03c.42-.587.677-1.335.677-2.192 0-1.11-.2-2.136-1.017-2.806-.567-1.34-1.746-2.266-3.116-2.266-.804 0-1.54.32-2.13.854a1.223 1.223 0 0 0-.787-.297c-.514 0-.96.345-1.2.852-1.294.478-2.236 1.936-2.236 3.663 0 .79.198 1.526.536 2.136-1 .394-.666 1.9.595 2.59.074.915 1.147 2.322 2.302 3.166v1.457A12.725 12.725 0 0 0 3 21z"/>
                                    </svg>
                                </span>
                {"About Me"}
              </strong>
              <span className="arrange_unit arrange_unit--fill u-text-right">
                                <span id="icon_24X24"
                                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                                    <svg className="icon_svg">
                                        <path
                                          d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                                    </svg>
                                </span>
                            </span>
            </a>
          </li>

          <li className="drop-down-menu-link">
            <a className="js-analytics-click arrange arrange--middle arrange--6"
               href="/find_friends">
              <strong className="arrange_unit">
                                <span id="icon_24X24"
                                      className="icon icon--24-friends icon--size-24 u-space-r1">
                                    <svg className="icon_svg">
                                        <g>
                                            <path
                                              d="M10.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946C1.618 12.48 2.586 11 4.018 11h4.964c1.432 0 2.4 1.48 1.842 2.817zM6.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                            <path
                                              d="M21.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946c-.558-1.337.41-2.817 1.842-2.817h4.964c1.432 0 2.4 1.48 1.842 2.817zM17.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                                              opacity=".502"/>
                                        </g>
                                    </svg>
                                </span>Find Friends
              </strong>
              <span className="arrange_unit arrange_unit--fill u-text-right">
                                <span id="icon_24X24"
                                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                                    <svg className="icon_svg">
                                        <path
                                          d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                                    </svg>
                                </span>
                            </span>
            </a>
          </li>


          <li className="drop-down-menu-link hidden-non-responsive-block responsive-visible-medium-block">
            <a className="js-analytics-click arrange arrange--middle arrange--6"
               href="/talk"
               data-analytics-label="">
              <strong className="arrange_unit">
                                <span id="icon_24X24"
                                      className="icon icon--24-talk icon--size-24 u-space-r1">
                                    <svg className="icon_svg">
                                        <path
                                          d="M20 17.326V21l-3-3c-2.715 0-5.006-1.504-5.746-3.566C14.047 13.42 16 11.144 16 8.5c0-.142-.015-.282-.026-.422A7.19 7.19 0 0 1 17 8c3.314 0 6 2.24 6 5 0 1.85-1.208 3.46-3 4.326zM8 14c-.08 0-.158-.007-.238-.01L4 17v-3.99c-1.812-.994-3-2.642-3-4.51C1 5.462 4.134 3 8 3s7 2.462 7 5.5S11.866 14 8 14z"/>
                                    </svg>
                                </span>Talk
              </strong>
              <span className="arrange_unit arrange_unit--fill u-text-right">
                                <span id="icon_24X24"
                                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                                    <svg className="icon_svg">
                                        <path
                                          d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                                    </svg>
                                </span>
                            </span>
            </a>
          </li>

          <li className="drop-down-menu-link">
            <a className="js-analytics-click arrange arrange--middle arrange--6"
               href="/user_details_cash_back?userid=kIEHaO2vd6Lic4rwkMgH6Q"
               data-analytics-label="dropdown_rewards-inactive">
              <strong className="arrange_unit">
                                <span id="icon_24X24"
                                      className="icon icon--24-cash-back icon--size-24 u-space-r1">
                                    <svg className="icon_svg">
                                        <path
                                          d="M13.632 11.153c1.49.283 2.765 1.012 2.765 2.752 0 1.683-1.296 2.78-3.402 2.978l.008.89H11.75v-.883c-2.547-.17-3.453-1.584-3.476-2.886h2.113c.03.616.502 1.146 1.41 1.267v-2.495l-.66-.133c-1.44-.29-2.668-1.13-2.668-2.75 0-1.713 1.443-2.66 3.294-2.823v-.91h1.26v.913c1.948.204 3.154 1.35 3.176 2.815h-2.05c-.016-.53-.42-1.083-1.163-1.21v2.34l.645.135zm-.645 4.11c.727-.057 1.252-.495 1.252-1.146 0-.56-.37-.927-1.12-1.125-.045-.006-.09-.02-.135-.028v2.3zm-1.19-6.592c-.66.074-1.148.46-1.148 1.057 0 .494.335.85.98 1.04.052.02.104.036.164.05V8.67zm9.13 4.12l-3.062-3.95h2.06c-1.27-2.854-4.193-4.862-7.603-4.862-4.57 0-8.29 3.6-8.29 8.024 0 4.426 3.72 8.026 8.29 8.026 3.566 0 6.604-2.195 7.772-5.26h2.148C21 18.936 17.026 22 12.322 22c-5.696 0-10.33-4.486-10.33-10S6.626 2 12.322 2c4.554 0 8.418 2.872 9.788 6.84h1.877l-3.06 3.95z"/>
                                    </svg>
                                </span>Cash Back
              </strong>
              <span className="arrange_unit">
                                <span className="ybadge ybadge-notification drop-down-menu-link_new-label">NEW</span>
                            </span>
              <span className="arrange_unit arrange_unit--fill u-text-right">
                                <span id="icon_24X24"
                                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                                    <svg className="icon_svg">
                                        <path
                                          d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                                    </svg>
                                </span>
                            </span>
            </a>
          </li>

          <li className="drop-down-menu-link">
            <a className="js-analytics-click arrange arrange--middle arrange--6" href="/profile"
               data-analytics-label="Zprofile">
              <strong className="arrange_unit">
                                <span id="icon_24X24"
                                      className="icon icon--24-settings icon--size-24 u-space-r1">
                                    <svg className="icon_svg">
                                        <path
                                          d="M21.872 10.48c.076.497.128 1.002.128 1.52s-.05 1.022-.127 1.518l-3.165.475c-.14.47-.323.92-.552 1.343l1.9 2.57c-.3.408-.62.8-.976 1.156l-.018.018a10.05 10.05 0 0 1-1.154.975l-2.57-1.9a7 7 0 0 1-1.344.553l-.475 3.165a9.94 9.94 0 0 1-1.506.127h-.034c-.51 0-1.01-.052-1.5-.127l-.475-3.165a7 7 0 0 1-1.343-.553l-2.57 1.9c-.408-.3-.798-.62-1.155-.975l-.018-.018a10.068 10.068 0 0 1-.978-1.155l1.9-2.57a6.97 6.97 0 0 1-.552-1.344l-3.164-.475C2.052 13.022 2 12.518 2 12s.052-1.023.128-1.52l3.164-.475a7 7 0 0 1 .553-1.342l-1.9-2.57a10.035 10.035 0 0 1 2.148-2.15l2.57 1.9a7.015 7.015 0 0 1 1.343-.55l.475-3.166C10.98 2.052 11.486 2 12 2s1.023.052 1.52.127l.474 3.165c.47.14.92.323 1.342.552l2.57-1.9a10.044 10.044 0 0 1 2.15 2.148l-1.9 2.57c.23.424.412.874.552 1.343l3.164.475zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>
                                    </svg>
                                </span>Account Settings
              </strong>
              <span className="arrange_unit arrange_unit--fill u-text-right">
                                <span id="icon_24X24"
                                      className="icon icon--24-chevron-right icon--size-24 hidden-non-responsive-inline-block responsive-visible-medium-inline-block">
                                    <svg className="icon_svg">
                                        <path
                                          d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                                    </svg>
                                </span>
                            </span>
            </a>
          </li>

        </ul>
        {this.renderLogOut()}
      </div>
    )
  }


  renderLogOut() {
    return (
      <ul className="drop-menu-group">
        <li className="drop-down-menu-link drop-down-menu-link--logout">

          <div
            id="logout-form"
            name="logout-form">
            <button
              onClick={this.props.onLogOutPress}
              type="submit"
              className="u-pseudo-link js-analytics-click"
              id="header-log-out">
              {"Log Out"}
            </button>
          </div>

        </li>
      </ul>
    )
  }

  render() {
    return (

      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="arrange arrange--6">
          <div
            className="arrange_unit u-nowrap hidden-non-responsive-table-cell responsive-visible-medium-only-table-cell">

            <a className="ybtn ybtn--primary main-header_button" href="/writeareview">
              Write a Review
            </a>
          </div>
          <div className="arrange_unit u-nowrap">
            <div className="main-header_account webview-hidden">

              <div id="topbar-account-item" className="user-account clearfix drop-menu-origin">
                {this.renderTop()}
                {this.renderBottom()}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default onClickOutside(HeaderRightUserPanel)
