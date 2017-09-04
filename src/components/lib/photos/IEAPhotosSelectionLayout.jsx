import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import Photos from '../../../lib/photos'

import {Link} from 'react-router'

import {getPhotoSelectBackLink} from '../../../lib/link'

class IEAPhotosSelectionLayout extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {
      selectedPhotoInfo: Photos.generateSelectedPhotoInfo(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPhotoInfo: Photos.generateSelectedPhotoInfo(nextProps)
    })
  }

  renderCloseButton() {
    const {modelType, forObject, pageForm} = this.props;
    return (
      <Link className="lightbox-close" to={getPhotoSelectBackLink(pageForm, modelType, forObject)}>
        {'Close'}
        <span className="icon icon--24-close icon--size-24 icon--currentColor u-space-l-half"
              id="icon_24X24">
        <svg className="icon_svg">
       <path
         d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"/>
        </svg>
      </span>

      </Link>
    )
  }

  renderContent() {
    return (
      <div className="media-lightbox">
        <div className="media-details js-media-details js-media-details-template">

          <Telescope.components.F8PhotosSelectPage {...this.props} {...this.state}/>

        </div>
      </div>

    )
  }

  render() {
    return (
      <div id="lightbox" className="lightbox is-enabled lightbox--media-details">
        <div id="lightbox-inner" className="lightbox-inner">
          {this.renderCloseButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}


export default IEAPhotosSelectionLayout;
