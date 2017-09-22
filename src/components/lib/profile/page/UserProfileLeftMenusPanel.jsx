import Telescope from '../../../lib'
import React, {Component} from 'react'
import Users from '../../../../lib/users'

import {Link} from 'react-router'

import {getLoggedUserMenuLink} from '../../../../lib/link'

const {
  // 1.1 LOGGED user left menus.
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_MENU_REVIEWS,
  LOGGED_USER_MENU_BROWSER_PHOTOS,
  LOGGED_USER_MENU_EVENTS,
} = require('../../../../lib/constants').default


class UserProfileLeftMenusPanel extends Component {

  render() {
    const userProfileMenus = [
      LOGGED_USER_MENU_ABOUT,
      LOGGED_USER_MENU_REVIEWS,
      LOGGED_USER_MENU_BROWSER_PHOTOS,
      LOGGED_USER_MENU_EVENTS
    ]

    return (

      <div className="column column-alpha user-details_sidebar">
        <div className="ysection">

          <div className="titled-nav js-titled-nav">

            <div className="titled-nav_menus">

              <div className="titled-nav_menu">
                {this.renderLeftMenuTitle()}

                <ul className="titled-nav_items">
                  {userProfileMenus.map((type, index) => {
                    const row = Users.profileLeftMenus[type];
                    const isActive = Users.isLeftMenuActive(row, this.props);
                    const rowClass = "titled-nav_link" + (isActive ? " is-active" : "")
                    return (
                      <li key={index} className="titled-nav_item">
                        <Link className={rowClass}
                              to={getLoggedUserMenuLink(this.props.userProfile, type)}>
                          <div className="titled-nav_link-content arrange arrange--middle arrange--6">

                            <div className="arrange_unit">
                               <span id="icon_24X24"
                                     className={`icon icon--24-${row.tag} icon--size-24 titled-nav_icon`}>
                                  <svg className="icon_svg">
                                     <path d={row.svg}/>
                                   </svg>
                              </span>
                            </div>

                            <div className="arrange_unit arrange_unit--fill">
                              <span className="titled-nav_link-label">{row.title}</span>
                            </div>

                          </div>

                        </Link>

                      </li>

                    )
                  })}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>

    )
  }

  renderLeftMenuTitle() {
    return (
      <div className="titled-nav-header">
        <div className="arrange arrange--top">

          <div className="arrange_unit arrange_unit--fill">
            <div className="titled-nav-header_content">
              <h3>
                {`${this.props.userProfile.username}'s Profile`}
              </h3>
            </div>
          </div>

          <div className="arrange_unit">
          </div>

        </div>
      </div>
    )
  }
}

export default UserProfileLeftMenusPanel;
