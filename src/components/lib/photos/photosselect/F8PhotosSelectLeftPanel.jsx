import Telescope from '../../index'
import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

class F8PhotosSelectLeftPanel extends Component {

  render() {
    const {photosListTask, selectPhotoIndex, forObject} = this.props;
    const photos = photosListTask.results;

    const currentPhoto = photos[selectPhotoIndex];

    // alt="Photo of Roma Antica - San Francisco, CA, United States"
    const alt = `Photo of ${forObject.displayName}`;

    return (

      <div className="media-details-grid_main">
        <div className="media js-media-photo">

          <img
            alt={alt}
            className="photo-box-img"
            src={Photos.getOriginalUrl(currentPhoto)}/>
        </div>

        <Telescope.components.F8PhotosSelectLeftPanelFooterView {...this.props}/>
        {/*{01-left-footer.html}*/}

      </div>
    );
  }
}


export default F8PhotosSelectLeftPanel;
