import Telescope from '../index'
import React, {Component} from 'react'

import Records from '../../../lib/records'

import {
  getReviewsListLink,
  getEditLinkByModelType
} from '../../../lib/link'
import {Link} from 'react-router'

import AppConstants from "../../../lib/appConstants";

/**
 * The states were interested in
 */
const {
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  MENU_ITEM_ADD_OR_EDIT_RECIPE,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  PARSE_RESTAURANTS,
  PARSE_RECIPES,
} = require('../../../lib/constants').default

class F8SinglePageHeaderTopLeftPanel extends Component {

  render() {
    const {reviewStatistic} = this.props;

    return (
      <div className="biz-page-header-left claim-status">

        {this.renderRestaurantTitle()}

        <div className="biz-main-info embossed-text-white">
          <div className="rating-info clearfix">
            <div className="biz-rating biz-rating-very-large clearfix">
              <Telescope.components.F8StarIcon
                rate={reviewStatistic.reviewRating}
                iconExtension="rating-very-large"
                iconType="large"
                iconWidth="84"
                iconHeight="303"/>
              <span className="review-count rating-qualifier">
                {`${reviewStatistic.total} reviews`}
              </span>

            </div>

            {this.renderRatingDetails()}

          </div>

          {this.renderPriceInfo()}
        </div>

      </div>
    )
  }

  renderRatingDetails() {
    return (
      <div className="rating-details">
        <Link to={getReviewsListLink(this.props)}
              className="chiclet-link chiclet-link--with-text show-tooltip js-rating-details">
            <span id="icon_14X14"
                  className="icon icon--14-histogram icon--size-14 icon--currentColor">
              <svg className="icon_svg">
                <path d="M9 11V5h2v6H9zM6 3h2v8H6V3zM3 7h2v4H3V7z"/>
              </svg>
            </span>
          {"Details"}
          <span className="tooltip-wrapper">
                  <span className="tooltip">{"Review details"}</span>
          </span>
        </Link>
      </div>

    )
  }

  renderPriceInfo() {
    const {modelType, forObject} = this.props;
    return (
      <div className="price-category">
                    <span className="bullet-after">
                      <span className="business-attribute price-range">$$</span>
                    </span>
        <span className="category-str-list">
                    <a>
                      {Records.toFirstUpperString(modelType)}
                    </a>
               </span>

        {this.renderEditButton()}
      </div>

    )
  }

  renderEditButton() {
    const {modelType, forObject} = this.props;

    return (
      <Link to={getEditLinkByModelType(modelType, forObject)}
            className="edit-category chiclet-link chiclet-link--with-text show-tooltip">
        <span id="icon_14X14"
              className="icon icon--14-pencil icon--size-14 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
                </svg>
              </span>
        {"Edit"}
        <span className="tooltip-wrapper">
                <span className="tooltip">
                  {`Edit ${modelType}`}
                </span>
              </span>
      </Link>

    )
  }


  renderRestaurantTitle() {
    const {forObject, modelType} = this.props;

    const {objectSchemaName} = AppConstants.realmObjects[modelType]

    return (
      <div className="u-space-t1">
        <h1 className="biz-page-title embossed-text-white shortenough">
          {forObject.displayName}
        </h1>
        <div className="u-nowrap claim-status_teaser js-claim-status-hover margin-left-6">
          {
            PARSE_RECIPES === AppConstants.realmObjects[modelType].objectSchemaName &&
            <span className="category-str-list">{`$. ${forObject.price}`}</span>
          }
        </div>

        {
          objectSchemaName === PARSE_RESTAURANTS && this.renderRecipesInfoForRestaurnt()
        }
      </div>

    )
  }

  renderRecipesInfoForRestaurnt() {
    return (
      <div className="u-nowrap claim-status_teaser js-claim-status-hover">
        <span id="icon_18X18"
              className="icon icon--18-checkmark-badged icon--size-18 icon--blue-dark claim-status_icon u-space-r1 claim-status_icon--claimed">
                  <svg className="icon_svg">
                        <path
                          d="M6 14v-2h10v2H6zM6 4h10v2H6V4zm-4 8h2v2H2v-2zm0-4h2v2H2V8zm0-4h2v2H2V4zm12 6H6V8h8v2z"/>
                  </svg>
        </span>
        <Link to={"/"}>
          {"Recipes"}
        </Link>
      </div>
    )
  }
}


export default F8SinglePageHeaderTopLeftPanel;
