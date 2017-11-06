import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {
  getPhotosBrowserLink,
} from '../../../lib/link'
import {Link} from 'react-router'

class F8SingleHeaderRightPhotosScrollModel extends Component {


  constructor(props) {
    super(props)

    this.state = {
      currentScrollModelObject: Photos.generateScrollPhotoIndex(props, 0)
    }
  }

  renderSeeAll() {
    const {modelType, forObject} = this.props;
    const {photoModelObject} = this.props;

    const photoLength = photoModelObject.total;
    const buttonTitle = photoLength > 0 ?
      `See all ${photoLength}` :
      'No Photos'

    const linkProps = photoLength > 0 ? {to: getPhotosBrowserLink(modelType, forObject)} : {}

    return (
      <div className="showcase-footer-links">
        <Link className="see-more u-pull-right" {...linkProps}>
        <span id="icon_18X18" className="icon icon--18-grid icon--size-18 u-space-r-half">
         <svg className="icon_svg">
              <path d="M10 15v-5h5v5h-5zm0-12h5v5h-5V3zm-7 7h5v5H3v-5zm0-7h5v5H3V3z"/>
        </svg>
        </span>
          {buttonTitle}
        </Link>
      </div>
    )
  }

  render() {
    const {photoModelObject} = this.props;
    const {currentScrollModelObject} = this.state;

    const photoLength = photoModelObject.total;


    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-4-photo">

          {this.renderSeeAll()}

          <div className="lightbox-media-parent">

            <div className="showcase-photos showcase-photos-z-index">

              {currentScrollModelObject.showPhotosIndex.map((position, index) => {
                const item = photoModelObject.photos[position];
                const userId = item.overlay.user.userId;
                return (
                  <Telescope.components.F8SingleHeaderRightPhotoItem
                    key={`${userId}-${position}`}
                    {...this.props}
                    item={item}
                    photoIndex={position}
                    index={index}/>)
              })}

            </div>
          </div>

          {photoLength > 3 ? this.renderLeftIcon() : null}
          {photoLength > 3 ? this.renderRightIcon() : null}

        </div>

      </div>
    )

  }

  onPreIconClick() {
    const _array = Photos.generateScrollPhotoIndex(this.props, -1, this.state.currentScrollModelObject);
    this.setState({currentScrollModelObject: _array})
  }

  renderLeftIcon() {
    const {currentScrollModelObject} = this.state;
    const linkProps = (currentScrollModelObject.haveLeftIcon) ? {onClick: this.onPreIconClick.bind(this)} : {};
    const linkClass = "nav nav-left" + (currentScrollModelObject.haveLeftIcon ? "" : " is-disabled")
    return (
      <div
        {...linkProps}
        className={linkClass}>
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

  onNextIconClick() {
    const _array = Photos.generateScrollPhotoIndex(this.props, 1, this.state.currentScrollModelObject);
    this.setState({currentScrollModelObject: _array})
  }

  renderRightIcon() {
    const {currentScrollModelObject} = this.state;
    const linkProps = (currentScrollModelObject.haveRightIcon) ? {onClick: this.onNextIconClick.bind(this)} : {};
    const linkClass = "nav nav-right" + (currentScrollModelObject.haveRightIcon ? "" : " is-disabled")
    return (
      <div
        {...linkProps}
        className={linkClass}>
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
