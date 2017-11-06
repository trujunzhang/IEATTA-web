import Telescope from '../../../lib'
import React, {Component} from 'react';

import Photos from '../../../../lib/photos'

import {
  getLoggedUserMenuLink,
  getAddPhotoLink
} from '../../../../lib/link'

import {Link} from 'react-router'


/**
 * The states were interested in
 */
const {
  PARSE_USERS,
  // Slide show type
  SLIDE_SHOW_VIEW_TYPE_NORMAL,
  SLIDE_SHOW_VIEW_TYPE_USER_AVATOR,
  SLIDE_SHOW_VIEW_TYPE_PHOTO_BROWSER,
  SLIDE_SHOW_VIEW_TYPE_EDIT_USER,
} = require('../../../../lib/constants').default

class EditUserProfilePhoto extends Component {

  render() {
    const {userProfile} = this.props;
    return (
      <div className="ysection">
        <h4>Your Profile Photo
          <strong>

            <Link to={getAddPhotoLink('user', userProfile)}>
              (Add/Edit)
            </Link>

          </strong>
        </h4>

        <Telescope.components.F8ImagesSlideShowView
          altValue={userProfile.displayName}
          forObject={userProfile}
          objectSchemaName={PARSE_USERS}
          imageSize={250}
          slideShowType={SLIDE_SHOW_VIEW_TYPE_EDIT_USER}
          listTask={userProfile}
        />

      </div>

    )
  }
}


export default EditUserProfilePhoto;
