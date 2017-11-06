import Telescope from '../../index'
import React, {Component} from 'react';

import {getOrderedRecipeLink} from '../../../../lib/link'
import {Link} from 'react-router'
import Photos from '../../../../lib/photos'

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
} = require('../../../../lib/constants').default

class EditReviewTopRecipe extends Component {

  render() {
    const {forObject} = this.props;

    return (
      <div className="war-write_business">
        <div className="media-block media-block--12 biz-listing-medium">


          <Telescope.components.F8ImagesSlideShowView
            altValue={forObject.displayName}
            forObject={forObject}
            objectSchemaName={PARSE_RECIPES}
            listTask={forObject}
            imageSize={60}
          />

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
