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
  LOGGED_USER_MENU_RECIPES,
  LOGGED_USER_INVITE_FORM,
} = require('./constants').default

const Users = {

  /**
   * Sometimes, If the users run the 'IEATTA' app, but network is unavailability.
   * So give the users the 'anonymous' user firstly to let them can use the app.
   *
   * The uniqueId and the password is the same as '12345654321'.
   *
   * @type {{id: null, name: string, slug: string, email: string, loginType: string, uniqueId: string}}
   */
  anonymousUser: {
    id: null,
    username: 'anonymous',
    email: '',
    loginType: 'email',
    listPhotoId: ''
  },
  config: {
    // February 2014
    dateFormat: 'MMMM YYYY',
    orderedDataFormat: 'DD, MMMM, YYYY'
  },
  profileLeftMenus: {
    LOGGED_USER_INVITE_FORM: {
      tag: 'invite',
      path: 'invite'
    },
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
    },
    LOGGED_USER_MENU_RECIPES: {
      tag: 'recipe',
      title: "Recipes",
      svg: "M17.22 22a1.78 1.78 0 0 1-1.74-2.167l1.298-4.98L14 13l1.756-9.657A1.635 1.635 0 0 1 19 3.635V20.22A1.78 1.78 0 0 1 17.22 22zm-7.138-9.156l.697 7.168a1.79 1.79 0 1 1-3.56 0l.7-7.178A3.985 3.985 0 0 1 5 9V3a1 1 0 0 1 2 0v5.5c0 .28.22.5.5.5s.5-.22.5-.5V3a1 1 0 0 1 2 0v5.5c0 .28.22.5.5.5s.5-.22.5-.5V3a1 1 0 0 1 2 0v5.83c0 1.85-1.2 3.518-2.918 4.014z",
      path: 'user_details_recipes'
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

Users.getCreatedAtFormat = function (user) {
  return moment(user.createdAt).format(Users.config.dateFormat)
}

Users.getOrderedUserFormat = function (peopleInEvent) {
  return moment(peopleInEvent.createdAt).format(Users.config.orderedDataFormat)
}

Users.isLeftMenuActive = function (row, {location}) {
  const {pathname} = location;
  return (`${pathname}/`.indexOf(`${row.path}/`) !== -1);
}

Users.getSelectedUserIndex = function (newListTask, {selectedPhotoInfo}) {
  const {results} = newListTask;
  const {userId} = selectedPhotoInfo;

  let selectedUserIndex = _.findIndex(results, function (item) {
    return item.id === userId;
  })

  if (selectedUserIndex === -1) {
    selectedUserIndex = 0;
  }

  const selectedUserId = results.length > 0 ? results[selectedUserIndex].id : null;
  return {selectedUserIndex, selectedUserId};
}

export default Users
