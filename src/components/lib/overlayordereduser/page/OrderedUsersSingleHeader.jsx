import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedUsersSingleHeader extends Component {

  renderColumnOne() {
    const orderedUser = this.props.orderedUser || {};

    return (
      <div className="user-profile_info arrange_unit">
        <h1>{orderedUser.username || ''}</h1>
        <h3 className="user-location alternate">{orderedUser.username || ''}</h3>
        <div className="clearfix">

          <ul className="user-passport-stats">
            <li className="friend-count">
            <span
              id="icon_fill_24X24"
              className="icon icon--24-friends icon--size-24">
    <svg className="icon_svg">
        <g>
      <path
        d="M10.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946C1.618 12.48 2.586 11 4.018 11h4.964c1.432 0 2.4 1.48 1.842 2.817zM6.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      <path
        d="M21.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946c-.558-1.337.41-2.817 1.842-2.817h4.964c1.432 0 2.4 1.48 1.842 2.817zM17.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        opacity=".502"/>
    </g>
    </svg>
</span>
              <strong>13</strong>
              Friends
            </li>
            <li className="review-count">
            <span
              id="icon_fill_24X24"
              className="icon icon--24-review icon--size-24">
    <svg className="icon_svg">
    <path
      d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z"/>
    </svg>
</span>
              <strong>8</strong> Reviews
            </li>
            <li className="photo-count">
            <span
              id="icon_fill_24X24"
              className="icon icon--24-camera icon--size-24">
    <svg className="icon_svg">
    <path
      d="M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
</span>
              <strong>6</strong> Photos
            </li>
          </ul>

        </div>

      </div>

    )
  }

  renderColumnTwo() {
    return (
      <div className="user-profile_actions arrange_unit">
        <ul className="action-link-list">
          <li>

            <a className="arrange arrange--middle add-friend"
               href="/user_add_friend?return_url=/user_details?userid=JffflxAtMCm_GQf5OrImig&amp;userid=JffflxAtMCm_GQf5OrImig"
               rel="">
              <div className="action-link_icon arrange_unit">
            <span
              id="icon_18X18"
              className="icon icon--18-add-friend icon--size-18 icon--currentColor">
    <svg className="icon_svg">
 <g>
      <path
        d="M5.827 9.647l-2.013 4.127c-.448.922-1.18.915-1.628-.007L.173 9.65C-.275 8.73.178 8 1.18 8h3.64c1.002 0 1.455.725 1.007 1.647zM3 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      <path
        d="M12.827 9.647l-2.013 4.127c-.448.922-1.18.915-1.628-.007L7.173 9.65C6.725 8.73 7.178 8 8.18 8h3.64c1.002 0 1.455.725 1.007 1.647zM10 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        opacity=".502"/>
      <path d="M18 14h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2z"/>
    </g>
    </svg>
</span>
              </div>
              <div className="action-link_label arrange_unit arrange_unit--fill">
                Add friend
              </div>
            </a>

          </li>

          <li>


            <a className="arrange arrange--middle send-compliment"
               href="/thanx?previous_url=/user_details?userid=JffflxAtMCm_GQf5OrImig&amp;user_id=JffflxAtMCm_GQf5OrImig"
               rel="">
              <div className="action-link_icon arrange_unit">
            <span
              id="icon_18X18"
              className="icon icon--18-compliment icon--size-18 icon--currentColor">
    <svg className="icon_svg">
    <path
      d="M14.5 6.75a5.5 5.5 0 0 0-11 0 5.495 5.495 0 0 0 2.993 4.892L5.5 16.75l3.505-2 3.495 2-.993-5.108A5.495 5.495 0 0 0 14.5 6.75zm-5.5 4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
    </svg>
</span>
              </div>
              <div className="action-link_label arrange_unit arrange_unit--fill">
                Compliment
              </div>
            </a>

          </li>


          <li>


            <a className="arrange arrange--middle send-pm"
               href="/mail?action_send_form=1&amp;dst=JffflxAtMCm_GQf5OrImig&amp;return_url=/user_details?userid=JffflxAtMCm_GQf5OrImig"
               rel="Sahithi P.">
              <div className="action-link_icon arrange_unit">
            <span
              id="icon_18X18"
              className="icon icon--18-speech icon--size-18 icon--currentColor">
    <svg className="icon_svg">
    <path d="M2 4v6a2 2 0 0 0 2 2h1v3l4-3h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
    </svg>
</span>
              </div>
              <div className="action-link_label arrange_unit arrange_unit--fill">
                Send message
              </div>
            </a>

          </li>


          <li>


            <a className="arrange arrange--middle send-pm"
               href="/mail?action_send_form=1&amp;dst=JffflxAtMCm_GQf5OrImig&amp;return_url=/user_details?userid=JffflxAtMCm_GQf5OrImig"
               rel="Sahithi P.">
              <div className="action-link_icon arrange_unit">
            <span
              id="icon_18X18"
              className="icon icon--18-speech icon--size-18 icon--currentColor">
    <svg className="icon_svg">
    <path d="M2 4v6a2 2 0 0 0 2 2h1v3l4-3h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
    </svg>
</span>
              </div>
              <div className="action-link_label arrange_unit arrange_unit--fill">
                Send message
              </div>
            </a>

          </li>

          <li>


            <a className="arrange arrange--middle send-pm"
               href="/mail?action_send_form=1&amp;dst=JffflxAtMCm_GQf5OrImig&amp;return_url=/user_details?userid=JffflxAtMCm_GQf5OrImig"
               rel="Sahithi P.">
              <div className="action-link_icon arrange_unit">
            <span
              id="icon_18X18"
              className="icon icon--18-speech icon--size-18 icon--currentColor">
    <svg className="icon_svg">
    <path d="M2 4v6a2 2 0 0 0 2 2h1v3l4-3h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
    </svg>
</span>
              </div>
              <div className="action-link_label arrange_unit arrange_unit--fill">
                Send message
              </div>
            </a>

          </li>

        </ul>

      </div>

    )
  }

  render() {
    return (
      <div className="content-container" style={{height: '184px'}}>

        <div className="user-profile_content-wrapper arrange arrange--bottom arrange--30">
          <div className="user-profile_avatar-dummy arrange_unit"/>
          {this.renderColumnOne()}
          {this.renderColumnTwo()}
        </div>

        <Telescope.components.F8UserAvatorSection user={this.props.orderedUser}/>

      </div>
    )

  }
}

export default OrderedUsersSingleHeader;
