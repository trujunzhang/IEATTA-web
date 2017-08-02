import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class PostsSingleHeader extends Component {

  renderBizPageHeaderLeft() {
    return (
      <div className="biz-page-header-left claim-status">

        <div className="u-space-t1">
          <h1 className="biz-page-title embossed-text-white shortenough">
            My Two Cents
          </h1>
          <div className="u-nowrap claim-status_teaser js-claim-status-hover">
        <span aria-hidden="true" id="icon_18X18"
              className="icon icon--18-checkmark-badged icon--size-18 icon--blue-dark claim-status_icon u-space-r1 claim-status_icon--claimed">
          <svg className="icon_svg">
            <path
              d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm3.96 6.28l-4.808 4.807-3.112-3.11a.8.8 0 1 1 1.13-1.132l1.982 1.98 3.677-3.677a.8.8 0 1 1 1.13 1.13z"/>
          </svg>
        </span>
            Claimed
          </div>

          <div className="u-hidden js-claim-status-hover-content">
            <p className="u-space-b0">
              This business has been claimed by the owner or a representative.
              <a className="js-biz-page-claim-link" href="https://www.yelp-support.com/article/000032392?l=en_SG"
                 target="_blank">Learn more</a>
            </p>
          </div>


        </div>


        <div className="biz-main-info embossed-text-white">
          <div className="rating-info clearfix">
            <div className="biz-rating biz-rating-very-large clearfix">


              <div className="i-stars i-stars--large-5 rating-very-large" title="5.0 star rating">
                <img className="offscreen" height="303"
                     src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png"
                     width="84" alt="5.0 star rating"/>
              </div>


              <span className="review-count rating-qualifier">
                130 reviews
              </span>

            </div>


            <div className="rating-details">
              <a className="chiclet-link chiclet-link--with-text show-tooltip js-rating-details">
            <span aria-hidden="true" id="icon_14X14"
                  className="icon icon--14-histogram icon--size-14 icon--currentColor">
              <svg className="icon_svg">
                <path d="M9 11V5h2v6H9zM6 3h2v8H6V3zM3 7h2v4H3V7z"/>
              </svg>
            </span>
                Details
                <span className="offscreen">, Opens a popup</span>

                <span className="tooltip-wrapper">
                <span className="tooltip">Rating details</span>
            </span>
              </a>
            </div>

          </div>

          <div className="price-category">
                    <span className="bullet-after">

                      <span className="business-attribute price-range">$$</span>
                    </span>
            <span className="category-str-list">
                    <a href="/c/la/southern">Southern</a>,
                    <a href="/c/la/seafood">Seafood</a>,
                    <a href="/c/la/soulfood">Soul Food</a>
            </span>

            <a className="edit-category chiclet-link chiclet-link--with-text show-tooltip"
               data-pop-uri="/edit_category_popup/30jrTz8vh1xSXdtXMvt-mA" data-ro-mode-action="edit categories"
               href="/biz_attribute?biz_id=30jrTz8vh1xSXdtXMvt-mA" data-component-bound="true">
              <span aria-hidden="true" id="icon_14X14"
                    className="icon icon--14-pencil icon--size-14 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
                </svg>
              </span>
              Edit
              <span className="offscreen">, Opens a popup</span>

              <span className="tooltip-wrapper">
                <span className="tooltip">Edit categories</span>
              </span>
            </a>

          </div>
        </div>

      </div>
    )
  }

  renderBizPageHeaderRight() {
    return (
      <div className="biz-page-header-right u-relative">
        <div className="biz-page-actions nowrap">
          <a className="ybtn ybtn--primary war-button"
             href="/writeareview/biz/30jrTz8vh1xSXdtXMvt-mA?return_url=%2Fbiz%2F30jrTz8vh1xSXdtXMvt-mA">
            <span aria-hidden="true" id="icon_24X24"
                  className="icon icon--24-star icon--size-24 icon--currentColor u-space-r-half icon--fallback-inverted">
              <svg className="icon_svg">
                <path
                  d="M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z"/>
              </svg>
            </span>
            Write a Review
          </a>
          <span className="ybtn-group clearfix">

            <a className="ybtn ybtn--small add-photo-button" href="/biz_user_photos/30jrTz8vh1xSXdtXMvt-mA/upload">
              <span aria-hidden="true" id="icon_18X18"
                    className="icon icon--18-add-photo icon--size-18 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M15 15H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2zM9 4.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zM11 10h-1v1a1 1 0 0 1-2 0v-1H7a1 1 0 0 1 0-2h1V7a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2z"/>
                </svg>
              </span>
              Add Photo
            </a>

            <a className="ybtn ybtn--small share-icon js-business-send-to-friend"
               data-pop-uri="/send_to_friend/business/30jrTz8vh1xSXdtXMvt-mA" data-ro-mode-action="share a business"
               href="/biz_share/30jrTz8vh1xSXdtXMvt-mA" data-component-bound="true">
              <span aria-hidden="true" id="icon_18X18"
                    className="icon icon--18-share icon--size-18 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M17.714 6.43L13 10.356v-3.03c-1 0-5.097 1.47-6.286 3.62.274-3.08 4.286-5.5 6.286-5.5V2.5l4.714 3.93zM3 4v10h11v-2.5l1-1V15H2V3h8.5l-1 1H3z"/>
                </svg>
              </span>
              <span className="js-popup-link-text">Share</span>
              <span className="offscreen">, Opens a popup</span>
            </a>

            <a className="ybtn ybtn--small bookmark-button js-action-bar-bookmark-button not-bookmarked"
               data-bookmark-button-position="action-bar" data-ro-mode-action="add a bookmark"
               data-signup-object="biz_id:30jrTz8vh1xSXdtXMvt-mA"
               href="/signup?return_url=%2Fbiz%2F30jrTz8vh1xSXdtXMvt-mA"
               data-component-bound="true">
              <span aria-hidden="true" id="icon_18X18"
                    className="icon icon--18-bookmark icon--size-18 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M14 2H4v14l5-4 5 4V2zm-3.13 7.957L8.978 8.794 7.148 10 7.5 7.926 6 6.458l2.074-.303L8.977 4l.948 2.155L12 6.458l-1.5 1.468.37 2.03z"/>
                </svg>
              </span>
            <span className="js-popup-link-text">Bookmark</span>
            <span className="offscreen">, Opens a popup</span>
            </a>

          </span>
        </div>

        <small className="u-absolute u-sticky-right">
          <span className="js-edit-bookmark-link u-pseudo-link" data-has-note="false">
          </span>

        </small>

      </div>
    )
  }


  renderBizPageSubheaderLeft() {
    return (
      <div className="mapbox-container">
        <Telescope.components.RestaurantsPageMap/>
      </div>
    )
  }

  renderBizPageSubheaderRight() {
    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-3-photo">

          <div className="top-shelf-grey"></div>

          <div className="showcase-footer-links"></div>

          <div className="lightbox-media-parent"
               data-ad-logging-csrf="aa8053dd89acca4aeeab2a925aa3697994b6f863dd0c34a39e0956ab2b0c42f1"
               data-ad-logging-uri="/ad_acknowledgment" data-ga-path="media_lightbox/servlet:biz_details/type:biz"
               data-logging-csrf="c846d6922ddea30ffe17e1fda509a302098c99138941cd4bd98b1f9da516ed5a"
               data-logging-uri="/biz_photos/30jrTz8vh1xSXdtXMvt-mA/log_views" data-media-count="124"
               data-media-url="/biz_photos/get_media_slice/30jrTz8vh1xSXdtXMvt-mA" data-starting-index="0">
            <div className="showcase-photos">


              <div className="js-photo photo photo-1" data-ga-label="left_photo" data-media-id="idHB5V5yEhk5Jmfc8d2luw"
                   data-media-index="1">
                <div className="showcase-photo-box">
                  <a href="/biz_photos/my-two-cents-los-angeles-3?select=idHB5V5yEhk5Jmfc8d2luw">

                    <img
                      alt="Photo of My Two Cents - Los Angeles, CA, United States. Chic, upscale - modern contemporary vibe. This &quot;ain't yo Mama's&quot; soul food kitchen.  This is 2017's take on Mississippi!"
                      className="photo-box-img" height="250"
                      src="https://s3-media3.fl.yelpcdn.com/bphoto/idHB5V5yEhk5Jmfc8d2luw/ls.jpg" width="250"/>

                  </a>

                </div>

                <div className="photo-box-overlay js-overlay">
                  <div className="media-block photo-box-overlay_caption">
                    <div className="media-avatar avatar">
                      <div className="photo-box pb-30s" data-hovercard-id="xCvTC67I0MLNbenXw4irmA">
                        <a href="/user_details?userid=63rsfkJ6ptD9jU_Rf96iBg" className="js-analytics-click"
                           data-analytics-label="user-photo">
                          <img alt="Kenny G." className="photo-box-img" height="30"
                               src="https://s3-media3.fl.yelpcdn.com/photo/dL-UJUcfUrcnjxDBIk-IoQ/30s.jpg" width="30"/>

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


              <div className="js-photo photo photo-2" data-ga-label="middle_photo"
                   data-media-id="GW7w6RYB9U1RyNEhCTZjwA" data-media-index="0">
                <div className="showcase-photo-box">
                  <a href="/biz_photos/my-two-cents-los-angeles-3?select=GW7w6RYB9U1RyNEhCTZjwA">

                    <img
                      alt="Photo of My Two Cents - Los Angeles, CA, United States. BBQ fried chicken with fries and sweet potato crumble"
                      className="photo-box-img" height="250"
                      src="https://s3-media3.fl.yelpcdn.com/bphoto/GW7w6RYB9U1RyNEhCTZjwA/ls.jpg" width="250"/>


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


              <div className="js-photo photo photo-3 photo-grid" data-ga-label="right_photo"
                   data-media-id="NWViHwgCl5AydMuovXBzJA" data-media-index="2">
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


                <a className="see-more show-all-overlay" href="/biz_photos/my-two-cents-los-angeles-3">
                  <span aria-hidden="true" id="icon_24X24"
                        className="icon icon--24-grid icon--size-24 icon--inverse icon--fallback-inverted show-all-overlay_icon">
                    <svg className="icon_svg">
                      <path d="M13 21v-8h8v8h-8zm0-18h8v8h-8V3zM3 13h8v8H3v-8zM3 3h8v8H3V3z"/>
                    </svg>
                  </span>
                  See all 124
                </a>

              </div>


            </div>
          </div>

        </div>

      </div>
    )
  }

  render() {
    return (
      <div className="content-container">
        <div className="biz-page-header clearfix">
          {this.renderBizPageHeaderLeft()}
          {this.renderBizPageHeaderRight()}
        </div>


        <div className="biz-page-subheader">
          {this.renderBizPageSubheaderLeft()}
          {this.renderBizPageSubheaderRight()}
        </div>
      </div>
    )

  }
}

export default PostsSingleHeader
