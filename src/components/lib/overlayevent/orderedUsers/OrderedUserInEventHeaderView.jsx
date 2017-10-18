import Telescope from '../../../lib'
import React, {Component} from 'react'

import Photos from '../../../../lib/photos'

class OrderedUserInEventHeaderView extends Component {
  renderColumnOne() {
    const {forObject} = this.props;

    return (
      <div className="user-profile_info arrange_unit">
        <h1>{forObject.displayName}</h1>
        <h3 className="user-location alternate">{forObject.displayName}</h3>
      </div>

    )
  }

  render() {
    const {forObject} = this.props;
    debugger

    return (
      <div className="content-container" style={{height: '184px'}}>

        <div className="user-profile_content-wrapper arrange arrange--bottom arrange--30">
          <div className="user-profile_avatar-dummy arrange_unit"/>
          {this.renderColumnOne()}
        </div>

        <div className="forObject-details_photo">
          <div
            className="photo-slideshow photo-slideshow--full-width js-photo-slideshow-forObject-details lightbox-media-parent">

            <Telescope.components.F8PlaceHolderImage
              alt={forObject.restaurant.displayName}
              className="photo-box-img"
              width={300}
              height={300}
              placeholderSource={"/default/blank_biz_large.png"}
              source={Photos.getListThumbnailUrl(forObject.restaurant)}/>
          </div>

        </div>

      </div>
    )

  }
}

export default OrderedUserInEventHeaderView;
