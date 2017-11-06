import Telescope from '../../index'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'
import Reviews from '../../../../lib/reviews'

import {Link} from 'react-router'

import {
  getEditReviewLink,
} from '../../../../lib/link'

class ReviewsItemForUserProfile extends Component {
  renderTop() {
    const {review} = this.props;
    const {reviewType} = review;
    const reviewObject = Reviews.getReviewObjectByType(review);

    return (
      <div className="review-topbar">

        <div className="media-block media-block--12 biz-listing-medium">

          <Telescope.components.F8ImagesSlideShowView
            altValue={reviewObject.displayName}
            forObject={reviewObject}
            objectSchemaName={reviewObject.objectSchemaName}
            {...this.props}/>


          <div className="media-story">
            <ul className="user-passport-info">
              <li className="user-name">
                <Link className="user-display-name title-font-weight-bold"
                      to={reviewObject.detailUrl}
                      id="dropdown_user-name">
                  {reviewObject.displayName}
                </Link>
              </li>

              <li className="price-category">
                <span className="bullet-after">
                    <span className="business-attribute price-range">$$</span>
                </span>
                <span className="category-str-list">
                    <a>{reviewType}</a>
               </span>

              </li>

              <li className="user-location responsive-hidden-small">
                <span>{reviewObject.thirdRow}</span>
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
    const canEditReview = Reviews.checkCanEditReview(this.props)

    return (
      <div className="review-content">
        <div className="review-content">
          <div className="biz-rating biz-rating-large clearfix">
            <div>
              <Telescope.components.F8StarIcon
                rate={rate}
                iconType="regular"
                iconWidth="84"
                iconHeight="303"/>

              {canEditReview && <div className="review_edit_button">{this.renderRightEditButton()}</div>}

            </div>
            <span className="rating-qualifier">
              {Reviews.toDateString(review.updatedAt)}
            </span>
          </div>

          <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
        </div>
        {/*<Telescope.components.ReviewsItemButtonsPanel/>*/}

      </div>
    )
  }


  renderRightEditButton() {
    const {review} = this.props;
    return (
      <Link to={getEditReviewLink(review)}
            className="link-more icon-wrapper mapbox-edit">
            <span id="icon_14X14"
                  className="icon icon--14-pencil icon--size-14 icon--linked u-space-r-half">
              <svg className="icon_svg">
                <path
                  d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
              </svg>
            </span>
        <span>Edit</span>
      </Link>
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


const {connect} = require('react-redux')

function select(store) {
  return {
    currentUser: store.user
  }
}

export default connect(select)(ReviewsItemForUserProfile)

