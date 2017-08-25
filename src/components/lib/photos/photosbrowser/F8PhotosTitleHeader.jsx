import Telescope from '../../index'
import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {Link} from 'react-router'
import {geDetailedModelLink} from '../../../../lib/link'

class F8PhotosTitleHeader extends Component {

  renderObjectAvator() {
    const {modelType, forObject} = this.props;

    return (
      <div className="media-avatar">
        <div className="photo-box pb-30s">

          <Link className="js-analytics-click" to={geDetailedModelLink(modelType, forObject)}>
            <Telescope.components.F8PlaceHolderImage
              alt={forObject.displayName}
              className="photo-box-img"
              height="30"
              width="30"
              placeholderSource={"/default/blank_biz_small.png"}
              source={Photos.getListThumbnailUrl(forObject)}/>

          </Link>

        </div>
      </div>
    )
  }

  renderObjectStory() {
    const {modelType, forObject, reviewStatistic} = this.props;

    return (
      <div className="media-story">
        <div className="media-title clearfix">

          <Link className="biz-name js-analytics-click" to={geDetailedModelLink(modelType, forObject)}>
            <span>{forObject.displayName}</span>
          </Link>

        </div>
        <div className="biz-passport_rating">
          <div className="biz-rating biz-rating-medium clearfix">

            <Telescope.components.F8StarIcon
              rate={reviewStatistic.reviewRating}
              iconType="small"
              iconExtension="rating"/>

            <span className="review-count rating-qualifier">
            <span>
                 {reviewStatistic.total}
            </span>
              {" reviews"}
         </span>

          </div>

        </div>
      </div>

    )
  }

  renderBottom() {
    return (
      <div className="section-header media-header--tabbed">

        <div className="arrange arrange--12 arrange--bottom">
          <div className="arrange_unit arrange_unit--fill media-header_biz-listing">
            <div className="media-block media-block biz-passport--slim">
              {this.renderObjectAvator()}
              {this.renderObjectStory()}
            </div>

          </div>
          <div className="arrange_unit nowrap media-header_actions">

            <a className="ybtn ybtn--primary u-space-r1" href="/biz_user_photos/B09WOy0W83Od-Xw4xEXxog/upload">
               <span id="icon_24X24"
                     className="icon icon--24-add-photo icon--size-24 icon--currentColor u-space-r1 icon--fallback-inverted">
                     <svg className="icon_svg">
                            <path
                              d="M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM13 14v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1z"/>
                     </svg>
               </span>
              {"Add photos"}
            </a>

          </div>
        </div>

        <div className="section-header_tabs js-section-header_tabs">
          <div className="media-header_root-navbar">
          </div>

        </div>
      </div>

    )
  }


  render() {
    const {forObject} = this.props;
    return (
      <div className="js-media-landing_header media-landing_header">
        <h1 className="js-media-landing_header_title">
          {"Photos for " + forObject.displayName}
        </h1>
        {this.renderBottom()}
      </div>

    );
  }
}


export default F8PhotosTitleHeader;
