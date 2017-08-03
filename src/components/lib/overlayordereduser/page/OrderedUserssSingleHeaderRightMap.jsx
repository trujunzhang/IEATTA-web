import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class EventsSingleHeaderRightMap extends Component {

  render() {
    const {event} = this.props;
    const {restaurant} = event;
    const latitude = restaurant.geoLocation.latitude;
    const longitude = restaurant.geoLocation.longitude;
    const position = [latitude, longitude];

    return (
      <div className="event-details_map-card">
        <div className="js-map-container yelp-map-container">

          <Map center={position} zoom={18} maxZoom={20}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>

        </div>

      </div>
    )
  }

}

export default EventsSingleHeaderRightMap;
