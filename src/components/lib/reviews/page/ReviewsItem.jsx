import Telescope from '../../index'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'
import Users from '../../../../lib/users'
import Reviews from '../../../../lib/reviews'

import {Link} from 'react-router'

import {
  getEditReviewLink,
  getLoggedUserMenuLink
} from '../../../../lib/link'

class ReviewsItem extends Component {

  renderLeft() {
    const {review} = this.props;
    const {creator} = review;

    return (
      <div className="review-sidebar">

        <div className="review-sidebar-content">

          <div className="ypassport media-block">
            <div className="media-avatar responsive-photo-box">
              <div className="photo-box pb-60s" data-hovercard-id="YCUg5LPpRgun-AcOFMMS_w">

                <Link to={getLoggedUserMenuLink(creator)}>

                  <Telescope.components.F8PlaceHolderImage
                    alt={creator.username}
                    className="photo-box-img"
                    width="60"
                    height="60"
                    placeholderSource={"/default/user_30_square.png"}
                    source={creator.defaultAvatarUrl}/>

                </Link>
              </div>
            </div>
            <div className="media-story">
              <ul className="user-passport-info">
                <li className="user-name">
                  <Link className="user-display-name title-font-weight-bold"
                        to={getLoggedUserMenuLink(creator)}
                        id="dropdown_user-name">
                    {creator.username}
                  </Link>
                </li>
                <li className="user-location responsive-hidden-small">
                  <small>
                    <h6>Account Since</h6>
                    <p>{Users.getCreatedAtFormat(creator)}</p>
                  </small>
                </li>
              </ul>
            </div>
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
      <div className="review-wrapper">
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
        <div className="review review--with-sidebar">

          {this.renderLeft()}
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

export default connect(select)(ReviewsItem)


