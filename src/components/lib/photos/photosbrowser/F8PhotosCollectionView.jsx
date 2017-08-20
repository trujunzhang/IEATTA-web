import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from '../../../../lib/link'
import {Link} from 'react-router'

class F8PhotosCollectionView extends Component {

  renderRow(photo) {
    const {forObject, modelType} = this.props;
debugger
    return (
      <li data-photo-id="x57_yoZarQuIn9y1r2jsQw">
        <div className="photo-box photo-box--interactive">
          <Link to={getPhotosBrowserSelectionLink(photo, modelType, forObject)}>
            <img
              alt="Photo of Roma Antica - San Francisco, CA, United States. outdoor tater seating, combo rearrangeable table"
              width="226"
              height="226"
              className="photo-box-img"
              src={Photos.getThumbnailUrl(photo)}/>
          </Link>
        </div>

      </li>

    )
  }

  render() {
    const {photosListTask} = this.props;
    const photos = photosListTask.results;

    return (
      <div className="media-landing_gallery photos">
        <ul className="photo-box-grid photo-box-grid--highlight photo-box-grid--small clearfix lightbox-media-parent">
          {photos.map((photo, item) => {
            return this.renderRow(photo)
          })}
        </ul>
      </div>
    );
  }
}


export default F8PhotosCollectionView;
