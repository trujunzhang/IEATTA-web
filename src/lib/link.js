import Users from "./users"
import Records from './records'
import AppConstants from './appConstants'

const _ = require('underscore')
const slugify = require('slugify')

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENT,
  // 1.1 LOGGED user left menus.
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_MENU_REVIEWS,
  LOGGED_USER_MENU_BROWSER_PHOTOS,
  LOGGED_USER_MENU_EVENTS,
  // 1.2 Edit User.
  LOGGED_USER_EDIT_FORM,
} = require('../lib/constants').default

export function showDetailedPagePath(router, post) {
  const {location} = router
  const obj = {pathname: location.pathname, query: {postId: post.id}}
  router.push(obj)
}

export function getRestaurantLink(restaurant) {
  return `/biz/${restaurant.id}/${slugify(restaurant.displayName)}`
}

export function getEventLink(event) {
  return `/events/${event.id}/${slugify(event.displayName)}`
}

/**
 * path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:rid)',
 *
 * @param user
 * @param peopleInEvent
 * @returns {string}
 */
export function getOrderedUserLink(user, peopleInEvent) {
  return `/ordereduser/${peopleInEvent.id}`
}

/**
 *
 * path: 'orderedrecipe/(:oid)/(:oid)
 * @param recipe
 * @returns {string}
 */
export function getOrderedRecipeLink(recipe) {
  return `/orderedrecipe/${recipe.id}/${slugify(recipe.displayName)}`
}

export function getEditRestaurantLink(restaurant) {
  return `/edit/biz/${restaurant.id}/${slugify(restaurant.displayName)}`
}

export function getEditEventLink(event) {
  return `/edit/event/${event.id}/${slugify(event.displayName)}`
}

export function getReviewsListLink({modelType, forObject}) {
  return `/reviews/${modelType}/${forObject.id}/${forObject.displayName}`
}

export function getAddPhotoLink(modelType, model) {
  // path: 'photos/add/(:modelType)/(:forObjectId)',
  return `/photos/add/${modelType}/${model.id}`
}

export function getEditLinkByModelType(modelType, forObject) {
  const {objectSchemaName} = AppConstants.realmObjects[modelType]
  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return getEditRestaurantLink(forObject)
    case PARSE_EVENTS:
      return getEditEventLink(forObject)
    case PARSE_RECIPES:
      return getEditRecipeLink(forObject)
  }
}

export function getEditRecipeLink(recipe) {
  return `/edit/recipe/${recipe.id}/${slugify(recipe.displayName)}`
}

export function getNewEventLink(restaurant) {
  return `/edit/event/for/restaurant/${restaurant.id}/${slugify(restaurant.displayName)}`
}

export function getNewReviewLink(reviewType, forObject) {
  return `/new/review/${reviewType}/${forObject.id}`
}

/**
 * No photo browser page's pageIndex:
 * http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud
 *
 * Contains photo browser page's pageIndex:
 * http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud && page = 1
 *
 * @param photo
 * @param photoType
 * @param forObject
 * @param location
 * @returns {string}
 */
export function getPhotosBrowserSelectionLink(photo, photoType, forObject, location = {query: {}}) {
  const {objectSchemaName} = AppConstants.realmObjects[photoType]
  const pathname = `/${AppConstants.SubDomainPhotos[objectSchemaName]}/${forObject.id}/${slugify(forObject.displayName)}`
  const select = photo.id;
  let query = {select}

  const page = location.query.page;
  if (!!page) {
    query = {select, page}
  }

  const sort_by = location.query.sort_by;
  if (!!sort_by) {
    query = {select, sort_by}
  }

  return {pathname, query}
}

export function getPhotosBrowserLink(photoType, forObject) {
  const {objectSchemaName} = AppConstants.realmObjects[photoType]
  return `/${AppConstants.SubDomainPhotos[objectSchemaName]}/${forObject.id}/${slugify(forObject.displayName)}`
}

export function geDetailedModelLink(modelType, forObject) {
  const {objectSchemaName} = AppConstants.realmObjects[modelType]
  switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
      return getRestaurantLink(forObject)
    case PARSE_RECIPES:
      return getOrderedRecipeLink(forObject)
    case PARSE_USERS:
      return getLoggedUserMenuLink(forObject)
    case PARSE_EVENTS:
      return getEventLink(forObject)
  }
  throw new Error('You need to set a proper model type!')
}

export function getPhotoSelectBackLink(pageForm, photoType, forObject, location = {query: {}}) {
  let pathname = null;
  switch (pageForm) {
    case PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY:
      pathname = geDetailedModelLink(photoType, forObject)
      break;
    case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
      pathname = getPhotosBrowserLink(photoType, forObject)
      break;
    case LOGGED_USER_MENU_BROWSER_PHOTOS:
      pathname = getLoggedUserMenuLink({
        id: forObject.id,
        username: forObject.displayName
      }, pageForm)
      break;
    default:
      throw new Error('You need to set a page Form to get PhotoSelectBackLink!')
  }
  let query = {}

  const page = location.query.page;
  if (!!page) {
    query = {page}
  }

  const sort_by = location.query.sort_by;
  if (!!sort_by) {
    query = {sort_by}
  }

  return {
    pathname,
    query
  };
}

export function getLoggedUserMenuLink(userProfile, menuType = LOGGED_USER_MENU_ABOUT) {
  if (!userProfile.id) {
    return null;
  }
  const row = Users.profileLeftMenus[menuType]

  switch (menuType) {
    case LOGGED_USER_MENU_ABOUT:
    case LOGGED_USER_MENU_REVIEWS:
    case LOGGED_USER_MENU_BROWSER_PHOTOS:
    case LOGGED_USER_MENU_EVENTS:
      return `/${row.path}/${userProfile.id}/${slugify(userProfile.username)}`
    case LOGGED_USER_EDIT_FORM:
      return '/profile'
  }
}

export function getCurrentPageIndex(props) {
  if (props.location.query.page) {
    return props.location.query.page;
  }

  return "1";
}




