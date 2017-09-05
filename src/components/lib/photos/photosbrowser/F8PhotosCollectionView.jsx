import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {withRouter} from 'react-router'
import {getPhotosBrowserSelectionLink} from '../../../../lib/link'
import {Link} from 'react-router'

class F8PhotosCollectionView extends Component {

  renderRow(photo, index) {
    const {forObject, modelType} = this.props;
    return (
      <li key={photo.id}>
        <div className="photo-box photo-box--interactive">
          <Link to={getPhotosBrowserSelectionLink(photo, modelType, forObject, this.props)}>
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
          {photos.map((photo, index) => {
            return this.renderRow(photo, index)
          })}
        </ul>
      </div>
    );
  }
}


export default withRouter(F8PhotosCollectionView);
