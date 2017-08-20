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

  render() {
    const {object} = this.state;
    if (!object.singleModel) {
      return (
        <Telescope.components.F8SingleHeaderRightPhotosSingleModel {...this.props} {...this.state}/>
      )
    }

    return null;
  }
}

export default F8SingleHeaderRightPhotos;
