import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

class OrderedUsersLeftPanel extends Component {

  renderTitle() {
    return (
      <div className="ysection">

        <div className="titled-nav js-titled-nav">

          <input id="titled-nav-909e7717-8ad1-4e9c-ac9c-011d99aeb9f2" className="titled-nav-dropdown_handler"
                 type="checkbox" role="presentation"/>

          <div className="titled-nav_menus">

            <div className="titled-nav_menu">
              <div className="titled-nav-header">
                <div className="arrange arrange--top">

                  <div className="arrange_unit arrange_unit--fill">
                    <div className="titled-nav-header_content">
                      <h3>Ordered Details</h3>
                    </div>
                  </div>

                  <div className="arrange_unit">
                  </div>

                </div>
              </div>

              <ul className="titled-nav_items">


                <li className="titled-nav_item">
                  <a className="titled-nav_link is-active" href="/user_details?userid=JffflxAtMCm_GQf5OrImig">
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


              </ul>
            </div>

            <div className="titled-nav-header responsive-hidden-large" role="presentation"></div>
          </div>
        </div>

      </div>

    )
  }

  render() {

    return (

      <div className="column column-alpha user-details_sidebar">
        {this.renderTitle()}

        <div className="ysection">
          <ul className="ylist">

            <li>

              <a
                href="/flag_content?flag_id=JffflxAtMCm_GQf5OrImig&amp;flag_type=user_profile&amp;previous_url=%2Fuser_details%3Fuserid%3DJffflxAtMCm_GQf5OrImig"
                className="report-user u-text-subtle">
        <span
          id="icon_24X24"
          className="icon icon--14-flag icon--size-14 u-space-r-half">
    <svg className="icon_svg">
    <path
      d="M5 7.69V1.31c2 1.076 4-1.075 6 0v6.38c-2-1.076-4 1.075-6 0zM3.5 13a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
    </svg>
</span>Report this profile
              </a>

            </li>

          </ul>
        </div>
      </div>

    )
  }
}

export default OrderedUsersLeftPanel;
