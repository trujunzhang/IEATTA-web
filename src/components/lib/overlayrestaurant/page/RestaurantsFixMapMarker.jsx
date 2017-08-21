import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class RestaurantsFixMapMarker extends Component {


  constructor(props) {
    super(props);

    const {forObject} = props,
      {geoLocation} = forObject,
      {latitude, longitude} = geoLocation;
    const position = [latitude, longitude];

    this.state = this.initialState = {
      position: position
    };
  }

  fixedMapDragend(e) {
    const target = e.target;
    const location = target.getLatLng()
    this.setState({position: location})
  }

  renderCloseIcon() {
    return (
      <a className="offscreen ypop-close-offscreen">Close popup</a>
    )
  }


  renderTitle() {
    return (
      <div className="ypop-title" id="locate-biz-pop-title">
        <div className="ypop-close">×</div>
        <h2>Move map marker</h2>
      </div>
    )
  }


  renderHint() {
    return (
      <div className="map-popup-info google-map">
        <p>
          Drag and drop the map marker to correct the location.
          <br/>
          Use the tools in the map to zoom in for a closer look at the map.
        </p>
      </div>
    )
  }

  renderFooter() {
    return (
      <div className="ypop-footer clearfix" id="locate-biz-pop-footer">
        <div className="ypop-status"></div>
        <div className="ypop-buttons">
          <button type="submit" value="submit" className="ybtn ybtn-primary ybtn-small">
            <span>
              {"Save Changes"}
          </span>
          </button>
          <a href="#">Cancel</a></div>
      </div>
    )
  }


  renderTopMap() {
    const {forObject} = this.props;
    const {position} = this.state;
    return (
      <Map
        ref='fixedMap'
        center={position} zoom={18} maxZoom={28}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker
          draggable={true}
          onMoveend={this.fixedMapDragend.bind(this)}
          position={position}>
          <Popup>
            <span>{forObject.displayName}<br/>{forObject.address}</span>
          </Popup>
        </Marker>
      </Map>
    )
  }

  renderContent() {
    return (
      <div className="ypop-inner clearfix" id="locate-biz-pop-inner">
        <div className="map-popup-container hidden" style={{"display": "block"}}>

          {this.renderHint()}

          <div className="popup-map">
            {this.renderTopMap()}
          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="ypop" id="locate-biz-pop">
        <div className="ypop-content clearfix" id="locate-biz-pop-content">

          {this.renderCloseIcon()}
          {this.renderTitle()}

          {this.renderContent()}

          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default RestaurantsFixMapMarker;
