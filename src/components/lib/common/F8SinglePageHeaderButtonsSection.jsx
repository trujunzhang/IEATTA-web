import Telescope from '../index'
import React, {Component} from 'react'

import {
  getNewReviewLink,
  getAddPhotoLink
} from '../../../lib/link'

import {Link} from 'react-router'

/**
 * The states were interested in
 */
const {
  // parse models
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // Rest API
  SAVE_MODEL_REQUEST,
  UPDATE_MODEL_REQUEST,
  // Right Buttons Group Type
  RIGHT_BUTTON_GROUP_ADD_EVENT,
  RIGHT_BUTTON_GROUP_ADD_RECIPE,
} = require('../../../lib/constants').default

import AppConstants from "../../../lib/appConstants";
import TopRightButtonsGroup from "../../../lib/topRightButtonsGroup";

class F8SinglePageHeaderButtonsSection extends Component {

  renderWriteAReview() {
    const {modelType, forObject} = this.props;
    return (
      <Link className="ybtn ybtn--primary war-button" to={getNewReviewLink(modelType, forObject)}>
            <span id="icon_24X24"
                  className="icon icon--24-star icon--size-24 icon--currentColor u-space-r-half icon--fallback-inverted">
              <svg className="icon_svg">
                <path
                  d="M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z"/>
              </svg>
            </span>
        {"Write a Review"}
      </Link>
    )
  }

  renderButtonByType(buttonType) {
    const buttonObject = TopRightButtonsGroup.generateButtonSVGView(buttonType)
    return (
      <a className="ybtn ybtn--small">
              <span id="icon_18X18"
                    className="icon icon--size-18 icon--currentColor">
                <svg className="icon_svg">
                  <path d={buttonObject.svg}/>
                </svg>
              </span>
        <span className="js-popup-link-text">{buttonObject.title}</span>
      </a>
    )
  }

  renderRightButtonsGroup() {
    const {
      modelType,
      forObject
    } = this.props;

    const {objectSchemaName} = AppConstants.realmObjects[modelType]
    switch (objectSchemaName) {
      case PARSE_RESTAURANTS:
        return (
          <span className="ybtn-group clearfix">
            {this.renderButtonByType(RIGHT_BUTTON_GROUP_ADD_EVENT)}
            {this.renderButtonByType(RIGHT_BUTTON_GROUP_ADD_RECIPE)}
          </span>
        )
      case PARSE_EVENTS:
        // return (
        //   <span className="ybtn-group clearfix">
        //
        //   </span>
        // )
        break;
      case PARSE_RECIPES:
        // return (
        //   <span className="ybtn-group clearfix">
        //     {this.renderButtonForAddPhoto()}
        //   </span>
        // )
        break;
    }

    return null;
  }

  render() {
    const {
      showEdit,
      modelType,
      forObject
    } = this.props;

    return (
      <div className="biz-page-actions nowrap">

        {this.renderWriteAReview()}

        {this.renderRightButtonsGroup()}


      </div>

    )
  }
}

F8SinglePageHeaderButtonsSection.propTypes = {
  showEdit: React.PropTypes.bool
};

F8SinglePageHeaderButtonsSection.defaultProps = {
  showEdit: false
};


export default F8SinglePageHeaderButtonsSection;
