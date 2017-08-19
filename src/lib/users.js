import Telescope from '../components/lib/index'
import React from 'react'

const _ = require('underscore')
const md5 = require('blueimp-md5')

import moment from 'moment'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_MENU_REVIEWS,
  LOGGED_USER_MENU_BROWSER_PHOTOS,
  LOGGED_USER_MENU_EVENTS,
} = require('./constants').default


const Users = {
  config: {
    // February 2014
    dateFormat: 'MMMM YYYY',
    orderedDataFormat: 'DD, MMMM, YYYY'
  },
  profileLeftMenus: {

  }
}

Users.isLoggedUser = function (userProfile, currentUser) {
  if (!!currentUser && !!userProfile && userProfile.id === currentUser.id) {
    return true;
  }

  return false;
};

/**
 * @summary Get a user's email hash
 * @param {Object} user
 */
Users.getEmailHash = function (user) {
  return md5(user.email)
}

Users.isMobileDevice = function () {
  return false
}

{/*<Avatar googleId="118096717852922241760" size="100" round="true" />*/
}
{/*<Avatar facebookId="100008343750912" size="150" />*/
}
{/*<Avatar vkontakteId="1" size="150" />*/
}
{/*<Avatar skypeId="sitebase" size="200" />*/
}
{/*<Avatar twitterHandle="sitebase" size="40" />*/
}
{/*<Avatar name="Wim Mostmans" size="150" />*/
}
{/*<Avatar name="Wim Mostmans" size="150" textSizeRatio="1.75" />*/
}
{/*<Avatar value="86%" size="40" />*/
}
{/*<Avatar size="100" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />*/
}
Users.getAvatarObj = function (user) {
  if (!user) {
    return {
      title: '',
      slug: '',
      avatarId: '',
      avatar: {
        name: ''
      }
    }
  }
  const {loginType} = user

  switch (loginType) {
    case 'email':
    case 'facebook':
    case 'twitter':
      return {
        title: Users.getDisplayName(user),
        slug: user.slug,
        avatarId: user.id,
        avatar: {
          email: user.email,
          name: Users.getDisplayName(user)
        }
      }
  }
}

/**
 * Check the post is for the backend admins.
 * @param location
 * @param user
 * @returns {boolean}
 */
Users.checkIsAdmin = function (location, user) {
  // Dashboard UI(for admin)
  let {admin} = location.query
  if (!admin || !user) {
    return false
  }
  else if (!!admin && user.isAdmin) {
    return true
  }
  return false
}

Users.getCreatedAtFormat = function (user) {
  return moment(user.createdAt).format(Users.config.dateFormat)
}

Users.getOrderedUserFormat = function (peopleInEvent) {
  return moment(peopleInEvent.createdAt).format(Users.config.orderedDataFormat)
}

export default Users
