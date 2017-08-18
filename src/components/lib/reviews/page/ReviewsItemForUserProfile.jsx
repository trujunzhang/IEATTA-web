import Telescope from '../../index'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'
import Reviews from '../../../../lib/reviews'

import {Link} from 'react-router'

class ReviewsItemForUserProfile extends Component {

  renderBreadCrumbs(breadcrumbs) {
    return (
      <ul className="breadcrumbs">
        <li>
          <a>
            Trujun Z.
          </a>

        </li>
        <li>
                                <span
                                  id="icon_24X24"
                                  className="icon icon--24-chevron-right icon--size-24 icon--neutral-gray u-space-r-half">
    <svg className="icon_svg">
    <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
    </svg>
</span>Profile photos


        </li>
      </ul>
    )
  }

  renderTop() {
    const {review} = this.props;
    const {reviewType, event, restaurant, user, recipe} = review;
    const reviewObject = Reviews.getReviewObjectByType(review);

    return (
      <div className="review-topbar">

        <div className="media-block media-block--12 biz-listing-medium">

          <div className="media-avatar">
            <div className="photo-box pb-60s" data-hovercard-id="YCUg5LPpRgun-AcOFMMS_w">
              <a
                className="js-analytics-click"
                data-analytics-label="user-photo">
                <Telescope.components.F8PlaceHolderImage
                  alt={reviewObject.title}
                  className="photo-box-img"
                  width="60"
                  height="60"
                  placeholderSource={"/default/user_30_square.png"}
                  source={reviewObject.avatorUrl}
                />
              </a>
            </div>

          </div>

          <div className="media-story">
            <ul className="user-passport-info">
              <li className="user-name">
                <Link className="user-display-name js-analytics-click"
                      to={reviewObject.detailUrl}
                      id="dropdown_user-name">
                  {reviewObject.title}
                </Link>
              </li>

              <li className="user-location responsive-hidden-small">
                <b>{review.reviewType}</b>
              </li>

              <li className="user-location responsive-hidden-small">
                <b>{reviewObject.thirdRow}</b>
              </li>

            </ul>

          </div>


        </div>
      </div>


    )
  }

  renderStory() {
    const {review} = this.props,
      {rate} = review;

    const htmlBody = Reviews.getHtmlBody(review);

    return (
      <div className="review-content">

        <div className="review-content">

          <div className="biz-rating biz-rating-large clearfix">
            <div>
              <Telescope.components.F8StarIcon
                rate={rate}
                iconType="regular"
                iconWidth="84"
                iconHeight="303"
              />
            </div>
            <span className="rating-qualifier">
              {Reviews.toDateString(review.updatedAt)}
            </span>
          </div>

          <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
        </div>
        <Telescope.components.ReviewsItemButtonsPanel/>

      </div>
    )
  }

  render() {
    return (
      <li>
        <div className="review">

          {this.renderTop()}
          {this.renderStory()}

        </div>

      </li>

    )
  }
}

export default ReviewsItemForUserProfile;
