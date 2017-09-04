import Telescope from '../index'
import React, {Component} from 'react'

import {Link} from 'react-router'

class F8SingleHeaderRightPhotoItem extends Component {

  render() {
    const {item, index} = this.props;
    const {overlay} = item;
    // alt="Photo of My Two Cents - Los Angeles, CA, United States. BBQ fried chicken with fries and sweet potato crumble"
    return (
      <div key={index} className={`js-photo photo photo-${index + 1}`}>
        <div className="showcase-photo-box">

          <Link to={item.url}>
            <img
              alt={`Photos of ${overlay.title}`}
              className="photo-box-img"
              width="250"
              height="250"
              src={item.imageUrl}/>
          </Link>

        </div>


        <div className="photo-box-overlay js-overlay">
          <div className="media-block photo-box-overlay_caption">
            <div className="media-avatar avatar">
              <div className="photo-box pb-30s">

                <Link to={overlay.user.userProfileUrl} className="js-analytics-click">

                  <Telescope.components.F8PlaceHolderImage
                    alt={overlay.user.username}
                    width="30"
                    height="30"
                    placeholderSource={"/default/user_30_square.png"}
                    src={overlay.user.imageUrl}
                  />

                </Link>

              </div>


            </div>

            <div className="media-story" id="photos-browser">
              <Link className="photo-desc margin-right-4" to={overlay.linkUrl}>
                {overlay.title}
              </Link>
              <span className="author">
                {"by"}
                <Link className="user-display-name js-analytics-click margin-left-4"
                      to={overlay.user.userProfileUrl}
                      id="dropdown_user-name">
                          {overlay.user.username}
                        </Link>
                </span>
            </div>

          </div>
        </div>

      </div>
    )
  }

}

export default F8SingleHeaderRightPhotoItem;
