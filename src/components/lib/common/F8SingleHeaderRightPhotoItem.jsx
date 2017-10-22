import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'
import {Link} from 'react-router'

import {adjustRouterQuery} from '../../../lib/link'

class F8SingleHeaderRightPhotoItem extends Component {

  onImageLinkPress() {
    const {linkObject} = this.props.item;
    this.props.router.push(adjustRouterQuery(linkObject, this.props))
  }

  /**
   * alt="Photo of My Two Cents - Los Angeles, CA, United States. BBQ fried chicken with fries and sweet potato crumble"
   * @returns {XML}
   */
  render() {
    const {item, index} = this.props;
    const {overlay} = item;

    return (
      <div key={index} className={`js-photo photo photo-${index + 1}`}>
        <div className="showcase-photo-box" id="single-header-right-photo-item">

          <a onClick={this.onImageLinkPress.bind(this)}>

            <img
              alt={`Photos of ${overlay.title}`}
              className="photo-box-img"
              width="250"
              height="250"
              src={item.imageUrl}/>

          </a>

        </div>

        {this.renderOverLay()}

      </div>
    )
  }

  renderOverLay() {
    const {item, index} = this.props;
    const {overlay} = item;
    const {user} = overlay;
    const userName = user.username;
    const userImageUrl = user.imageUrl;
    const userLink = user.userProfileUrl;
    const linkProperty = !!userLink ? {to: userLink} : {};

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">
          <div className="media-avatar avatar">
            <div className="photo-box pb-30s">

              <Link {...linkProperty} className="js-analytics-click">

                <Telescope.components.F8PlaceHolderImage
                  key={index}
                  alt={userName}
                  width="30"
                  height="30"
                  placeholderSource={"/default/user_30_square.png"}
                  source={userImageUrl}
                />

              </Link>

            </div>


          </div>

          <div className="media-story" id="photos-browser">
            {/*<Link className="photo-desc margin-right-4" to={overlay.linkUrl}>*/}
            {/*{overlay.title}*/}
            {/*</Link>*/}
            <span className="author">
                {"by"}
              <Link className="user-display-name margin-left-4"
                    {...linkProperty}
                    id="dropdown_user-name">
                    {userName}
              </Link>
                </span>
          </div>

        </div>
      </div>

    )
  }

}

export default withRouter(F8SingleHeaderRightPhotoItem);
