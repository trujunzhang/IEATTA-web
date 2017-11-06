import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

import {getLoggedUserMenuLink} from '../../../lib/link'
import {Link} from 'react-router'

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // Slide show type
  SLIDE_SHOW_VIEW_TYPE_NORMAL,
  SLIDE_SHOW_VIEW_TYPE_USER_AVATOR,
} = require('../../../lib/constants').default

class F8UserAvatorSection extends Component {


  renderLeftUserAvator() {
    const user = this.props.user || {displayName: ''};
    const sectionClass = "user-profile_avatar";
    return (

      <Telescope.components.F8ImagesSlideShowView
        altValue={user.displayName}
        forObject={user}
        objectSchemaName={PARSE_USERS}
        imageSize={250}
        slideShowType={SLIDE_SHOW_VIEW_TYPE_USER_AVATOR}
        listTask={user}
      />
    )
  }

  renderLeftUserAvatorxxx() {
    const user = this.props.user || {};
    const sectionClass = "user-profile_avatar";

    return (
      <div className={sectionClass}>
        <div
          className="photo-slideshow photo-slideshow--full-width photo-slideshow--rounded js-photo-slideshow-user-details">
          <div className="photo-slideshow_slide is-active">
            <div>

              <Link to={getLoggedUserMenuLink(user)} className="ordered-user-avator">

                <Telescope.components.F8PlaceHolderImage
                  key={user.username}
                  alt={user.username}
                  className="photo-box-img"
                  width="250"
                  height="250"
                  placeholderSource={"/default/user_30_square.png"}
                  source={Photos.getListThumbnailUrl(user)}/>

              </Link>

            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {sectionClass} = this.props;

    return (
      <div className={sectionClass}>
        <div className="user-profile_container">
          {this.renderLeftUserAvator()}
        </div>
      </div>
    )
  }

}


F8UserAvatorSection.propTypes = {
  sectionClass: React.PropTypes.string
};

F8UserAvatorSection.defaultProps = {
  sectionClass: "ordered-user-profile"
};


export default F8UserAvatorSection;
