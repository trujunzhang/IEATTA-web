import React, {Component} from 'react';
import Telescope from '../../lib'

import Posts from '../../../lib/posts'

import {withRouter} from 'react-router'

class ReviewsHeaderView extends Component {

  renderTitle() {
    return (
      <h2>Recommended Reviews <b>for Chef Cho</b></h2>
    )
  }

  render() {
    return (
      <div className="feed_header" data-component-bound="true">
        <div className="section-header section-header--no-spacing">

          {this.renderTitle()}

          <div className="feed_filters">

            <div className="section-header_block u-space-0">

              <div className="arrange arrange--middle u-space-b1">

                {/*{Telescope.component.ReviewHeaderSearchBar}*/}
                {/*{this.renderHeaderSort()}*/}

              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}


export default ReviewsHeaderView;
