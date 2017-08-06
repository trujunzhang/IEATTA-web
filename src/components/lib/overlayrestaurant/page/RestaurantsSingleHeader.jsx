import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsSingleHeader extends Component {

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
        <Telescope.components.F8RestaurantMapSection  {...this.props} showEditButton={true}/>
      </div>
    )
  }

  render() {
    return (
      <div className="content-container">
        <div className="biz-page-header clearfix">

          <Telescope.components.RestaurantsSingleHeaderTopLeftPanel  {...this.props}/>

          {this.renderBizPageHeaderRight()}
        </div>

        <div className="biz-page-subheader">

          {this.renderBizPageSubheaderLeft()}

          <Telescope.components.F8SingleHeaderRightPhotos photos={this.props.restaurant.photos} photoType="restaurant"/>
        </div>
      </div>
    )

  }
}

export default RestaurantsSingleHeader;
