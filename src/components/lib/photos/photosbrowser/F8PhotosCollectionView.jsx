import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {withRouter} from 'react-router'
import {getPhotosBrowserSelectionLink} from '../../../../lib/link'
import {Link} from 'react-router'

class F8PhotosCollectionView extends Component {

  renderRow(photo, index) {
    const {forObject, modelType} = this.props;
    // alt={`Photos of ${photo.title}`}
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
        </div>

        {/*{this.renderOverLay(photo, index)}*/}

      </li>

    )
  }


  renderOverLay(photo, index) {
    debugger

    const item = photo;
    const {overlay} = item;
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
            <Link className="photo-desc margin-right-4" to={overlay.linkUrl}>
              {overlay.title}
            </Link>
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
    const {photosListTask} = this.props;
    const photos = photosListTask.results;

    return (
      <div className="media-landing_gallery photos">
        <ul className="photo-box-grid photo-box-grid--highlight photo-box-grid--small clearfix lightbox-media-parent">
          {photos.map((photo, index) => {
            // const xxx = Photos.getPhotoItemInfo(photos)
            return this.renderRow(photo, index)
          })}
        </ul>
      </div>
    );
  }
}


export default withRouter(F8PhotosCollectionView);
