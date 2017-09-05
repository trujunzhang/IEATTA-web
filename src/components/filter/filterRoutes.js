/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict'

const _ = require('underscore')

import Users from "../../lib/users";
import Photos from "../../lib/photos";
import AppConstants from '../../lib/appConstants'

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  // Login Page
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_LOG_OUT,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
  // User Profile
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_EDIT_FORM,
  EVENTS_LIST_FOR_RESTAURANT,
  EVENTS_LIST_FOR_USER,
} = require('../../lib/constants').default

export function checkEditModel(props: Object) {
  return props.location.pathname.indexOf('edit/') !== -1;
}

export function checkNewModel(props: Object) {
  return props.location.pathname.indexOf('new/') !== -1;
}

export function checkPhotosBrowser(objectSchemaName, props: Object) {
  const subDomain = AppConstants.SubDomainPhotos[objectSchemaName];
  return props.location.pathname.indexOf(subDomain + '/') !== -1;
}

export function checkPhotosBrowserSelection({location}) {
  const {query} = location;
  if (!!query && !!query.select) {
    return query.select;
  }
  return null;
}

export function getPageFormType(pageType, props: Object, lastFormType: Any) {
  if (checkEditModel(props)) return PAGE_EDIT_FORM;
  if (checkNewModel(props)) return PAGE_NEW_FORM;

  const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(props);
  if (!!isPhotoBrowserSelectionId) {
    if (lastFormType === PAGE_MAIN_FORM) {
      return PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY;
    }
    else if (lastFormType === PAGE_PHOTOS_BROWSER_FORM) {
      return PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY;
    }
    if (!!lastFormType) {
      return lastFormType;
    }
    return PAGE_SINGLE_SELECTED_PHOTO_FORM;
  }

  const isPhotoBrowser = checkPhotosBrowser(pageType, props);

  if (isPhotoBrowser) return PAGE_PHOTOS_BROWSER_FORM;

  return PAGE_MAIN_FORM;
}

export function getSelectPhoto(props: Any, photosListTask: Any, lastPhotoIndex) {
  const {results} = photosListTask;
  if (results && results.length > 0) {
    const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(props);
    if (!!isPhotoBrowserSelectionId && isPhotoBrowserSelectionId !== '') {
      const selectedIndex = _.findLastIndex(results, {
        id: isPhotoBrowserSelectionId
      });
      return selectedIndex;
    }
  }


  return lastPhotoIndex;
}

export function generatePhotoTerm(objectSchemaName, forObjectId, pageForm = PAGE_MAIN_FORM, {location}) {
  const isPhotosBrowserPage = (pageForm === PAGE_PHOTOS_BROWSER_FORM);
  const termType = isPhotosBrowserPage ? 'page' : 'list';
  const limit = isPhotosBrowserPage ? Photos.config.paginationCountPerPage : -1;
  const listId = `photos-${termType}-view-for-objectId-${forObjectId}`

  const photoTerms = {
    listId: listId,
    forObjectId: forObjectId,
    objectSchemaName: objectSchemaName,
    allItems: (limit === -1),
    limit: limit,
    pageIndex: location.query.page || 1
  }

  return photoTerms;
}

export function isNewModelPage(pageForm) {
  return (pageForm === PAGE_NEW_FORM);
}

export function getLoginFormType({location}) {
  const {pathname} = location;

  if (pathname.indexOf('login') !== -1) {
    return LOGIN_FORM_TYPE_LOGIN;
  } else if (pathname.indexOf('logout') !== -1) {
    return LOGIN_FORM_TYPE_LOG_OUT;
  } else if (pathname.indexOf('signup') !== -1) {
    return LOGIN_FORM_TYPE_REGISTER;
  }

  throw new Error('Can not check the login form page type!')
}

export function checkLoginFormPage({location}) {
  const {pathname} = location;

  return (pathname.indexOf('login') !== -1
    || pathname.indexOf('logout') !== -1
    || pathname.indexOf('signup') !== -1
  )
}

export function getPageFormTypeForUserProfile({location}) {
  const {pathname} = location;
  const split = pathname.split('/');

  const formType = _.find(Object.keys(Users.profileLeftMenus), function (type) {
    return split[1] === Users.profileLeftMenus[type].path;
  })

  return formType;
}

export function getUserQueryId(props) {
  const pathname = props.location.pathname;
  if (pathname.indexOf('profile') !== -1) {
    return props.currentUser.id;
  }
  return props.params.uid;
}

export function generateTermsForReviewsList(props, prefix = "list", limit = 10) {
  const {id} = props.forObject;

  const listId = `reviews-${prefix}-view-for-${id}`;

  return {
    ...props,
    ...props.location.query,

    listId: listId,
    limit: limit
  };
}

export function generateTermsForRecipesList(props) {
  const forEvent = props.forEvent || {};
  const forRestaurant = props.forRestaurant || {};
  const orderedUser = props.orderedUser || {};

  const orderedUserId = orderedUser.id || '';
  const eventId = forEvent.id || '';
  const restaurantId = forRestaurant.id || '';

  const listId = `ordered-recipes-list-view-for-${orderedUserId}-e-${eventId}-r-${restaurantId}`;

  const terms = {
    listId: listId,
    limit: 10,
    orderedUserId: orderedUserId,
    eventId: eventId,
    restaurantId: restaurantId
  };

  return terms;
}

export function generateTermsForEventsList({eventType, forObject}) {
  const listId = forObject.id;
  const extendProps = (eventType === EVENTS_LIST_FOR_RESTAURANT) ? {
    restaurantId: listId
  } : {
    userId: listId
  }
  return {
    listId: 'event-list-view-for-' + listId,
    limit: 10,
    ...extendProps
  };
}

export function generateTermsForOrderedUsersList(props) {
  const listId = props.forObject.id;
  return {
    listId: 'ordered-users-list-view-for-' + listId,
    limit: 10,
    eventId: listId,
    restaurantId: props.forObject.restaurant.id
  };
}

export function generateTermsForRestaurantList(props) {
  const {location} = props;

  return {
    ...location.query,
    limit: 10,
    listId: 'single-list-view-for-restaurants'
  };
}

export function checkNeedUpdatePhotosTask(lastPageForm, newPageForm) {
  return (
    lastPageForm !== PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY
    && lastPageForm !== PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY
    && newPageForm !== PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY
    && newPageForm !== PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY
    && lastPageForm !== newPageForm
  )
}
