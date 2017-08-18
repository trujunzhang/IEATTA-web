import React, {Component} from 'react';
import Telescope from '../../index'

import {withRouter} from 'react-router'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../../lib/constants').default

class ReviewsHeaderView extends Component {

  renderTitle() {
    const {reviewTitle} = this.props;
    const reviewListType = this.props.reviewListType || REVIEW_LIST_TYPE_NORMAL;

    switch (reviewListType) {
      case REVIEW_LIST_TYPE_NORMAL:
        return (<h2>Recommended Reviews <b>{'for ' + reviewTitle}</b></h2>)
      default:
        return (<h2>Reviews</h2>)
    }

  }

  renderContent() {
    const reviewListType = this.props.reviewListType || REVIEW_LIST_TYPE_NORMAL;

    switch (reviewListType) {
      case REVIEW_LIST_TYPE_NORMAL:
        return (
          <div className="arrange arrange--middle u-space-b1">

            <Telescope.components.ReviewsHeaderSearchBar/>
            <Telescope.components.ReviewsHeaderRightSortView/>

          </div>
        )
      case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
        return (
          <Telescope.components.ReviewsHeaderRightSortView/>
        )
    }

  }

  render() {

    return (
      <div className="feed_header">
        <div className="section-header section-header--no-spacing">

          {this.renderTitle()}

          <div className="feed_filters">

            <div className="section-header_block u-space-0">
              {this.renderContent()}
            </div>

          </div>

        </div>

      </div>
    );
  }
}


export default ReviewsHeaderView;
