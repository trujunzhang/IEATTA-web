import Telescope from '../../../lib'
import React, {Component} from 'react'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class RestaurantsPageMap extends Component {

  renderTopMap() {
    const {restaurant} = this.props;
    const latitude = restaurant.geoLocation.latitude;
    const longitude = restaurant.geoLocation.longitude;
    const position = [latitude, longitude]
    return (
      <Map center={position} zoom={10} maxZoom={10}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    )
  }

  renderBottomText() {
    const {restaurant} = this.props;
    const rows = restaurant.address.split(',')
    return (
      <ul>
        <li className="u-relative">
          <span aria-hidden="true" id="icon_18X18"
                className="icon icon--18-marker icon--size-18 u-absolute u-sticky-top">
            <svg className="icon_svg">
              <path
                d="M14 7A5 5 0 0 0 4 7c0 1.97 1.15 3.658 2.806 4.472h-.17L9 16l2.363-4.528h-.17C12.85 10.658 14 8.97 14 7zM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
            </svg>
          </span>
          <a href="/biz_attribute?biz_id=30jrTz8vh1xSXdtXMvt-mA" className="link-more icon-wrapper mapbox-edit">
            <span aria-hidden="true" id="icon_14X14"
                  className="icon icon--14-pencil icon--size-14 icon--linked u-space-r-half">
              <svg className="icon_svg">
                <path
                  d="M12.95 3.05c0-.512-.195-1.023-.586-1.414a1.996 1.996 0 0 0-2.83 0L8.122 3.05 2.465 8.707 1.05 12.95l4.243-1.414L10.95 5.88l1.414-1.416c.39-.39.586-.902.586-1.414zm-8.197 7.61l-2.122.71.71-2.123 5.49-5.49 1.415 1.415-5.49 5.49z"/>
              </svg>
            </span>
            <span>Edit</span>
          </a>
          <div className="map-box-address u-space-l4">
            <strong className="street-address">
              {rows.map((item, index) => {
                return (<div>{item}</div>)
              })}
            </strong>
          </div>

        </li>

        <li className="clearfix">
          <div>
            <span aria-hidden="true" id="icon_18X18"
                  className="icon icon--18-directions icon--size-18">
              <svg className="icon_svg">
                <path
                  d="M16.444 7.556l-5.957-5.958a2.145 2.145 0 0 0-3.034 0L1.598 7.453a2.145 2.145 0 0 0 0 3.034l5.958 5.957a2 2 0 0 0 2.828 0l6.06-6.06a2 2 0 0 0 0-2.828zM9.97 11.47v-2.5h-3v3h-1v-4h4v-2.5l3 3-3 3z"/>
              </svg>
            </span>
            <a className="biz-directions">
              Get Directions
            </a>
          </div>
        </li>


      </ul>
    )
  }

  render() {
    return (
      <div className="mapbox"
           data-lightbox-page-title="Directions - My Two Cents - Mid-Wilshire - Los Angeles, CA, United States"
           data-map-library="google" data-component-bound="true">
        <div className="mapbox-map">
          {this.renderTopMap()}
        </div>

        <div className="mapbox-text">
          {this.renderBottomText()}
        </div>

      </div>
    )
  }
}

export default RestaurantsPageMap;