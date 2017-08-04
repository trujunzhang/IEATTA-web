import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsSingleHeader extends Component {

  renderBizPageHeaderLeft() {
    const {restaurant} = this.props;

    return (
      <div className="biz-page-header-left claim-status">

        <div className="u-space-t1">
          <h1 className="biz-page-title embossed-text-white shortenough">
            {restaurant.displayName || ''}
          </h1>
          <div className="u-nowrap claim-status_teaser js-claim-status-hover">
        <span
              id="icon_18X18"
              className="icon icon--18-checkmark-badged icon--size-18 icon--blue-dark claim-status_icon u-space-r1 claim-status_icon--claimed">
          <svg className="icon_svg">
            <path
              d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm3.96 6.28l-4.808 4.807-3.112-3.11a.8.8 0 1 1 1.13-1.132l1.982 1.98 3.677-3.677a.8.8 0 1 1 1.13 1.13z"/>
          </svg>
        </span>
          </div>

        </div>


        <div className="biz-main-info embossed-text-white">
          <div className="rating-info clearfix">
            <div className="biz-rating biz-rating-very-large clearfix">
              <Telescope.components.F8StarIcon
                rate={0}
                iconExtension="rating-very-large"
                iconType="large"
                iconWidth="84"
                iconHeight="303"
              />
              <span className="review-count rating-qualifier">
                130 reviews
              </span>

            </div>


            <div className="rating-details">
              <a className="chiclet-link chiclet-link--with-text show-tooltip js-rating-details">
            <span id="icon_14X14"
                  className="icon icon--14-histogram icon--size-14 icon--currentColor">
              <svg className="icon_svg">
                <path d="M9 11V5h2v6H9zM6 3h2v8H6V3zM3 7h2v4H3V7z"/>
              </svg>
            </span>
                Details
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
                    <a>Restaurant</a>
            </span>

            <a className="edit-category chiclet-link chiclet-link--with-text show-tooltip">
              <span id="icon_14X14"
                    className="icon icon--14-pencil icon--size-14 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
                </svg>
              </span>
              Edit
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
          <a className="ybtn ybtn--primary war-button">
            <span id="icon_24X24"
                  className="icon icon--24-star icon--size-24 icon--currentColor u-space-r-half icon--fallback-inverted">
              <svg className="icon_svg">
                <path
                  d="M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z"/>
              </svg>
            </span>
            Write a Review
          </a>
          <span className="ybtn-group clearfix">

            <a className="ybtn ybtn--small add-photo-button"
               href="/biz_user_photos/30jrTz8vh1xSXdtXMvt-mA/upload">
              <span id="icon_18X18"
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
              <span id="icon_18X18"
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
              <span id="icon_18X18"
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
        <Telescope.components.RestaurantsPageMap  {...this.props}/>
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

          <Telescope.components.RestaurantsSingleHeaderRightPhotos  {...this.props}/>
        </div>
      </div>
    )

  }
}

export default RestaurantsSingleHeader;
