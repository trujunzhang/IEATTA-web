import Telescope from '../../index'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'
import Reviews from '../../../../lib/reviews'

class ReviewsItemForUserProfile extends Component {

  renderTop() {
    const {review} = this.props;
    const {reviewType, event, restaurant, user, recipe} = review;

    debugger

    return (
      <div className="review-topbar">

        <div className="media-block media-block--12 biz-listing-medium">

          <div className="media-avatar">
            <div className="photo-box pb-60s" data-hovercard-id="YCUg5LPpRgun-AcOFMMS_w">
              <a
                className="js-analytics-click"
                data-analytics-label="user-photo">
                <Telescope.components.F8PlaceHolderImage
                  alt={user.username}
                  className="photo-box-img"
                  width="60"
                  height="60"
                  placeholderSource={"/default/user_30_square.png"}
                  source={Photos.getListThumbnailUrl(user)}
                />
              </a>
            </div>

          </div>

          <div className="media-story">
            <ul className="user-passport-info">
              <li className="user-name">
                <a className="user-display-name js-analytics-click"
                   data-hovercard-id="YCUg5LPpRgun-AcOFMMS_w"
                   data-analytics-label="about_me" id="dropdown_user-name">
                  {user.username}
                </a>
              </li>
              <li className="user-location responsive-hidden-small">
                <b>Fremont, CA</b>
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
