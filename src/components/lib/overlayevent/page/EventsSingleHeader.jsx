import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class EventsSingleHeader extends Component {

  renderTopTitle() {
    return (
      <div className="arrange arrange--12">
        <div className="arrange_unit hidden-non-responsive-block responsive-visible-small-block">

          <div className="photo-box pb-60s">
            <a href="/events/pleasanton-alameda-county-fair-6">
              <img alt="Alameda County Fair" className="photo-box-img" height="60"
                   src="https://s3-media1.fl.yelpcdn.com/ephoto/_b32zWQME-Sk4y60RqvV-g/60s.jpg"
                   width="60"/>
            </a>
          </div>

        </div>
        <div className="arrange_unit arrange_unit--fill">
          <h1>Alameda County Fair</h1>
          <div className="event-details_category-links">
                        <span className="category-str-list">
                    <a href="/events/fremont-ca-us/browse?c=8">Festivals &amp; Fairs</a>
    </span>

          </div>
        </div>
      </div>

    )
  }


  renderBottomLeftPanel() {

  }

  renderBottomRightPanel() {

  }

  render() {
    return (
      <div className="content-container">

        <div className="event-details_header ysection">
          {this.renderTopTitle()}
        </div>


      </div>
    )

  }
}

export default EventsSingleHeader;
