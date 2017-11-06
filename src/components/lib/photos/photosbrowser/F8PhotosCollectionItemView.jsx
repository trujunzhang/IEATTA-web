import Telescope from '../../index'

import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {withRouter} from 'react-router'
import {
  getPhotosBrowserSelectionLink,
  geDetailedModelLinkByObjectSchemaName
} from '../../../../lib/link'

import {Link} from 'react-router'

const {
  PHOTO_BROWSER_NORMAL_TITLE,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
  PHOTO_BROWSER_ORGANIZATION_TITLE,
  // Slide show type
  SLIDE_SHOW_VIEW_TYPE_PHOTO_BROWSER,

  PARSE_USERS,
} = require('../../../../lib/constants').default

class F8PhotosCollectionItemView extends Component {

  renderLeftTopForRecipe(photo) {
    const {forObject} = this.props;
    const isOwner = Photos.isPhotoOwnRecipe(forObject.id, photo);
    const iconData =
      isOwner ?
        "data:image/png;base64,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"
        :
        "data:image/png;base64,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"

    return (
      <button className="chiclet-link u-cursor-pointer js-delete-review-draft"
              onClick={() => {
                this.props.onOwnPhotoForRecipes(photo)
              }}
              id="photos-browser-cell-item-button-selector">
                <span id="icon_18X18" className="icon icon--18-trash icon--size-18 icon--currentColor">
                    <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <image id="ImageSelected" x="0" y="0" width="18" height="18" xlinkHref={iconData}/>
                        </g>
                    </svg>
                </span>
      </button>
    )
  }

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
    const {photo, photosListTask} = this.props;
    const creator = photo.creator;
    const userLink = geDetailedModelLinkByObjectSchemaName(PARSE_USERS, creator);
    const linkProperty = !!creator ? {to: userLink} : {};

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">

          <Telescope.components.F8ImagesSlideShowView
            altValue={creator.displayName}
            forObject={creator}
            objectSchemaName={PARSE_USERS}
            imageSize={30}
            listTask={photosListTask}
          />

          <div className="media-story" id="photos-browser">

            <span className="author">
                {"by"}
              <Link className="user-display-name js-analytics-click margin-left-4"
                    {...linkProperty}
                    id="dropdown_user-name">
                    {creator.displayName}
              </Link>
                </span>
          </div>


        </div>
      </div>
    )
  }

  renderOverLayxxx(photoInfo) {
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

    const linkProps = photoTitleType === PHOTO_BROWSER_ORGANIZATION_TITLE ? {} : {
      to: getPhotosBrowserSelectionLink(photo, modelType, forObject, this.props)
    }
    return (
      <li className="photos-browser-item" key={photo.id}>
        <div className="photo-box photo-box--interactive">

          <Link {...linkProps}>
            <img className="photo-box-img"
                 width="150"
                 height="150"
                 src={Photos.getThumbnailUrl(photo)}/>
          </Link>

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderLeftTopTrash(photo)}
          {photoTitleType === PHOTO_BROWSER_ORGANIZATION_TITLE && this.renderLeftTopForRecipe(photo)}

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderOverLayForUserProfile(photoInfo, photo, index)}
          {photoTitleType === PHOTO_BROWSER_NORMAL_TITLE && this.renderOverLay(photoInfo)}

        </div>

      </li>

    )
  }

}


export default withRouter(F8PhotosCollectionItemView);
