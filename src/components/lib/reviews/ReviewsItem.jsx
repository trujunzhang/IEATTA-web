import Telescope from '../../lib'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'
import Posts from '../../../lib/posts'
import Reviews from '../../../lib/reviews'

import {withRouter} from 'react-router'

class ReviewsItem extends Component {

  renderLeft() {
    const {review} = this.props;
    const {user} = review;

    return (
      <div className="review-sidebar" data-component-bound="true">

        <div className="review-sidebar-content">

          <div className="ypassport media-block">
            <div className="media-avatar responsive-photo-box">
              <div className="photo-box pb-60s" data-hovercard-id="YCUg5LPpRgun-AcOFMMS_w">
                <a
                  className="js-analytics-click"
                  data-analytics-label="user-photo">
                  <img alt={user.username} className="photo-box-img"
                       width="60"
                       height="60"
                       src={Photos.getListThumbnailUrl(user)}/>
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
      </div>


    )
  }


  renderStory() {
    const {review} = this.props;
    const htmlBody = Reviews.getHtmlBody(review);

    return (
      <div className="review-wrapper">
        <div className="review-content">

          <div className="biz-rating biz-rating-large clearfix">
            <div>
              <div className="i-stars i-stars--regular-1 rating-large" title="1.0 star rating">
                <img className="offscreen" height="303"
                     src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png"
                     width="84" alt="1.0 star rating"/>
              </div>

            </div>
            <span className="rating-qualifier">
        6/11/2017
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
        <div className="review review--with-sidebar">

          {this.renderLeft()}
          {this.renderStory()}

        </div>

      </li>

    )
  }
}


const {connect} = require('react-redux')

export default withRouter(connect()(ReviewsItem))
