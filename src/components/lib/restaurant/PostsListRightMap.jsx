import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

import MarkerClusterGroup from '../../vendor/react-leaflet-markercluster/react-leaflet-markercluster'

const {pushModel} = require('../../../actions').default
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

/**
 * The states were interested in
 */
const {
  VOTE_BUTTON_LIST_UPVOTE,
  VOTE_BUTTON_LIST_DOWNVOTE
} = require('../../../lib/constants').default

const {loadPostsList} = require('../../../actions').default
const {generateMarkers} = require('../../filter/filterPosts').default

class PostsListRightMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers: generateMarkers(props.listContainerTasks, props.listId)
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({
      markers: generateMarkers(nextProps.listContainerTasks, nextProps.listId)
    })
  }

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
            <div className="face face2">
              <a className="ybtn ybtn--primary ybtn--small redo-search">Redo Search in Map</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onMarkerHover() {
    debugger
  }

  renderContent() {

    const {markers} = this.state

    const markersxx = [
      {lat: 49.8397, lng: 24.0297},
      {lat: 52.2297, lng: 21.0122},
      {lat: 51.5074, lng: -0.0901}
    ];

    return (
      <div id="map-container" className="yelp-map-container" data-component-bound="true">
        <Map
          center={markers[1]}
          zoom={18} maxZoom={18}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>

          <MarkerClusterGroup
            markers={markers}
            wrapperOptions={{enableDefaultStyle: true}}
          />
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
const {connect} = require('react-redux')


function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

/**
 * Connect the properties
 */

export default connect(select)(PostsListRightMap)
