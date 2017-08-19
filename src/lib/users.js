import Telescope from '../components/lib/index'
import React from 'react'

const _ = require('underscore')
const md5 = require('blueimp-md5')

import moment from 'moment'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
  // 1.1 LOGGED user left menus.
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
    LOGGED_USER_EDIT_FORM: {
      tag: 'edit',
      path: 'profile'
    },
    LOGGED_USER_MENU_ABOUT: {
      tag: 'profile',
      title: "Profile Overview",
      svg: "M3 21.002h18a12.703 12.703 0 0 0-7.28-3.583v-1.46c1.156-.845 2.23-2.25 2.302-3.168 1.307-.634 1.58-2.213.65-2.562l-.02.03c.42-.587.677-1.335.677-2.192 0-1.11-.2-2.136-1.017-2.806-.567-1.34-1.746-2.266-3.116-2.266-.804 0-1.54.32-2.13.854a1.223 1.223 0 0 0-.787-.297c-.514 0-.96.345-1.2.852-1.294.478-2.236 1.936-2.236 3.663 0 .79.198 1.526.536 2.136-1 .394-.666 1.9.595 2.59.074.915 1.147 2.322 2.302 3.166v1.457A12.725 12.725 0 0 0 3 21z",
      path: 'user_details'
    },
    LOGGED_USER_MENU_REVIEWS: {
      tag: 'review',
      title: "Reviews",
      svg: "M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6zm-5.88 10.428l-3.16-1.938-3.05 2.01.59-3.457L7 10.596l3.457-.505L11.96 6.5l1.582 3.59 3.458.506-2.5 2.447.62 3.385z",
      path: 'user_details_reviews_self'
    },
    LOGGED_USER_MENU_BROWSER_PHOTOS: {
      tag: 'camera',
      title: "Browser Photos",
      svg: "M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
      path: 'user_local_photos'
    },
    LOGGED_USER_MENU_EVENTS: {
      tag: 'event',
      title: "Events",
      svg: "M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-5.634 7.723L12 18l-1.366-2.277a3.5 3.5 0 1 1 2.732 0zM12 11.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z",
      path: 'user_details_events'
    }
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

Users.isLeftMenuActive = function (row, props) {
  const pathname = props.location.pathname;
  return (pathname.indexOf(row.path) !== -1);
}

export default Users
