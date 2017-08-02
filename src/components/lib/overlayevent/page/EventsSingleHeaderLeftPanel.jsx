import Telescope from '../../../lib'
import React, {Component} from 'react'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class EventsSingleHeaderLeftPanel extends Component {

renderLeft(){
return(
  <div class="event-details_photo">
    <div>

      <div class="photo-slideshow photo-slideshow--full-width js-photo-slideshow-event-details lightbox-media-parent">
        <div class="photo-slideshow_slide is-active">
          <div class="photo-slideshow_image photo">
            <a href="/events/photos/m6DMoCQgtaymmD-lFiadYw?select=_b32zWQME-Sk4y60RqvV-g">

              <img alt="" class="photo-box-img" height="226" src="https://s3-media2.fl.yelpcdn.com/ephoto/_b32zWQME-Sk4y60RqvV-g/300s.jpg" width="226"/>
            </a>

          </div>
        </div>
        <a href="/events/photos/m6DMoCQgtaymmD-lFiadYw?select=t0BezxcOnJDjlg2RfcQI-g"
           class="photo-slideshow_slide"
           style="background-image: url(&quot;https://s3-media2.fl.yelpcdn.com/ephoto/t0BezxcOnJDjlg2RfcQI-g/300s.jpg&quot;); display: block; opacity: 0.223522;">
          <img class="photo-slideshow_image" alt=""
               src="https://s3-media2.fl.yelpcdn.com/ephoto/t0BezxcOnJDjlg2RfcQI-g/300s.jpg"/>
        </a>
      </div>
    </div>
  </div>
)
}



  renderRight(){
    return(
      <div class="card_body">
        <div class="event-details_info">
          <ul class="ylist card_content">
            <li>
              <div class="hidden">
              <span>
                <span >4501 Pleasanton Ave</span>
                  <span >Pleasanton</span>,
                  <span >CA</span>
                  <span >94566</span>
              </span>

                <div itemprop="name" content="Alameda County Fairgrounds">
                    <span itemprop="telephone">
        (925) 426-7600
    </span>

                  <div itemprop="url" content="/biz/alameda-county-fairgrounds-pleasanton">

                  </div>

                  <div class="media-block">
                    <div class="media-avatar">
            <span
              id="icon_24X24"
              class="icon icon--24-marker icon--size-24">
    <svg class="icon_svg">

    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.54 6.08L12 22l3.46-6.92A6.987 6.987 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
</span>
                    </div>
                    <div class="media-story">
                      <div class="media-title">
                        <a class="biz-name js-analytics-click"
                           data-analytics-label="biz-name"
                           href="/biz/alameda-county-fairgrounds-pleasanton"
                           data-hovercard-id="xwaLkbW8JhBexhTYljwbGg">
                          <span>Alameda County Fairgrounds</span>
                        </a>

                      </div>
                      <div class="biz-rating biz-rating-medium clearfix">

                        <div class="i-stars i-stars--small-3-half rating" title="3.5 star rating">
                          <img class="offscreen" height="303" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png" width="84" alt="3.5 star rating"/>
                        </div>

                        <span class="review-count rating-qualifier">reviews</span>

                      </div>

                      <span>
                  4501 Pleasanton Ave
                        {/*</br>*/}
                        Pleasanton, CA 94566
                </span>

                      <span class="offscreen">Phone number</span>
                      <span class="biz-phone">(925) 426-7600</span>

                    </div>
                  </div>

            </li>
            <li>
              <div class="media-block">
                <div class="media-avatar">
            <span
              id="icon_24X24"
              class="icon icon--24-reservation icon--size-24">
    <svg class="icon_svg">


    <path
      d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>

    </svg>
</span>
                </div>
                <div class="media-story">
                  <div class="event-details_date">
                    <div>
                      <div itemprop="startDate" content="2017-06-16T11:00:00-07:00">
                        <b>From:</b>
                        Friday, Jun 16, 11:00 am
                      </div>
                      <div>
                        <div itemprop="endDate" content="2017-07-09T23:00:00-07:00">
                          <b>To:</b> Sunday, Jul 9, 11:00 pm
                        </div>
                      </div>
                      <div class="event-details_calendar-export">


                        <div class="dropdown js-dropdown" data-component-bound="true">


                          <div class="dropdown_toggle js-dropdown-toggle" aria-haspopup="true" role="button" tabindex="-1">
                            <a class="dropdown_toggle-action" href="javascript:;">
                              <span class="dropdown_toggle-text js-dropdown-toggle-text" data-dropdown-initial-text="Add to Calendar">Add to Calendar</span>
                              <span
                                id="icon_14X14"
                                class="icon icon--14-triangle-down icon--size-14 icon--currentColor u-triangle-direction-down dropdown_arrow">
    <svg class="icon_svg">

    <path d="M7 9L3.5 5h7L7 9z"/>
    </svg>
</span>
                            </a>
                          </div>

                          <div class="dropdown_menu-container js-dropdown_menu-container">
                            <div class="dropdown_menu js-dropdown-menu">
                              <div class="dropdown_menu-inner">
                                <ul class="dropdown_menu-group" role="menu" aria-hidden="false">
                                  <li class="dropdown_item " role="presentation">
                                    <a class="dropdown_link js-dropdown-link" href="http://www.google.com/calendar/event?action=TEMPLATE&amp;dates=20170616T180000Z%2F20170710T060000Z&amp;details=Get+ready+for+the+Best.+Summer.+Ever.+as+the+2017+Alameda+County+Fair+returns+with+extended+dates%2C+new+rides+and+features%2C+delicious+food+and+an+amazing+concert+series%2C+presented+by+Big+O+Tires.+%0A%0AThis+year+the+fair+will+run+for+20+days%2C+opening+Friday%2C+July+16+and+running+thr%E2%80%A6%0A%0Ahttps%3A%2F%2Fwww.yelp.com%2Fevents%2Fpleasanton-alameda-county-fair-6&amp;location=Alameda+County+Fairgrounds%2C+4501+Pleasanton+Ave%2C+Pleasanton%2C+CA+94566&amp;sprop=name%3AAlameda+County+Fair&amp;sprop=website%3Ahttps%3A%2F%2Fwww.yelp.com%2Fevents%2Fpleasanton-alameda-county-fair-6&amp;text=Alameda+County+Fair" role="menuitem">
        <span class="dropdown_label">
                Google Calendar
        </span>
                                    </a>

                                  </li>
                                  <li class="dropdown_item " role="presentation">
                                    <a class="dropdown_link js-dropdown-link" >
        <span class="dropdown_label">
                iCal / Outlook
        </span>
                                    </a>

                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

            </li>
            <li>
                                            <span class="event-details_ticket-info">

                                              <span
                                                id="icon_24X24"
                                                class="icon icon--24-ticket icon--size-24 u-space-r1">
    <svg class="icon_svg">
    <path
      d="M17.303 6.697a2 2 0 0 1 0-2.83L14.12.687 10.056 4.75l2.122 2.12-1.06 1.062-2.122-2.12-8.31 8.307L3.87 17.3a2 2 0 1 1 2.83 2.83l3.18 3.18 8.31-8.308-2.123-2.12 1.06-1.062 2.122 2.122 4.064-4.066-3.182-3.183a2 2 0 0 1-2.83 0zm-1.59 3.712l-1.06 1.06-2.123-2.124 1.06-1.06 2.122 2.12z"/>
    </svg>
</span>$10.00 - $35.00</span>
              <span class="bullet-before event_ticket-url">
            <a href="https://www.yelp.com/redir?url=http%3A%2F%2Fwww.etix.com%2Fticket%2Fv%2F10432%3Fcobrand%3Dalameda&amp;s=6db4fa344b5920d73937d139a0effbb2c277cb1e9a62ed8abe14694b9aaecc64">Get tickets</a>
        </span>


            </li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (

      <div class="event-details_info-card card card--horizontal">
        <div class="card_photo responsive-hidden-small">

      </div>

  </div>


    )
  }
}

export default EventsSingleHeaderLeftPanel;
