import Telescope from '../../../lib'
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
              <address>
                {/*{'5583 W Pico Blvd'}<br>{'Los Angeles, CA 90019'}<br>{'United States'}*/}
              </address>
            </strong>

            <span className="neighborhood-str-list">
              {'Mid-Wilshire'}
            </span>
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
            <a href="/map/my-two-cents-los-angeles-3" className="biz-directions" data-component-bound="true">
              Get Directions
            </a>
          </div>
        </li>

        <li>
          <span aria-hidden="true" id="icon_18X18"
                className="icon icon--18-phone icon--size-18">
            <svg className="icon_svg">
              <path
                d="M15.862 12.526l-2.91-1.68a.442.442 0 0 0-.486.087l-1.58 1.687a.857.857 0 0 1-.52.232s-1.083.03-3.13-1.985c-2.046-2.015-2.054-3.12-2.054-3.12 0-.17.094-.41.21-.533L6.85 5.656a.49.49 0 0 0 .08-.504L5.295 2.14c-.073-.155-.228-.18-.345-.058L2.26 4.924a1.07 1.07 0 0 0-.248.53s-.34 2.927 3.75 6.955c4.093 4.025 6.96 3.59 6.96 3.59.167-.027.4-.148.516-.27l2.684-2.845c.117-.123.09-.285-.062-.36z"/>
            </svg>
          </span>

          <span className="offscreen">Phone number</span>
          <span className="biz-phone">
            +1-323-879-9881
          </span>

        </li>

        <li>
          <span aria-hidden="true" id="icon_18X18"
                className="icon icon--18-external-link icon--size-18">
            <svg className="icon_svg">
              <path
                d="M14 15H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3v1H4v10h10v-3h1v3c0 .55-.45 1-1 1zm-5.12-4.465L7.463 9.12l3.83-3.827L9 3h6v6l-2.293-2.293-3.828 3.828z"/>
            </svg>
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
