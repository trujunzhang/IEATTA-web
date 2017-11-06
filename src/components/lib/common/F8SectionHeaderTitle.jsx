import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class F8SectionHeaderTitle extends Component {
  render() {
    const {
      title,
      subTitle = ""
    } = this.props;

    return (
      <div className="arrange arrange--12 arrange--baseline">

        <div className="arrange_unit nowrap">
          <h3 className="subscribe-list_title">{title}</h3>
        </div>

        <div className="arrange_unit arrange_unit--fill">
          <span>{subTitle}</span>
        </div>

      </div>

    )
  }

}

export default F8SectionHeaderTitle;
