import Telescope from '../../index'

import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {withRouter} from 'react-router'
import {getPhotosBrowserSelectionLink} from '../../../../lib/link'
import {Link} from 'react-router'

const {
  PHOTO_BROWSER_NORMAL_TITLE,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
} = require('../../../../lib/constants').default

const {
  removeSelectedPhoto,
  timeout,
} = require('../../../../actions').default

class F8PhotosCollectionItemView extends Component {


  renderLeftTopTrash(photo) {
    return (
      <button className="chiclet-link u-cursor-pointer show-tooltip js-delete-review-draft"
              onClick={() => {
                this.props.onShowRemoveConfirmDialogPress(photo)
              }}
              id="photos-browser-cell-item-button-trash">
                <span id="icon_18X18" className="icon icon--18-trash icon--size-18 icon--currentColor">
                     <svg className="icon_svg">
                            <path
                              d="M3 5V3h4V2h4v1h4v2H3zm11 9c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6h10v8zM8 8.5a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-5zm3 0a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-5z"/></svg>
                </span>
        <span className="tooltip-wrapper">
                    <span className="tooltip">Delete photo</span>
                </span>
      </button>
    )
  }


  renderOverLayForUserProfile(photoInfo, photo, index) {
    const {overlay} = photoInfo;

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">

          <div className="media-story" id="photos-browser">

            <Link className="photo-desc margin-right-4" to={overlay.linkUrl}>
              {overlay.title}
            </Link>

          </div>

        </div>
      </div>

    )
  }


  /**
   * Render default overlay.
   *
   * @param photoInfo
   * @returns {XML}
   */
  renderOverLay(photoInfo) {
    const {overlay} = photoInfo;
    const {user} = overlay;
    const userName = user.username;
    const userImageUrl = user.imageUrl;
    const userLink = user.userProfileUrl;
    const linkProperty = !!userLink ? {to: userLink} : {};

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">
          <div className="media-avatar avatar">
            <div className="photo-box pb-30s">

              <Link {...linkProperty} className="js-analytics-click">

                <Telescope.components.F8PlaceHolderImage
                  alt={userName}
                  width="30"
                  height="30"
                  placeholderSource={"/default/user_30_square.png"}
                  source={userImageUrl}
                />

              </Link>

            </div>


          </div>

          <div className="media-story" id="photos-browser">

            <span className="author">
                {"by"}
              <Link className="user-display-name js-analytics-click margin-left-4"
                    {...linkProperty}
                    id="dropdown_user-name">
                    {userName}
              </Link>
                </span>
          </div>

        </div>
      </div>

    )
  }

  render() {
    const {photoInfo, photo, index} = this.props;
    const {forObject, modelType, photoTitleType} = this.props;

    return (
      <li className="photos-browser-item" key={photo.id}>
        <div className="photo-box photo-box--interactive">

          <Link to={getPhotosBrowserSelectionLink(photo, modelType, forObject, this.props)}>
            <img
              width="150"
              height="150"
              className="photo-box-img"
              src={Photos.getThumbnailUrl(photo)}/>
          </Link>

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderLeftTopTrash(photo)}

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderOverLayForUserProfile(photoInfo, photo, index)}
          {photoTitleType === PHOTO_BROWSER_NORMAL_TITLE && this.renderOverLay(photoInfo)}

        </div>

      </li>

    )
  }

}


export default withRouter(F8PhotosCollectionItemView);
