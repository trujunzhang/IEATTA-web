import Telescope from '../../index'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'
import Events from '../../../../lib/events'

import {getEventLink} from '../../../../lib/link'
import {withRouter} from 'react-router'

import {Link} from 'react-router'

const {
  EVENTS_LIST_FOR_USER,
  PARSE_EVENTS,
  PARSE_RESTAURANTS,
} = require('../../../../lib/constants').default

class EventsItem extends Component {

  renderLeft() {
    return (
      <Telescope.components.F8ImagesSlideShowView
        altValue={this.props.event.restaurant}
        forObject={this.props.event.restaurant}
        objectSchemaName={PARSE_RESTAURANTS}
        imageSize={90}
        {...this.props}/>
    )
  }

  renderLeftxxx() {
    return (
      <div className="media-avatar">
        <div className="photo-box pb-120s">
          <Link to={getEventLink(this.props.event)}>
            <Telescope.components.F8PlaceHolderImage
              alt={this.props.event.restaurant.displayName}
              className="photo-box-img"
              width="120"
              height="120"
              placeholderSource={"/default/blank_biz_small.png"}
              source={Photos.getListThumbnailUrl(this.props.event.restaurant)}/>
          </Link>
        </div>
      </div>

    )
  }

  renderStory() {
    const {event, index} = this.props;
    const info = Events.getDateInfo(event);
    const htmlBody = Events.getWantBody(event);

    return (
      <div className="media-story u-space-l1">
        <h3>
          <Link to={getEventLink(event)}>
            {`${index + 1}. ${event.displayName}`}
          </Link>
        </h3>
        <div>
          <div className="u-text-truncate u-space-b1 u-space-t1">
               <span id="icon_24X24" className="icon icon--24-reservation icon--size-24">
                        <svg className="icon_svg">
                                <path
                                  d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>
                        </svg>
               </span>
            {`${info.startFormat} - ${info.endFormat}`}
          </div>
          <div className="u-text-truncate u-space-b1">
                <span id="icon_24X24" className="icon icon--24-marker icon--size-24">
                    <svg className="icon_svg">
                           <path
                             d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.54 6.08L12 22l3.46-6.92A6.987 6.987 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                </span>
            {"Location — " + event.restaurant.address}
          </div>

          <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>


        </div>
      </div>
    )
  }

  render() {
    const {event, eventType} = this.props;

    return (
      <li key={event.id}>
        <div className="media-block">
          {eventType === EVENTS_LIST_FOR_USER && this.renderLeft()}
          {this.renderStory()}
        </div>

      </li>
    )
  }
}


const {connect} = require('react-redux')

export default withRouter(connect()(EventsItem))
