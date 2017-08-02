import Telescope from '../../../lib'
import React, {Component} from 'react'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class EventsSingleHeaderLeftPanel extends Component {

  renderLeft() {
    return (
      <div className="event-details_photo">

        <div
          className="photo-slideshow photo-slideshow--full-width js-photo-slideshow-event-details lightbox-media-parent">
          <a href="/events/photos/m6DMoCQgtaymmD-lFiadYw?select=t0BezxcOnJDjlg2RfcQI-g"
             className="photo-slideshow_slide">
            <img className="photo-slideshow_image" alt=""
                 src="https://s3-media2.fl.yelpcdn.com/ephoto/t0BezxcOnJDjlg2RfcQI-g/300s.jpg"/>
          </a>

        </div>

      </div>
    )
  }


  renderLineOne() {
    return (
      <li>

        <div className="media-block">

          <div className="media-avatar">
            <span
              id="icon_24X24"
              className="icon icon--24-marker icon--size-24">
    <svg className="icon_svg">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.54 6.08L12 22l3.46-6.92A6.987 6.987 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
</span>

          </div>

          <div className="media-story">
            <div className="media-title">
              <a className="biz-name js-analytics-click"
                 data-analytics-label="biz-name"
                 href="/biz/alameda-county-fairgrounds-pleasanton"
                 data-hovercard-id="xwaLkbW8JhBexhTYljwbGg">
                <span>Alameda County Fairgrounds</span>
              </a>

            </div>
            <div className="biz-rating biz-rating-medium clearfix">


              <div className="i-stars i-stars--small-3-half rating" title="3.5 star rating">
                {/*<img className="offscreen" height="303" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png" width="84" alt="3.5 star rating">*/}
              </div>

              <span className="review-count rating-qualifier">177 reviews</span>

            </div>

            <address>
              4501 Pleasanton Ave
              Pleasanton, CA 94566
            </address>

          </div>

        </div>


      </li>

    )
  }

  renderLineTwo() {
    return (


      <li>

        <div className="media-block">
          <div className="media-avatar">
            <span
              id="icon_24X24"
              className="icon icon--24-reservation icon--size-24">
    <svg className="icon_svg">

    <path
      d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>

    </svg>
</span>
          </div>
          <div className="media-story">
            <div className="event-details_date">
              <div>
                <b>From:</b>
                Friday, Jun 16, 11:00 am
              </div>
              <div>
                <b>To:</b> Sunday, Jul 9, 11:00 pm
              </div>
            </div>

          </div>
        </div>


      </li>

    )
  }


  renderRight() {
    return (
      <div className="card_body">
        <div className="event-details_info">
          <ul className="ylist card_content">

            {this.renderLineOne()}
            {this.renderLineTwo()}

          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (

      <div className="event-details_info-card card card--horizontal">
        <div className="card_photo responsive-hidden-small">

          {this.renderLeft()}

          {this.renderRight()}

        </div>

      </div>


    )
  }
}

export default EventsSingleHeaderLeftPanel;
