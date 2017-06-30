import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

const {pushModel} = require('../../../actions').default
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

/**
 * The states were interested in
 */
const {
  VOTE_BUTTON_LIST_UPVOTE,
  VOTE_BUTTON_LIST_DOWNVOTE
} = require('../../../lib/constants').default

class PostsItemMap extends Component {

  renderHeader() {
    return (
      <div className="map-header clearfix">
        <a className="mo-map-trigger">
            <span aria-hidden="true" id="icon_24X24"
                  className="icon icon--24-chevron-left icon--size-24 mo-map-icon">
              <svg className="icon_svg">
                <path d="M14.475 18.364l1.414-1.414L10.94 12l4.95-4.95-1.415-1.414L8.11 12l6.365 6.364z"/>
              </svg>
            </span>
          <span className="js-mo-map-label">Less Map</span>
        </a>

        <div className="cube-wrapper">
          <div className="cube show-face2">
            {/*<div className="face face1" style="display: none;">*/}
            {/*<label>*/}
            {/*<input className="js-redo-search-checkbox" type="checkbox"/>*/}
            {/*{'Redo search when map moved'}*/}
            {/*</label>*/}
            {/*</div>*/}
            <div className="face face2">
              <a className="ybtn ybtn--primary ybtn--small redo-search">Redo Search in Map</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderContent() {
    const position = [51.505, -0.09]
    return (
      <div id="map-container" className="yelp-map-container" data-component-bound="true">
        <Map center={position} zoom={13}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <Marker position={position}>
            <Popup >
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }

  render() {

    return (
      <div className="map-wrapper">
        <div className="search-map transform-style-support" data-component-bound="true">
          {this.renderHeader()}
          {this.renderContent()}
        </div>
      </div>
    )
  }

}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(PostsItemMap)

