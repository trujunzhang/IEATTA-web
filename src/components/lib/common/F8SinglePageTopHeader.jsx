import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {
  getNewReviewLink
} from '../../../lib/link'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {Link} from 'react-router'

class F8SinglePageTopHeader extends Component {

  render() {
    return (
      <div className="biz-page-header clearfix">

        <Telescope.components.F8SinglePageHeaderTopLeftPanel  {...this.props}/>

        <div className="biz-page-header-right u-relative">
          <Telescope.components.F8SinglePageHeaderButtonsSection {...this.props}/>
        </div>
      </div>
    )
  }

}

export default F8SinglePageTopHeader;
