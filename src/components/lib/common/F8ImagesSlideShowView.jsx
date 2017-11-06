import Telescope from '../../lib'
import React, {Component} from 'react'

import {
  geDetailedModelLinkByObjectSchemaName,
  geDetailedModelLink,
  calculateTotalCount
} from '../../../lib/link'

import {Link} from 'react-router'

import Photos from '../../../lib/photos'

/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  // Sections
  SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
  // Model Form Type
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
  // Slide show type
  SLIDE_SHOW_VIEW_TYPE_NORMAL,
  SLIDE_SHOW_VIEW_TYPE_USER_AVATOR,
  SLIDE_SHOW_VIEW_TYPE_PHOTO_BROWSER,
  SLIDE_SHOW_VIEW_TYPE_EDIT_USER,
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
} = require('../../../lib/constants').default


class F8ImagesSlideShowView extends Component {

  constructor(props, context) {
    super(props)

    const slideObject = Photos.generateSlideShowObject(props)
    this.state = {slideObject}
  }

  render() {
    const {altValue, forObject, objectSchemaName, imageSize, slideShowType} = this.props;
    const {slideObject} = this.state;
    const {
      emptyList,
      photoUrl,
      placeholder
    } = slideObject;

    const imageViews = []
    if (emptyList) {
      imageViews.push(
        <img
          key={`emptyItem-for-${objectSchemaName}-${forObject.id}`}
          alt={altValue}
          className="photo-box-img"
          width={imageSize}
          height={imageSize}
          src={placeholder}
        />
      )
    } else {
      imageViews.push(
        <img
          key={`item-for-${objectSchemaName}-${forObject.id}-1`}
          alt={altValue}
          className="photo-box-img"
          width={imageSize}
          height={imageSize}
          src={photoUrl}
        />
      )
    }

    switch (slideShowType) {
      case SLIDE_SHOW_VIEW_TYPE_PHOTO_BROWSER:
        const userLink = geDetailedModelLinkByObjectSchemaName(PARSE_USERS, forObject);
        const linkProperty = !!forObject ? {to: userLink} : {};
        return (
          <div className="media-avatar avatar">
            <div className="photo-box pb-30s">
              <Link {...linkProperty} className="js-analytics-click">
                {imageViews}
              </Link>
            </div>
          </div>
        )
      case SLIDE_SHOW_VIEW_TYPE_USER_AVATOR:
        return (
          <div className="user-profile_avatar">
            <div
              className="photo-slideshow photo-slideshow--full-width photo-slideshow--rounded js-photo-slideshow-user-details">
              <div className="photo-slideshow_slide is-active">
                <div>
                  <Link to={geDetailedModelLinkByObjectSchemaName(objectSchemaName, forObject)}>
                    {imageViews}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      case  SLIDE_SHOW_VIEW_TYPE_EDIT_USER:
        return (
          <div className="photo-box pb-m">
            <a className="js-analytics-click">
              {imageViews}
            </a>
          </div>
        )
      default:
        return (
          <div className='media-avatar'>
            <div className={`photo-box pb-${imageSize}s`}>
              <Link to={geDetailedModelLinkByObjectSchemaName(objectSchemaName, forObject)}>
                {imageViews}
              </Link>
            </div>
          </div>
        )
    }
  }
}

F8ImagesSlideShowView.propTypes = {
  imageSize: React.PropTypes.number,
  slideShowType: React.PropTypes.string
};

F8ImagesSlideShowView.defaultProps = {
  imageSize: 60,
  slideShowType: SLIDE_SHOW_VIEW_TYPE_NORMAL
};


export default F8ImagesSlideShowView;
