import Telescope from '../../../lib'
import React, {Component} from 'react'
import Photos from '../../../../lib/photos'

import {Link} from 'react-router'

import {FormattedMessage, FormattedRelative} from 'react-intl'
import {getOrderedUserLink, getLoggedUserMenuLink} from '../../../../lib/link'
import {withRouter} from 'react-router'

class UserItem extends Component {

  renderLeft() {
    const {user} = this.props;

    return (
      <div className="media-avatar">
        <div className="photo-box pb-30s" data-hovercard-id="hCvy2SRZbqVllq6p-KTJ8g">

          <Link
            to={getLoggedUserMenuLink(user)}
            className="js-analytics-click">
            <img alt={user.username}
                 className="photo-box-img"
                 width={30}
                 height={30}
                 src={Photos.getListThumbnailUrl(user)}/>
          </Link>

        </div>


      </div>

    )
  }


  renderStory() {
    const {user} = this.props;

    return (
      <div className="media-story">
        <ul className="user-passport-info">
          <li className="user-name">
            <Link className="user-display-name title-font-weight-bold"
                  id="dropdown_user-name">
              {user.username}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <li>
        <div className="ypassport ypassport-slim media-block">

          {this.renderLeft()}
          {this.renderStory()}

        </div>

      </li>

    )
  }
}

export default withRouter(UserItem)
