import React, {Component} from 'react';

import Photos from '../../../../lib/photos'

class EditReviewTopRestaurant extends Component {

  render() {
    const {forObject, reviewType} = this.props;

    return (
      <div className="war-write_business">
        <div className="media-block media-block--12 biz-listing-medium">
          <div className="media-avatar">
            <div className="photo-box pb-60s">
              <a className="js-analytics-click">
                <img alt="Wayfare Tavern"
                     className="photo-box-img"
                     width="60"
                     height="60"
                     src={Photos.getListThumbnailUrl(forObject)}/>

              </a>

            </div>

          </div>
          <div className="media-story">
            <div className="media-title clearfix">
              <a className="biz-name js-analytics-click">
                <span>
                  {forObject.displayName}
                </span>
              </a>


            </div>
            <div className="price-category">
                <span className="bullet-after">

        <span className="business-attribute price-range">$$$</span>
        </span>
              <span className="category-str-list">
                    <a>
                      American (Traditional)
                    </a>
         </span>


            </div>


            <div className="restaurant-list-item-address-rows">
              {forObject.address}
            </div>

          </div>

        </div>

      </div>
    );
  }
}


export default EditReviewTopRestaurant;
