import Telescope from '../../index'
import React, {Component} from 'react'

import AppConstants from "../../../../lib/appConstants";
import {Link} from 'react-router'
import {
  geDetailedModelLinkByObjectSchemaName,
  geDetailedModelLink,
  getPhotosBrowserLink,
} from '../../../../lib/link'

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  MODEL_FORM_TYPE_EDIT,
  MODEL_FORM_TYPE_NEW,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
} = require('../../../../lib/constants').default

class IEAAddPhotosTop extends Component {


  render() {
    const {modelType, forObject} = this.props;
    const {objectSchemaName} = AppConstants.realmObjects[modelType]
    switch (objectSchemaName) {
      case PARSE_RESTAURANTS:
      case PARSE_RECIPES:
        return this.renderCommon()
    }

    return this.renderForUser()
  }

  renderCommon() {
    const {modelType, forObject} = this.props;
    const {objectSchemaName} = AppConstants.realmObjects[modelType]
    return (
      <div id="user_biz_photo_intro">
        <h2>
          <Link to={geDetailedModelLinkByObjectSchemaName(objectSchemaName, forObject)}>
            {`${forObject.displayName}:`}
          </Link>
          {" Add Photos"}
        </h2>

        <Link to={getPhotosBrowserLink(modelType, forObject)}>
          {"View all photos"}
        </Link>

        <br/>
        <br/>
      </div>

    )
  }

  renderForUser() {
    const {forObject} = this.props;
    return (
      <div className="section-header media-header">
        <div className="arrange arrange--12 arrange--bottom">
          <div className="arrange_unit arrange_unit--fill">
            <ul className="breadcrumbs">
              <li>
                <Link to={geDetailedModelLinkByObjectSchemaName(PARSE_USERS, forObject)}>
                  {forObject.username}
                </Link>
              </li>
              <li>
                  <span id="icon_24X24"
                        className="icon icon--24-chevron-right icon--size-24 icon--neutral-gray u-space-r-half">
                     <svg className="icon_svg">
                       <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                      </svg>
                  </span>
                {"Profile photos"}
              </li>
            </ul>

            <h1 className="media-header_title h2">Add photos</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default IEAAddPhotosTop;
