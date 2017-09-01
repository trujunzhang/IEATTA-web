import Users from "./users"
import Records from './records'

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
  return `/reviews/${modelType}/${forObject.id}`
}

export function getAddPhotoLink(modelType, model) {
  // path: 'photos/add/(:modelType)/(:forObjectId)',
  return `/photos/add/${modelType}/${model.id}`
}

export function getEditLinkByModelType(modelType, forObject) {
  const {objectSchemaName} = Records.realmObjects[modelType]
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
 * http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud
 *
 * @param photo
 * @param photoType
 * @param forObject
 * @returns {string}
 */
export function getPhotosBrowserSelectionLink(photo, photoType, forObject) {
  const {objectSchemaName} = Records.realmObjects[photoType]
  return `/${Records.SubDomainPhotos[objectSchemaName]}/${forObject.id}/${slugify(forObject.displayName)}?select=${photo.id}`
}

export function getPhotosBrowserLink(photoType, forObject) {
  const {objectSchemaName} = Records.realmObjects[photoType]
  return `/${Records.SubDomainPhotos[objectSchemaName]}/${forObject.id}/${slugify(forObject.displayName)}`
}

export function geDetailedModelLink(modelType, forObject) {
  switch (modelType) {
    case 'restaurant':
      return getRestaurantLink(forObject)
    case 'recipe':
      return getOrderedRecipeLink(forObject)
  }
  throw new Error('You need to set a proper photo type!')
}

export function getPhotoSelectBackLink(pageForm, photoType, forObject) {
  switch (pageForm) {
    case PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY:
      return geDetailedModelLink(photoType, forObject)
    case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
      return getPhotosBrowserLink(photoType, forObject)
  }

}

export function getLoggedUserMenuLink(userProfile, menuType = LOGGED_USER_MENU_ABOUT) {
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



