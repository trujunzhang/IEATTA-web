import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from '../../../lib/link'
import {Link} from 'react-router'

class F8SingleHeaderRightPhotos extends Component {


  constructor(props) {
    super(props)

    this.state = {
      object: Photos.generateHeaderRightPhotoObject(props)
    }
  }


  renderSeeAll() {
    const {object} = this.state;
    const {photosWall} = object;

    return (
      <div className="js-photo photo photo-3 photo-grid">

        <div className="showcase-photo-box">

          {object.photosWall.map((item, index) => {
            return (
              <Link to={item.url}>

                <img alt="Photo of My Two Cents - Los Angeles, CA, United States. Desserts"
                     className="photo-box-img"
                     width="250"
                     height="250"
                     src={item.imageUrl}/>
              </Link>
            )
          })}
        </div>

        {this.renderSeeAllButton()}

      </div>

    )
  }

  renderSeeAllButton() {
    const {modelType, forObject} = this.props;
    const {object} = this.state;

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
          {`See all ${object.total}`}
        </Link>
      </div>
    )
  }

  render() {
    const {object} = this.state;
    if (!object.singleModel) {
      return this.renderSingleModel()
    }

    return null;
  }

  renderHorizonScrollModel(){
    return(

    )
  }

  renderSingleModel() {
    const {object} = this.state;

    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-3-photo">

          <div className="lightbox-media-parent">

            <div className="showcase-photos showcase-photos-z-index">

              {object.photos.map((item, index) => {
                return this.renderPhotoItem(item, index + 1)
              })}
              {this.renderSeeAll()}

            </div>
          </div>

        </div>

      </div>
    )

  }


  renderPhotoItem(object, index) {
    const {overlay} = object;
    return (
      <div key={index} className={`js-photo photo photo-${index}`}>
        <div className="showcase-photo-box">

          <Link to={object.url}>
            <img
              alt="Photo of My Two Cents - Los Angeles, CA, United States. BBQ fried chicken with fries and sweet potato crumble"
              className="photo-box-img"
              width="250"
              height="250"
              src={object.imageUrl}/>
          </Link>

        </div>


        <div className="photo-box-overlay js-overlay">
          <div className="media-block photo-box-overlay_caption">
            <div className="media-avatar avatar">
              <div className="photo-box pb-30s">

                <Link
                  to={overlay.user.userProfileUrl}
                  className="js-analytics-click">
                  <img alt="Joshua H."
                       className="photo-box-img"
                       width="30"
                       height="30"
                       src={overlay.user.imageUrl}
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
                      to={overlay.user.userProfileUrl}
                      id="dropdown_user-name">
                          {overlay.user.username}
                        </Link>
                </span>
            </div>

          </div>
        </div>

      </div>

    )
  }

}

export default F8SingleHeaderRightPhotos;
