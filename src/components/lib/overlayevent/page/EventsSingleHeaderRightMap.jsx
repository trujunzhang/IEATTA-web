import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class EventsSingleHeaderRightMap extends Component {

  render() {
    const {event} = this.props;
    return (
      <div className="showcase-container">

        <div className="showcase-container_inner showcase showcase-3-photo">

          <div className="lightbox-media-parent">
          </div>

        </div>

      </div>
    )
  }

}

export default EventsSingleHeaderRightMap;
