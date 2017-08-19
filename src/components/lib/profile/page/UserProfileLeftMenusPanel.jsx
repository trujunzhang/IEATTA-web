import Telescope from '../../../lib'
import React, {Component} from 'react'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'


const {
  isNewModelPage
} = require('../../../filter/filterRoutes')


class UserProfileLeftMenusPanel extends Component {

  render() {

    const userProfileMenus = [
      {
        tag: 'profile',
        title: "Profile Overview",
        svg: "M3 21.002h18a12.703 12.703 0 0 0-7.28-3.583v-1.46c1.156-.845 2.23-2.25 2.302-3.168 1.307-.634 1.58-2.213.65-2.562l-.02.03c.42-.587.677-1.335.677-2.192 0-1.11-.2-2.136-1.017-2.806-.567-1.34-1.746-2.266-3.116-2.266-.804 0-1.54.32-2.13.854a1.223 1.223 0 0 0-.787-.297c-.514 0-.96.345-1.2.852-1.294.478-2.236 1.936-2.236 3.663 0 .79.198 1.526.536 2.136-1 .394-.666 1.9.595 2.59.074.915 1.147 2.322 2.302 3.166v1.457A12.725 12.725 0 0 0 3 21z"
      },
      {
        tag: 'review',
        title: "Reviews",
        svg: "M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"
      },
      {
        tag: 'camera',
        title: "Browser Photos",
        svg: "M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      },
      {
        tag: 'event',
        title: "Events",
        svg: "M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-5.634 7.723L12 18l-1.366-2.277a3.5 3.5 0 1 1 2.732 0zM12 11.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
      },
    ]
    return (

      <div className="column column-alpha user-details_sidebar">
        <div className="ysection">

          <div className="titled-nav js-titled-nav">

            <div className="titled-nav_menus">

              <div className="titled-nav_menu">
                {this.renderLeftMenuTitle()}

                <ul className="titled-nav_items">
                  {userProfileMenus.map((row, index) => {
                    const isActive = index === 0;
                    const rowClass = "titled-nav_link" + (isActive ? " is-active" : "")
                    return (
                      <li className="titled-nav_item">
                        <a className={rowClass}>
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

                        </a>

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
