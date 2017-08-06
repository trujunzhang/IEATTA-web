import Telescope from '../../../lib'
import React, {Component} from 'react'

class RestaurantsSingleHeaderTopLeftPanel extends Component {

  render() {
    const {restaurant} = this.props;
    const rate = 1;

    return (
      <div className="biz-page-header-left claim-status">

        {this.renderRestaurantTitle()}

        <div className="biz-main-info embossed-text-white">
          <div className="rating-info clearfix">
            <div className="biz-rating biz-rating-very-large clearfix">
              <Telescope.components.F8StarIcon
                rate={0}
                iconExtension="rating-very-large"
                iconType="large"
                iconWidth="84"
                iconHeight="303"
              />
              <span className="review-count rating-qualifier">
                {`${rate} reviews`}
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
        <a className="chiclet-link chiclet-link--with-text show-tooltip js-rating-details">
            <span id="icon_14X14"
                  className="icon icon--14-histogram icon--size-14 icon--currentColor">
              <svg className="icon_svg">
                <path d="M9 11V5h2v6H9zM6 3h2v8H6V3zM3 7h2v4H3V7z"/>
              </svg>
            </span>
          Details
          <span className="tooltip-wrapper">
                <span className="tooltip">Rating details</span>
            </span>
        </a>
      </div>

    )
  }

  renderPriceInfo() {
    return (
      <div className="price-category">
                    <span className="bullet-after">
                      <span className="business-attribute price-range">$$</span>
                    </span>
        <span className="category-str-list">
                    <a>Restaurant</a>
            </span>

        {this.renderEditButton()}
      </div>

    )
  }

  renderEditButton() {
    return (
      <a
        className="edit-category chiclet-link chiclet-link--with-text show-tooltip">
              <span id="icon_14X14"
                    className="icon icon--14-pencil icon--size-14 icon--currentColor">
                <svg className="icon_svg">
                  <path
                    d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
                </svg>
              </span>
        Edit
        <span className="tooltip-wrapper">
                <span className="tooltip">Edit restaurant</span>
              </span>
      </a>

    )
  }


  renderRestaurantTitle() {
    return (
      <div className="u-space-t1">
        <h1 className="biz-page-title embossed-text-white shortenough">
          {this.props.restaurant.displayName}
        </h1>
        <div className="u-nowrap claim-status_teaser js-claim-status-hover">
        <span
          id="icon_18X18"
          className="icon icon--18-checkmark-badged icon--size-18 icon--blue-dark claim-status_icon u-space-r1 claim-status_icon--claimed">
          <svg className="icon_svg">
            <path
              d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm3.96 6.28l-4.808 4.807-3.112-3.11a.8.8 0 1 1 1.13-1.132l1.982 1.98 3.677-3.677a.8.8 0 1 1 1.13 1.13z"/>
          </svg>
        </span>
        </div>

      </div>

    )
  }
}


export default RestaurantsSingleHeaderTopLeftPanel;
