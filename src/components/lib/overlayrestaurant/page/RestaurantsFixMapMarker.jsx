import Telescope from '../../../lib'
import React, {Component} from 'react'

const {
  invokeParseCloudMethod
} = require('../../../../actions').default

const {
  getModelByObjectId,
} = require('../../../filter/filterPosts')

const {
  CLOUD_RESTAURANT_ADDRESS,
  RESTAURANT_CLOUD_ADDRESS_MODEL
} = require('../../../../lib/constants').default

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class RestaurantsFixMapMarker extends Component {

  constructor(props) {
    super(props);

    const latitude = props.editModel.form.fields.latitude,
      longitude = props.editModel.form.fields.longitude;
    const position = [latitude, longitude];

    this.state = this.initialState = {
      popTitle: props.editModel.form.fields.displayName,
      currentZoom: 18,
      currentAddress: props.editModel.form.fields.address,
      googleAddressReverse: null,
      position: position,
    }
  }

  componentWillReceiveProps(nextProps) {
    const newAddress = getModelByObjectId(nextProps, nextProps.forObject.id, this.state.googleAddressReverse, 'googleAddressReverse');

    if (!!newAddress) {
      this.setState({
        popTitle: 'Changed Address:',
        // Detailed object
        currentAddress: newAddress.address,
        googleAddressReverse: newAddress
      })

    }
  }


  fixedMapDragend(e) {
    const target = e.target;
    const location = target.getLatLng();

    this._updateGoogleAddress(location)
  }

  _updateGoogleAddress(location) {
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

  saveGoogleAddress() {
    const newAddress = {
      ...this.state.googleAddressReverse,
      geoLocation: {
        latitude: this.state.position[0],
        longitude: this.state.position[1]
      }
    }
    this.props.actions.onRestaurantFormAddressFieldChange(newAddress)
    this.props.onCloseFixMapMaker()
  }

  renderFooter() {
    const saveEnabled = !!this.state.googleAddressReverse;
    return (
      <div className="ypop-footer clearfix" id="locate-biz-pop-footer">
        <div className="ypop-buttons" id="fix-new-restaurant-address">
          <button type="submit"
                  onClick={this.saveGoogleAddress.bind(this)}
                  disabled={!saveEnabled}
                  value="submit" className="ybtn ybtn-primary ybtn-small">
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

  onZoomChanged(e) {
    this.setState({currentZoom: e.target.getZoom()})
  }

  onMapPress(e) {
    this._updateGoogleAddress(e.latlng)
  }

  renderTopMap() {
    const {position, currentZoom, currentAddress, popTitle} = this.state;

    return (
      <Map center={position}
           onClick={this.onMapPress.bind(this)}
           onZoom={this.onZoomChanged.bind(this)}
           zoom={currentZoom} maxZoom={30}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Telescope.components.ExtendedMarker
          draggable={true}
          onMoveend={this.fixedMapDragend.bind(this)}
          position={position}>
          <Popup>
            <span>{popTitle}<br/>{currentAddress}</span>
          </Popup>
        </Telescope.components.ExtendedMarker>
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
