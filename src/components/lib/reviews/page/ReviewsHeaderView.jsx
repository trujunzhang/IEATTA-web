import React, {Component} from 'react';
import Telescope from '../../index'

import Posts from '../../../../lib/posts'

import {withRouter} from 'react-router'

class ReviewsHeaderView extends Component {

  renderTitle() {
    const {
      reviewTitle = 'wanghao'
    } = this.props;

    return (
      <h2>Recommended Reviews <b>{'for ' + reviewTitle}</b></h2>
    )
  }

  render() {
    return (
      <div className="feed_header" >
        <div className="section-header section-header--no-spacing">

          {this.renderTitle()}

          <div className="feed_filters">

            <div className="section-header_block u-space-0">

              <div className="arrange arrange--middle u-space-b1">

                <Telescope.components.ReviewsHeaderSearchBar/>
                <Telescope.components.ReviewsHeaderRightSortView/>

              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}


export default ReviewsHeaderView;
