import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

import {getLoggedUserMenuLink} from '../../../../lib/link'
import Photos from '../../../../lib/photos'
import onClickOutside from 'react-onclickoutside'
import {FormattedMessage, FormattedRelative} from 'react-intl'

const {
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_EDIT_FORM
} = require('../../../../lib/constants').default


class HeaderRightUserPopOverlay extends Component {

  renderMenus() {
    const {currentUser} = this.props;
    return (
      <ul className="drop-menu-group--nav drop-menu-group">
        <li className="drop-down-menu-link">
          <Link className="js-analytics-click arrange arrange--middle arrange--6"
                onClick={this.props.onHandleClickOutsidePress}
                to={getLoggedUserMenuLink(currentUser)}>
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
          </Link>
        </li>

        <li className="drop-down-menu-link">
          <a className="js-analytics-click arrange arrange--middle arrange--6"
             href="/invite_friends">
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
                                </span>Invite Friends
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
          <Link className="js-analytics-click arrange arrange--middle arrange--6"
                onClick={this.props.onHandleClickOutsidePress}
                to={getLoggedUserMenuLink(currentUser, LOGGED_USER_EDIT_FORM)}>
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
          </Link>
        </li>

      </ul>
    )
  }

  renderUserPanel() {
    const {currentUser} = this.props;

    return (
      <div className="drop-menu-group responsive-visible-large-block">

        <div className="ypassport ypassport-notext media-block">

          <div className="media-avatar responsive-photo-box js-analytics-click">
            <div className="photo-box pb-60s" data-hovercard-id="XA2GwN6Ov4QwEuY2Pzwx4w">
              <Link
                to={getLoggedUserMenuLink(currentUser)}
                className="js-analytics-click">

                <Telescope.components.F8PlaceHolderImage
                  alt={currentUser.username}
                  className="photo-box-img"
                  width="60"
                  height="60"
                  placeholderSource={"/default/user_30_square.png"}
                  source={currentUser.defaultAvatorUrl}/>

              </Link>

            </div>


          </div>

          <div className="media-story">
            <ul className="user-passport-info">
              <li className="user-name">
                <Link className="user-display-name js-analytics-click"
                      to={getLoggedUserMenuLink(currentUser)}
                      id="dropdown_user-name">
                  {currentUser.username}
                </Link>
              </li>
              <li className="user-location responsive-hidden-small">

                <small>
                  <FormattedRelative value={currentUser.updatedAt}/>
                </small>
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

    )
  }

  render() {
    const {isOpen, currentUser} = this.props,
      currentClass = isOpen ? "block" : "none";

    return (
      <div id="topbar-account-wrap" className="drop-menu drop-menu-has-arrow" style={{display: currentClass}}>
        {this.renderUserPanel()}

        {this.renderMenus()}

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
            <Link to="logout">
              <button
                type="submit"
                className="u-pseudo-link js-analytics-click"
                id="header-log-out">
                {"Log Out"}
              </button>
            </Link>
          </div>

        </li>
      </ul>
    )
  }

  handleClickOutside = evt => {
    this.props.onHandleClickOutsidePress(evt)
  }
}

export default onClickOutside(HeaderRightUserPopOverlay)
