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

class F8PhotosCollectionView extends Component {

  render() {
    const {photosListTask} = this.props;
    const photos = photosListTask.results;
    return (
      <div className="media-landing_gallery photos">
        <ul className="photo-box-grid photo-box-grid--highlight photo-box-grid--small clearfix lightbox-media-parent">
          {photos.map((photo, index) => {
            const photoInfo = Photos.getSinglePhotoItemInfo(photo)
            return (
              <Telescope.components.F8PhotosCollectionItemView
                {...this.props}
                photoInfo={photoInfo} photo={photo} index={index}/>
            )
          })}
        </ul>
      </div>
    );
  }
}


export default withRouter(F8PhotosCollectionView);
