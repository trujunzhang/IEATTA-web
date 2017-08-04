import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Photos from '../../../../lib/photos'


import {withRouter} from 'react-router'

class RecipesItem extends Component {

  renderLeftAvator() {
    const {recipe} = this.props;

    return (
      <div className="media-avatar">

        <div className="photo-box pb-90s">
          <a href="/biz/san-tung-san-francisco-2"
             className="js-analytics-click"
          >
            <img alt={recipe.displayName}
                 className="photo-box-img"
                 width="90"
                 height="90"
                 src={Photos.getListThumbnailUrl(recipe)}/>
          </a>
        </div>
      </div>
    )
  }


  renderStory() {
    const {recipe} = this.props;

    return (
      <div className="media-story">
        <div className="media-title clearfix">
                                <span className="indexed-biz-name">1.
                                  <a className="biz-name js-analytics-click"
                                     data-analytics-label="biz-name"
                                     href="/biz/san-tung-san-francisco-2"
                                     data-hovercard-id="UM8uywr0zv0EnxZh7DB9nA">
                                    <span>San Tung</span>
                                  </a>
</span>


        </div>
        <div className="biz-rating biz-rating-large clearfix">


          <div className="i-stars i-stars--regular-4 rating-large" title="4.0 star rating">
            <img className="offscreen" height="303"
                 src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png"
                 width="84"
                 alt="4.0 star rating"/>
          </div>
          <div itemProp="ratingValue" content="4.0">
              <span className="review-count rating-qualifier">
            <span itemProp="reviewCount">5565</span> reviews</span>
          </div>

        </div>


        <div className="price-category">
                    <span className="category-str-list">
                    <a href="/search?find_loc=San+Francisco%2C+CA&amp;cflt=chinese">xxx</a>,
                    <a href="/search?find_loc=San+Francisco%2C+CA&amp;cflt=chicken_wings">Chicken Wings</a>
    </span>

        </div>


        <small className="biz-city">San Francisco, CA</small>

      </div>

    )
  }

  renderRightTime() {
    return (

      <div className="arrange_unit nowrap">
        <div className="subtle-text">
          4/28/2017
        </div>
      </div>

    )
  }

  render() {
    return (
      <li className="js-bookmark-row">
        <div className="bookmark-listing">


          <div className="arrange">

            <div className="arrange_unit arrange_unit--fill">

              <div className="media-block media-block--12 biz-listing-medium">

                {this.renderLeftAvator()}
                {this.renderStory()}

              </div>
            </div>

            {this.renderRightTime()}

          </div>
        </div>

      </li>

    )
  }
}


const {connect} = require('react-redux')

export default withRouter(connect()(RecipesItem))
