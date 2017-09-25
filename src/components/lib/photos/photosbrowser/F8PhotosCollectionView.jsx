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

  constructor(props) {
    super(props);

    this.state = this.initialState = {
      showRemoveConfirmDialog: false,
      // showRemoveConfirmDialog: true,
      onShowRemoveConfirmDialogPress: this.onShowRemoveConfirmDialogPress,
    }
  }

  onShowRemoveConfirmDialogPress = () => {
    this.setState({
      showRemoveConfirmDialog: true
    })
  }

  onCloseRemoveConfirmDialogPress = () => {
    this.setState({
      showRemoveConfirmDialog: false
    })
  }

  onConfirmDeletePhoto = () => {

  }

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
                key={photo.id}
                {...this.state}
                {...this.props}
                photoInfo={photoInfo} photo={photo} index={index}/>
            )
          })}
        </ul>
        {
          this.state.showRemoveConfirmDialog &&
          <div className="body-overlay" style={{"display": "block"}}/>
        }
        {
          this.state.showRemoveConfirmDialog && this.renderRemoveConfirmDialog()
        }
      </div>
    )
  }

  renderRemoveConfirmDialog() {
    const width = 960;//window.innerWidth;
    const left = (width - 427) / 2;

    return (
      <div className="ypop" id="delete-photo-popup" style={{"position": "absolute", "left": left, "top": "50px"}}>
        <div className="ypop-content clearfix" id="delete-review-draft-popup-content">
          <div className="ypop-title" id="delete-review-draft-popup-title">
            <div onClick={this.onCloseRemoveConfirmDialogPress} className="ypop-close">×</div>
            <h2>Confirmation</h2></div>
          <div className="ypop-inner clearfix" id="delete-review-draft-popup-inner">
            Are you sure you would like to delete this photo?
          </div>
          <div className="ypop-footer clearfix" id="delete-review-draft-popup-footer">
            <div className="ypop-buttons">
              <button
                onClick={this.onConfirmDeletePhoto}
                type="submit" value="submit" className="ybtn ybtn-primary ybtn-small">
                <span>Yes</span>
              </button>
              <a onClick={this.onCloseRemoveConfirmDialogPress}>No</a>
            </div>
          </div>
          <a
            className="offscreen ypop-close-offscreen">Close popup</a></div>
      </div>

    )
  }
}


export default withRouter(F8PhotosCollectionView);
