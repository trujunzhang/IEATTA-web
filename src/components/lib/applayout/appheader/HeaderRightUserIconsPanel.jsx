import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

const {pushModel} = require('../../../../actions').default

class HeaderRightUserIconsPanel extends Component {


  render() {
    return (
      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="main-header_notifications u-nowrap responsive-visible-large-block">
          <a href="/mail" className="header-nav_link js-header-messages js-analytics-click" id="messages-icon"
             data-analytics-label="messages_icon">
            <span aria-label="Messages" id="icon_24X24"
                  className="icon icon--24-speech icon--size-24 icon--white icon--fallback-inverted">
              <svg className="icon_svg">
                <path
                  d="M18 3H6C4.34 3 3 4.34 3 6v7c0 1.66 1.34 3 3 3h2v5l5-5h5c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3z"/>
              </svg>
            </span>
            <span className="ybadge ybadge--notification js-notification-badge u-hidden">0</span>

          </a>
          <a href="/user_details" className="header-nav_link show-tooltip js-analytics-click" id="notifications-icon"
             data-analytics-label="notifications_icon">
            <span aria-label="Notifications" id="icon_24X24"
                  className="icon icon--24-notification icon--size-24 icon--white icon--fallback-inverted">
              <svg className="icon_svg">
                <path
                  d="M20.984 17.177A1 1 0 0 1 20 18H4a1 1 0 0 1-.348-1.938c2.43-.9 3.74-4.605 3.74-7.634 0-1.75 1.07-3.253 2.608-3.97V4a2 2 0 0 1 4 0v.457c1.538.718 2.61 2.22 2.61 3.97 0 3.03 1.31 6.734 3.738 7.635a1 1 0 0 1 .636 1.115zM12 22a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z"/>
              </svg>
            </span>
            <span className="ybadge ybadge--notification js-notification-badge u-hidden">0</span>
          </a>
        </div>

      </div>

    )
  }

}

export default HeaderRightUserIconsPanel
