import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from '../../../lib/link'
import {Link} from 'react-router'

class F8SingleHeaderRightPhotosScrollModel extends Component {


  renderSeeAll() {
    const {photoModelObject} = this.props;

    return (
      <div className="js-photo photo photo-3 photo-grid">

        <div className="showcase-photo-box">
        </div>

        {this.renderSeeAllButton()}

      </div>

    )
  }

  renderSeeAllButton() {
    const {modelType, forObject} = this.props;
    const {photoModelObject} = this.props;

    return (
      <div className="see-more show-all-overlay">
        <Link className="show-all-photos"
              to={getPhotosBrowserLink(modelType, forObject)}>
                    <span id="icon_24X24"
                          style={{display: 'block'}}
                          className="icon icon--24-grid icon--size-24 icon--inverse icon--fallback-inverted show-all-overlay_icon">
                    <svg className="icon_svg">
                      <path d="M13 21v-8h8v8h-8zm0-18h8v8h-8V3zM3 13h8v8H3v-8zM3 3h8v8H3V3z"/>
                    </svg>
                  </span>
          {`See all ${photoModelObject.total}`}
        </Link>
      </div>
    )
  }

  render() {
    const {photoModelObject} = this.props;

    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-3-photo">

          <div className="lightbox-media-parent">

            <div className="showcase-photos showcase-photos-z-index">

              {photoModelObject.photos.map((item, index) => {
                return (<div></div>)
              })}
              {this.renderSeeAll()}

            </div>
          </div>

        </div>

      </div>
    )

  }

}

export default F8SingleHeaderRightPhotosScrollModel;
