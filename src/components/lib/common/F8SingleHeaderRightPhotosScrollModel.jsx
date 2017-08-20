import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from '../../../lib/link'
import {Link} from 'react-router'

class F8SingleHeaderRightPhotosScrollModel extends Component {


  constructor(props) {
    super(props)


    const _array = Photos.generateScrollPhotoIndex(props, 0);

    this.state = {
      currentScrollModelObject: _array
    }
  }


  renderSeeAll() {
    const {modelType, forObject} = this.props;
    const {photoModelObject} = this.props;

    return (
      <div className="showcase-footer-links">
        <Link className="see-more u-pull-right" to={getPhotosBrowserLink(modelType, forObject)}>
        <span
          id="icon_18X18"
          className="icon icon--18-grid icon--size-18 u-space-r-half">
    <svg className="icon_svg">
    <path d="M10 15v-5h5v5h-5zm0-12h5v5h-5V3zm-7 7h5v5H3v-5zm0-7h5v5H3V3z"/>
    </svg>
</span>
          {`See all ${photoModelObject.total}`}
        </Link>

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
                    <span
                      id="icon_24X24"
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
    const {currentScrollModelObject} = this.state;

    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-4-photo">

          {this.renderSeeAll()}

          <div className="lightbox-media-parent">

            <div className="showcase-photos showcase-photos-z-index">

              {currentScrollModelObject.showPhotosIndex.map((position, index) => {
                const item = photoModelObject.photos[position];
                return (<Telescope.components.F8SingleHeaderRightPhotoItem item={item} index={index}/>)
              })}

            </div>
          </div>

        </div>

      </div>
    )

  }

  renderLeftIcon() {
    return (
      <div className="nav nav-left">
        <div className="arrow">
        <span className="icon icon--48-chevron-left icon--size-48 icon--inverse icon--fallback-inverted"
              id="icon_48X48">
          <svg className="icon_svg">
    <path
      d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"/>
          </svg>
        </span>
        </div>
      </div>
    )
  }


  renderRightIcon() {
    return (
      <div className="nav nav-right">
        <div className="arrow">
        <span className="icon icon--48-chevron-right icon--size-48 icon--inverse icon--fallback-inverted"
              id="icon_48X48">
        <svg className="icon_svg">
    <path
      d="M18.586 42.008a2.518 2.518 0 0 1-1.614-.588c-1.115-.925-1.296-2.613-.404-3.77L27.098 24l-10.53-13.65c-.892-1.156-.71-2.844.404-3.77 1.116-.924 2.743-.737 3.635.42L32.43 22.325a2.76 2.76 0 0 1 0 3.35L20.606 41.002a2.548 2.548 0 0 1-2.02 1.008z"/>
        </svg>
        </span>
        </div>
      </div>
    )
  }

}

export default F8SingleHeaderRightPhotosScrollModel;
