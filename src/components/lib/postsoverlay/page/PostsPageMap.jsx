import Telescope from '../index'
import React, {Component} from 'react'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class PostsPageMap extends Component {

  renderTopMap() {
    const position = [51.505, -0.09]
    return (
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
    )
  }

  renderBottomText() {
    return (
      <ul>
        <li className="u-relative">
                <span aria-hidden="true" id="icon_18X18"
                      className="icon icon--18-marker icon--size-18 u-absolute u-sticky-top">
                  <svg className="icon_svg"></svg>
                </span>
          <a href="/biz_attribute?biz_id=30jrTz8vh1xSXdtXMvt-mA" className="link-more icon-wrapper mapbox-edit">
            <span aria-hidden="true" id="icon_14X14"
                  className="icon icon--14-pencil icon--size-14 icon--linked u-space-r-half">
              <svg className="icon_svg"></svg>
            </span>
            <span>Edit</span>
          </a>
          <div className="map-box-address u-space-l4">
            <strong className="street-address">
              <address>
                5583 W Pico Blvd<br>Los Angeles, CA 90019<br>United States
              </address>
            </strong>

            <span className="neighborhood-str-list">
            Mid-Wilshire
            </span>
          </div>

        </li>

        <li className="clearfix">
          <div>
            <span aria-hidden="true" id="icon_18X18"
                  className="icon icon--18-directions icon--size-18">
              <svg className="icon_svg">    </svg>
            </span>
            <a href="/map/my-two-cents-los-angeles-3" className="biz-directions" data-component-bound="true">
              Get Directions
            </a>
          </div>
        </li>

        <li>
          <span aria-hidden="true" id="icon_18X18"
                className="icon icon--18-phone icon--size-18">
            <svg className="icon_svg">       </svg>
          </span>

          <span className="offscreen">Phone number</span>
          <span className="biz-phone">
            +1-323-879-9881
          </span>

        </li>

        <li>
          <span aria-hidden="true" id="icon_18X18"
                className="icon icon--18-external-link icon--size-18">
            <svg className="icon_svg"></svg>
          </span>
          <span className="biz-website js-add-url-tagging">
        <span className="offscreen">Business website</span>
            <a
              href="/biz_redir?url=http%3A%2F%2Fmytwocentsla.com&amp;website_link_type=website&amp;src_bizid=30jrTz8vh1xSXdtXMvt-mA&amp;cachebuster=1498738995&amp;s=b88bfcfa386b1918b6a7e82a589b0d4df0dcac7e0f93a1523df7d4e97086925e"
              target="_blank" rel="noopener nofollow">mytwocentsla.com</a>
          </span>

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

export default PostsPageMap
