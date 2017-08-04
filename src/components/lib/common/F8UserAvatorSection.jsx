import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {Link} from 'react-router'

class F8UserAvatorSection extends Component {

  renderLeftUserAvator() {
    const user = this.props.user || {};
    const sectionClass = "user-profile_avatar-section"
    // const sectionClass = ""

    return (
      <div className={sectionClass}>
        <div
          className="photo-slideshow photo-slideshow--full-width photo-slideshow--rounded js-photo-slideshow-user-details">
          <div className="photo-slideshow_slide is-active">
            <div>
              <a
                href="/user_photos?userid=JffflxAtMCm_GQf5OrImig"
                className="ordered-user-avator">
                <img alt={user.username || ""}
                     className="photo-box-img"
                     width="250"
                     height="250"
                     src={Photos.getListThumbnailUrl(user)}/>
              </a>

            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      sectionClass = "ordered-user-profile"
    } = this.props;

    return (
      <div className={sectionClass}>
        <div className="user-profile_container">
          {this.renderLeftUserAvator()}
        </div>
      </div>
    )
  }

}

export default F8UserAvatorSection;
