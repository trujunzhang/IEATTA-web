import Telescope from '../../../lib'
import React, {Component} from 'react'

const {
  invokeParseCloudMethod
} = require('../../../../actions').default

const {
  CLOUD_RESTAURANT_ADDRESS,
  RESTAURANT_CLOUD_ADDRESS_MODEL
} = require('../../../../lib/constants').default

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class ExtendedMarker extends Marker {
  componentWillReceiveProps(nextProps) {
    this.leafletElement.openPopup();
  }

  componentDidMount() {
    // Call the Marker class componentDidMount (to make sure everything behaves as normal)
    super.componentDidMount();

    // Access the marker element and open the popup.
    this.leafletElement.openPopup();
  }
}

class RestaurantsFixMapMarker extends Component {

  constructor(props) {
    super(props);

    const {forObject} = props,
      {geoLocation} = forObject,
      {latitude, longitude} = geoLocation;
    const position = [latitude, longitude];

    this.state = this.initialState = {
      position: position
    }
  }

  fixedMapDragend(e) {
    const target = e.target;
    const location = target.getLatLng();
    this.setState({position: [location.lat, location.lng]})

    this.props.dispatch(
      invokeParseCloudMethod(
        CLOUD_RESTAURANT_ADDRESS,
        {
          lat: location.lat,
          lng: location.lng
        },
        this.props.forObject.id,
        RESTAURANT_CLOUD_ADDRESS_MODEL
      )
    )
  }

  renderCloseIcon() {
    return (
      <a
        onClick={this.props.onCloseFixMapMaker}
        className="offscreen ypop-close-offscreen">
        {"Close popup"}
      </a>
    )
  }


  renderTitle() {
    return (
      <div className="ypop-title" id="locate-biz-pop-title">
        <div
          onClick={this.props.onCloseFixMapMaker}
          className="ypop-close">
          {"×"}
        </div>
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
          <a onClick={this.props.onCloseFixMapMaker}>
            {"Cancel"}
          </a>
        </div>
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
        <ExtendedMarker
          ref='fixedMapMaker'
          draggable={true}
          onMoveend={this.fixedMapDragend.bind(this)}
          position={position}>
          <Popup>
            <span>{forObject.displayName}<br/>{forObject.address}</span>
          </Popup>
        </ExtendedMarker>
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
      <div className="ypop" id="locate-biz-pop" style={{"position": 'relative', "top": "-400px"}}>
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
