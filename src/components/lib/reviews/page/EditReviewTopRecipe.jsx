import React, {Component} from 'react';

import {getOrderedRecipeLink} from '../../../../lib/link'
import {Link} from 'react-router'
import Photos from '../../../../lib/photos'

class EditReviewTopRecipe extends Component {

  render() {
    const {forObject} = this.props;

    return (
      <div className="war-write_business">
        <div className="media-block media-block--12 biz-listing-medium">
          <div className="media-avatar">
            <div className="photo-box pb-60s">

              <a className="js-analytics-click">
                <img alt={forObject.displayName}
                     className="photo-box-img"
                     width="60"
                     height="60"
                     src={Photos.getListThumbnailUrl(forObject)}/>

              </a>

            </div>

          </div>
          <div className="media-story">
            <div className="media-title clearfix">

              <Link className="biz-name js-analytics-click" to={getOrderedRecipeLink(forObject)}>
                <span>
                  {forObject.displayName}
                </span>
              </Link>


            </div>
            <div className="price-category">
                <span className="bullet-after">

        <span className="business-attribute price-range">$$$</span>
        </span>
              <span className="category-str-list">
                    <a>
                      {"Recipe"}
                    </a>
         </span>


            </div>

            <div className="restaurant-list-item-address-rows">
              {forObject.price}
            </div>

          </div>

        </div>

      </div>
    );
  }
}


export default EditReviewTopRecipe;
