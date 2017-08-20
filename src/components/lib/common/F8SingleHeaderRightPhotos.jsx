import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from '../../../lib/link'
import {Link} from 'react-router'

class F8SingleHeaderRightPhotos extends Component {

  constructor(props) {
    super(props)

    this.state = {
      photoModelObject: Photos.generateHeaderRightPhotoObject(props)
    }
  }

  render() {
    const {photoModelObject} = this.state;
    if (!photoModelObject.singleModel) {
      return (
        <Telescope.components.F8SingleHeaderRightPhotosSingleModel {...this.props} {...this.state}/>
      )
    }

    return (<Telescope.components.F8SingleHeaderRightPhotosScrollModel {...this.props} {...this.state}/>)
  }
}

export default F8SingleHeaderRightPhotos;
