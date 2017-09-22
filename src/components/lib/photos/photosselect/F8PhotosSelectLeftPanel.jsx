import Telescope from '../../index'
import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

class F8PhotosSelectLeftPanel extends Component {

  render() {
    const {photosListTask, selectPhotoIndex, forObject} = this.props;
    const photos = photosListTask.results;

    const currentPhoto = photos[selectPhotoIndex];
    const alt = `Photo of ${forObject.displayName}`;

    const haveNextIcon = (selectPhotoIndex < photos.length - 1)
    const linkProps = (haveNextIcon) ? {onClick: this.props.onNextIconClick} : {};

    return (
      <div className="media-details-grid_main">
        <div className="media js-media-photo">
          <a {...linkProps}>
            <img
              key={alt}
              alt={alt}
              className="photo-box-img"
              src={Photos.getOriginalUrl(currentPhoto)}/>
          </a>
        </div>

        <Telescope.components.F8PhotosSelectLeftPanelFooterView {...this.props}/>
        {/*{01-left-footer.html}*/}

      </div>
    );
  }
}


export default F8PhotosSelectLeftPanel;
