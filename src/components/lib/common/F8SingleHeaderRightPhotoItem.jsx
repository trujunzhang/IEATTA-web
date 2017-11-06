import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'
import {Link} from 'react-router'

import {adjustRouterQuery} from '../../../lib/link'

const {
  PHOTOS_BROWSER_PAGE_NORMAL,
  PHOTOS_BROWSER_PAGE_FOR_USER_PROFILE,
  PARSE_USERS,
  ALERT_TYPE_ERROR,
} = require('../../../lib/constants').default

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

  renderAvatar() {
    const {photosListTask, photoIndex} = this.props;
    const photos = photosListTask.results;
    const photo = photos[photoIndex];
    const creator = photo.creator;

    return (
      <Telescope.components.F8ImagesSlideShowView
        key={creator.id}
        altValue={creator.displayName}
        forObject={creator}
        objectSchemaName={PARSE_USERS}
        imageSize={30}
        listTask={photosListTask}
      />
    )
  }

  renderOverLay() {
    const {item, index} = this.props;
    const {overlay} = item;
    const {user} = overlay;
    const userName = user.username;
    const userLink = user.userProfileUrl;
    const linkProperty = !!userLink ? {to: userLink} : {};

    return (
      <div className="photo-box-overlay js-overlay">
        <div className="media-block photo-box-overlay_caption">

          {this.renderAvatar()}

          <div className="media-story" id="photos-browser">
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
