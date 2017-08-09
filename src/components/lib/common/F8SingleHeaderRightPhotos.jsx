import Telescope from '../index'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

class F8SingleHeaderRightPhotos extends Component {

  renderSeeAll() {
    const {photos, photoType} = this.props;
    const photoLength = photos.length;
    return (

      <div className="js-photo photo photo-3 photo-grid">

        <div className="showcase-photo-box">
          <a href="/biz_photos/my-two-cents-los-angeles-3?select=NWViHwgCl5AydMuovXBzJA">

            <img alt="Photo of My Two Cents - Los Angeles, CA, United States. Desserts"
                 className="photo-box-img" height="250"
                 src="https://s3-media2.fl.yelpcdn.com/bphoto/NWViHwgCl5AydMuovXBzJA/ls.jpg" width="250"/>
          </a>

          <a href="/biz_photos/my-two-cents-los-angeles-3?select=jJImRSGh-hJYgh6eLSVsLQ">
            <img alt="Photo of My Two Cents - Los Angeles, CA, United States. Restaurant"
                 className="photo-box-img" height="180"
                 src="https://s3-media2.fl.yelpcdn.com/bphoto/jJImRSGh-hJYgh6eLSVsLQ/180s.jpg" width="180"/>
          </a>

          <a href="/biz_photos/my-two-cents-los-angeles-3?select=WOxuQ-_w8VbKYEL3xodgmQ">

            <img alt="Photo of My Two Cents - Los Angeles, CA, United States" className="photo-box-img"
                 height="180" src="https://s3-media4.fl.yelpcdn.com/bphoto/WOxuQ-_w8VbKYEL3xodgmQ/180s.jpg"
                 width="180"/>
          </a>

          <a href="/biz_photos/my-two-cents-los-angeles-3?select=emzHlCruWgErM3anYMd1pQ">
            <img alt="Photo of My Two Cents - Los Angeles, CA, United States. Grilled BBQ Chicken"
                 className="photo-box-img" height="180"
                 src="https://s3-media3.fl.yelpcdn.com/bphoto/emzHlCruWgErM3anYMd1pQ/180s.jpg" width="180"/>
          </a>

        </div>

        {this.renderSeeAllButton()}

      </div>

    )
  }

  renderSeeAllButton() {
    const {photos, photoType} = this.props;
    const photoLength = photos.length;

    debugger

    return (
      <a className="see-more show-all-overlay">
                    <span id="icon_24X24"
                          style={{display: 'block'}}
                          className="icon icon--24-grid icon--size-24 icon--inverse icon--fallback-inverted show-all-overlay_icon">
                    <svg className="icon_svg">
                      <path d="M13 21v-8h8v8h-8zm0-18h8v8h-8V3zM3 13h8v8H3v-8zM3 3h8v8H3V3z"/>
                    </svg>
                  </span>
        {"See all " + photoLength}
      </a>

    )
  }

  renderFirstThumbnail() {
    const {photos, photoType} = this.props;
    const thumbnail01 = photos[0].thumbnail._url;
    return (
      <div className="js-photo photo photo-1">
        <div className="showcase-photo-box">
          <a href="/biz_photos/my-two-cents-los-angeles-3?select=idHB5V5yEhk5Jmfc8d2luw">
            <img
              alt="Photo of My Two Cents - Los Angeles, CA, United States. Chic, upscale - modern contemporary vibe. This &quot;ain't yo Mama's&quot; soul food kitchen.  This is 2017's take on Mississippi!"
              className="photo-box-img"
              height="250"
              src={thumbnail01}
              width="250"/>
          </a>

        </div>

        <div className="photo-box-overlay js-overlay">
          <div className="media-block photo-box-overlay_caption">
            <div className="media-avatar avatar">
              <div className="photo-box pb-30s" data-hovercard-id="xCvTC67I0MLNbenXw4irmA">
                <a href="/user_details?userid=63rsfkJ6ptD9jU_Rf96iBg" className="js-analytics-click"
                   data-analytics-label="user-photo">
                  <img alt="Kenny G."
                       className="photo-box-img"
                       height="30"
                       src="https://s3-media3.fl.yelpcdn.com/photo/dL-UJUcfUrcnjxDBIk-IoQ/30s.jpg"
                       width="30"/>
                </a>

              </div>


            </div>

            <div className="media-story">
              <a className="photo-desc"
                 href="/biz_photos/my-two-cents-los-angeles-3?select=idHB5V5yEhk5Jmfc8d2luw">
                Chic, upscale - modern contemporary…
              </a>
              <span className="author">
                        by
                        <a className="user-display-name js-analytics-click"
                           href="/user_details?userid=63rsfkJ6ptD9jU_Rf96iBg"
                           data-hovercard-id="xCvTC67I0MLNbenXw4irmA" data-analytics-label="about_me"
                           id="dropdown_user-name">Kenny G.</a>
                      </span>
            </div>

          </div>
        </div>

      </div>

    )
  }

  renderSecondThumbnail() {
    const {photos, photoType} = this.props;
    const thumbnail02 = photos[1].thumbnail._url;
    return (
      <div className="js-photo photo photo-2">
        <div className="showcase-photo-box">
          <a href="/biz_photos/my-two-cents-los-angeles-3?select=GW7w6RYB9U1RyNEhCTZjwA">

            <img
              alt="Photo of My Two Cents - Los Angeles, CA, United States. BBQ fried chicken with fries and sweet potato crumble"
              className="photo-box-img"
              height="250"
              src={thumbnail02}
              width="250"/>

          </a>

        </div>


        <div className="photo-box-overlay js-overlay">
          <div className="media-block photo-box-overlay_caption">
            <div className="media-avatar avatar">
              <div className="photo-box pb-30s" data-hovercard-id="2-YW12W31RtcIN7IVbhAuA">
                <a href="/user_details?userid=RiyfftYb6iuh5S1lPrp7sQ" className="js-analytics-click"
                   data-analytics-label="user-photo">
                  <img alt="Joshua H." className="photo-box-img" height="30"
                       src="https://s3-media4.fl.yelpcdn.com/photo/tUK96wJVCgJWfKa94BXaiQ/30s.jpg" width="30"/>

                </a>

              </div>


            </div>

            <div className="media-story">
              <a className="photo-desc"
                 href="/biz_photos/my-two-cents-los-angeles-3?select=GW7w6RYB9U1RyNEhCTZjwA">
                BBQ fried chicken with fries and sweet…
              </a>
              <span className="author">
                        by
                        <a className="user-display-name js-analytics-click"
                           href="/user_details?userid=RiyfftYb6iuh5S1lPrp7sQ"
                           data-hovercard-id="2-YW12W31RtcIN7IVbhAuA" data-analytics-label="about_me"
                           id="dropdown_user-name">Joshua H.</a>
                      </span>
            </div>

          </div>
        </div>

      </div>

    )
  }


  render() {
    const {photos, photoType} = this.props;
    const photoLength = photos.length;
    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-3-photo">

          <div className="lightbox-media-parent">

            <div className="showcase-photos showcase-photos-z-index">

              {photoLength > 0 ? this.renderFirstThumbnail() : null}
              {photoLength > 1 ? this.renderSecondThumbnail() : null}

              {photoLength > 2 ? this.renderSeeAll() : null}

            </div>
          </div>

        </div>

      </div>
    )
  }

}

export default F8SingleHeaderRightPhotos;
