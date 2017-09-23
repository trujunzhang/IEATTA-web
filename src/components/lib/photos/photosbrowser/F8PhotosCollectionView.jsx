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

class F8PhotosCollectionView extends Component {

  renderRow(photoInfo, photo, index) {
    const {forObject, modelType, photoTitleType} = this.props;

    return (
      <li key={photo.id}>
        <div className="photo-box photo-box--interactive">

          <Link to={getPhotosBrowserSelectionLink(photo, modelType, forObject, this.props)}>
            <img
              width="226"
              height="226"
              className="photo-box-img"
              src={Photos.getThumbnailUrl(photo)}/>
          </Link>

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderOverLayForUserProfile(photoInfo, photo, index)}
          {photoTitleType === PHOTO_BROWSER_NORMAL_TITLE && this.renderOverLay(photoInfo)}

        </div>

      </li>

    )
  }


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


  render() {
    const {photosListTask, modelType, forObject} = this.props;
    const photos = photosListTask.results;

    return (
      <div className="media-landing_gallery photos">
        <ul className="photo-box-grid photo-box-grid--highlight photo-box-grid--small clearfix lightbox-media-parent">
          {photos.map((photo, index) => {
            const photoInfo = Photos.getSinglePhotoItemInfo(photo)
            return this.renderRow(photoInfo, photo, index)
          })}
        </ul>
      </div>
    );
  }
}


export default withRouter(F8PhotosCollectionView);
