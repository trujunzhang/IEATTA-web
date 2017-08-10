import Telescope from '../../../lib'
import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

class F8PhotosSelectLeftPanel extends Component {
  render() {
    const {photos, selectPhotoIndex} = this.props;
    const currentPhoto = photos[selectPhotoIndex];

    return (

      <div className="media-details-grid_main">
        <div className="media js-media-photo">

          <img
            alt="Photo of Roma Antica - San Francisco, CA, United States"
            className="photo-box-img"
            src={Photos.getThumbnailUrl(currentPhoto)}/>
        </div>

        <Telescope.components.F8PhotosSelectLeftPanelFooterView {...this.props}/>
        {/*{01-left-footer.html}*/}

      </div>
    );
  }
}


export default F8PhotosSelectLeftPanel;
