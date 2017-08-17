import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

class UserProfileLeftPanel extends Component {


  render() {
    return (

      <div className="column column-alpha user-details_sidebar">
        <div className="ysection">

          <div className="titled-nav js-titled-nav">

            <input id="titled-nav-909e7717-8ad1-4e9c-ac9c-011d99aeb9f2" className="titled-nav-dropdown_handler"
                   type="checkbox" role="presentation"/>

            <div className="titled-nav-dropdown hidden-non-responsive-block responsive-hidden-large">
              <label className="titled-nav-dropdown_trigger">
            <span className="arrange arrange--middle titled-nav-dropdown_content">
                <span className="arrange_unit arrange_unit--fill titled-nav-dropdown_shadow">
                    <span className="titled-nav-dropdown_faded-title">
                            <strong>Sahithi's Profile</strong>

                        Profile Overview

                    </span>
                </span>

                <span className="arrange_unit titled-nav-dropdown_icon">
                    <span
                      id="icon_24X24"
                      className="icon icon--24-chevron-down icon--size-24 titled-nav-dropdown_expand">
    <svg className="icon_svg">
    <path d="M18.364 9.525L16.95 8.11 12 13.06 7.05 8.11 5.636 9.526 12 15.89l6.364-6.365z"/>
    </svg>
</span>
                    <span
                      id="icon_24X24"
                      className="icon icon--24-chevron-up icon--size-24 titled-nav-dropdown_collapse">
    <svg className="icon_svg">
    <path d="M5.636 14.475L7.05 15.89 12 10.94l4.95 4.95 1.414-1.415L12 8.11l-6.364 6.365z"/>
    </svg>
</span>
                </span>
            </span>
              </label>
            </div>


            <div className="titled-nav_menus">


              <div className="titled-nav_menu">
                <div className="titled-nav-header">
                  <div className="arrange arrange--top">

                    <div className="arrange_unit arrange_unit--fill">
                      <div className="titled-nav-header_content">
                        <h3>Sahithi's Profile</h3>
                      </div>
                    </div>

                    <div className="arrange_unit">
                    </div>

                  </div>
                </div>

                <ul className="titled-nav_items">
                  {this.renderProfileView()}
                  {this.renderReviews()}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>

    )
  }

  renderProfileView() {
    return (
      <li className="titled-nav_item">
        <a className="titled-nav_link is-active">
          <div className="titled-nav_link-content arrange arrange--middle arrange--6">

            <div className="arrange_unit">
                <span
                  id="icon_24X24"
                  className="icon icon--24-profile icon--size-24 titled-nav_icon">
    <svg className="icon_svg">
    <path
      d="M3 21.002h18a12.703 12.703 0 0 0-7.28-3.583v-1.46c1.156-.845 2.23-2.25 2.302-3.168 1.307-.634 1.58-2.213.65-2.562l-.02.03c.42-.587.677-1.335.677-2.192 0-1.11-.2-2.136-1.017-2.806-.567-1.34-1.746-2.266-3.116-2.266-.804 0-1.54.32-2.13.854a1.223 1.223 0 0 0-.787-.297c-.514 0-.96.345-1.2.852-1.294.478-2.236 1.936-2.236 3.663 0 .79.198 1.526.536 2.136-1 .394-.666 1.9.595 2.59.074.915 1.147 2.322 2.302 3.166v1.457A12.725 12.725 0 0 0 3 21z"/>
    </svg>
</span>
            </div>

            <div className="arrange_unit arrange_unit--fill">
              <span className="titled-nav_link-label">Profile Overview</span>
            </div>


          </div>

        </a>

      </li>

    )
  }


  renderReviews() {
    return (
      <li className="titled-nav_item">
        <a className="titled-nav_link">
          <div className="titled-nav_link-content arrange arrange--middle arrange--6">

            <div className="arrange_unit">
                <span
                  id="icon_24X24"
                  className="icon icon--24-review icon--size-24 titled-nav_icon">
    <svg className="icon_svg">
    <path
      d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"/>
    </svg>
</span>
            </div>

            <div className="arrange_unit arrange_unit--fill">
              <span className="titled-nav_link-label">Reviews</span>
            </div>


          </div>

        </a>

      </li>
    )
  }
}

export default UserProfileLeftPanel;
