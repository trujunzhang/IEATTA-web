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

          {photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE && this.renderOverLay(photoInfo, photo, index)}

        </div>


      </li>

    )
  }


  renderOverLay(photoInfo, photo, index) {
    const {overlay} = photoInfo;
    const {user} = overlay;
    const userName = user.username;
    const linkTitle = overlay.title !== '' ? overlay.title : userName;

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">

          <div className="media-story" id="photos-browser">

            <Link className="photo-desc margin-right-4" to={overlay.linkUrl}>
              {linkTitle}
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
