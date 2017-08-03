import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Photos from '../../../lib/photos'
import Users from '../../../lib/users'
import {getRestaurantLink} from '../../../lib/link'
import {withRouter} from 'react-router'

import {Link} from 'react-router'

import {FormattedMessage, FormattedRelative} from 'react-intl'

class RestaurantsItem extends Component {

  renderReview() {
    const {listId, restaurant, index} = this.props,
      reviews = 0
    return (
      <div className="biz-rating biz-rating-large clearfix">
        <div className={`i-stars i-stars--regular-${reviews} rating-large`} title={`${reviews}.0 star rating`}>
          <img className="offscreen" width="84" height="303" src="/images/stars/stars.png"
               alt={`${reviews}.0 star rating`}/>
        </div>
        <span className="review-count rating-qualifier">{`${reviews} reviews`}</span>
      </div>
    )
  }

  renderLeft() {
    const {listId, restaurant, index} = this.props;

    return (
      <div className="main-attributes">
        <div className="media-block media-block--12">
          <div className="media-avatar">
            <div className="photo-box pb-90s">
              <Link className="js-analytics-click" to={getRestaurantLink(restaurant)}>
                <img alt={restaurant.displayName}
                     className="photo-box-img" height="90" width="90"
                     src={Photos.getListThumbnailUrl(restaurant)}/>
              </Link>
            </div>
          </div>
          <div className="media-story">
            <h3 className="search-result-title">
              <span className="indexed-biz-name">{`${index + 1}.`}
                <Link className="biz-name js-analytics-click" to={getRestaurantLink(restaurant)}>
                  <span>{restaurant.displayName}</span>
                </Link>
              </span>
            </h3>

            {this.renderReview()}

            <div className="price-category">
              <span className="bullet-after">
                <span className="business-attribute price-range">$</span>
              </span>
              <span className="category-str-list">
                <a>Restaurant</a>
              </span>
            </div>


            <ul className="search-result_tags">
              <li className="tag-18x18_flame-dd5114">
                <small>
                    <span
                      id="posts_item_span"
                      className="icon icon--18-flame icon--size-18">
                      <svg className="icon_svg">
                        <path
                          d="M11.508 3.743c1.173 2.43-.465 2.27-.696 3.88C10.082 2.758 5.947 1.5 5.947 1.5c2.045 2.697-1.9 4.784-3.63 8.33-1.47 3.016 2.533 5.44 4.67 6.67-2.15-2.993-.563-5.02 1.612-6.793-.81 2.448.5 2.934 1.043 3.944.71-.31 1.028-1.3 1.1-1.79.954 1.31 1.465 2.97-.248 4.64 8.302-3.77 5.977-9.743 1.007-12.752z"/>
                      </svg>
                    </span>
                  {'updated '}
                  <FormattedRelative value={restaurant.updatedAt}/>
                </small>

              </li>
            </ul>

          </div>
        </div>
      </div>
    )
  }

  renderRight() {
    const {listId, restaurant, index} = this.props,
      address = restaurant.address,
      array = address.split(',')

    const addressViews = array.map((item, index) => {
      return (<span key={index}>{item}</span>)
    })

    return (
      <div className="secondary-attributes">
        <span className="neighborhood-str-list">
          {restaurant.displayName}
        </span>

        <div className="restaurant-list-item-address-rows">
          {addressViews}
        </div>

      </div>
    )
  }


  render() {
    const {listId, restaurant, index} = this.props

    if (typeof listId === 'undefined') {
      throw new Error('You need to set a proper List Id before using RestaurantsItem')
    }

    return (
      <li
        onMouseEnter={() => {
          debugger
        }}
        className="regular-search-result">
        <div className="search-result natural-search-result">
          <div className="biz-listing-large">
            {this.renderLeft()}
            {this.renderRight()}
          </div>
        </div>
      </li>
    )
  }

}

export default withRouter(RestaurantsItem)
