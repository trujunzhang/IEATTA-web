
import Telescope from '../../../lib'
import React, {Component} from 'react';

import Photos from '../../../../lib/photos'

import {
    getLoggedUserMenuLink,
    getAddPhotoLink
} from '../../../../lib/link'

import {Link} from 'react-router'

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

        <div className="photo-box pb-m">

          <a className="js-analytics-click">

            <Telescope.components.F8PlaceHolderImage
              alt={userProfile.username}
              className="photo-box-img"
              width="250"
              height="250"
              placeholderSource={"/default/user_30_square.png"}
              source={Photos.getListThumbnailUrl(userProfile)}/>

          </a>

        </div>

      </div>

    );
  }
}


export default EditUserProfilePhoto;
