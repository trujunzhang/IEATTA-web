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

    return (
      <div className="content-container" style={{height: '184px'}}>

        <div className="user-profile_content-wrapper arrange arrange--bottom arrange--30">
          <div className="user-profile_avatar-dummy arrange_unit"/>
          {this.renderColumnOne()}
        </div>


        <div className={"ordered-user-profile"}>
          <div className="user-profile_container">

            <div className={"user-profile_avatar"}>
              <div
                className="photo-slideshow photo-slideshow--full-width photo-slideshow--rounded js-photo-slideshow-user-details">
                <Telescope.components.F8PlaceHolderImage
                  alt={forObject.restaurant.displayName}
                  className="photo-box-img"
                  width={250}
                  height={250}
                  placeholderSource={"/default/blank_biz_large.png"}
                  source={Photos.getListThumbnailUrl(forObject.restaurant)}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    )

  }
}

export default OrderedUserInEventHeaderView;
