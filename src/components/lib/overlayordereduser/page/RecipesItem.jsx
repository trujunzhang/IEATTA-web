import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Recipes from '../../../../lib/recipes'
import Photos from '../../../../lib/photos'

import {Link} from 'react-router'
import {withRouter} from 'react-router'
import {getOrderedRecipeLink} from '../../../../lib/link'

class RecipesItem extends Component {

  renderLeftAvator() {
    const {recipe} = this.props;

    return (
      <div className="media-avatar">

        <div className="photo-box pb-90s">
          <Link
            className="js-analytics-click"
            to={getOrderedRecipeLink(recipe)}>
            <img alt={recipe.displayName}
                 className="photo-box-img"
                 width="90"
                 height="90"
                 src={Photos.getListThumbnailUrl(recipe)}/>
          </Link>
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
                                    <span>{recipe.displayName}</span>
                                  </a>
</span>


        </div>
        <div className="biz-rating biz-rating-large clearfix">

          <Telescope.components.F8StarIcon
            rate={1}
            iconType="regular"
            iconWidth="84"
            iconHeight="303"
          />

          <div itemProp="ratingValue" content="4.0">
              <span className="review-count rating-qualifier">
            <span itemProp="reviewCount">5</span> reviews</span>
          </div>

        </div>


        <div className="price-category">
                    <span className="category-str-list">
                      {"$. " + recipe.price}
    </span>

        </div>


        <small className="biz-city">San Francisco, CA</small>

      </div>

    )
  }

  renderRightTime() {

    const {recipe} = this.props;

    return (

      <div className="arrange_unit nowrap">
        <div className="subtle-text">
          {Recipes.getUpdatedAtFormat(recipe)}
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
