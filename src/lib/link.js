const _ = require('underscore')

const slugify = require('slugify')

import {SubDomainPhotos} from '../actions/types'


const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
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
  return `/ordereduser/${user.id}/${slugify(user.username)}/${peopleInEvent.eventId}/${peopleInEvent.restaurantId}`
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

export function getEditRecipeLink(recipe) {
  return `/edit/recipe/${recipe.id}/${slugify(recipe.displayName)}`
}

export function getNewEventLink(restaurant) {
  return `/edit/event/for/restaurant/${restaurant.id}/${slugify(restaurant.displayName)}`
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
  return `/${SubDomainPhotos[photoType]}/${forObject.id}/${slugify(forObject.displayName)}?select=${photo.id}`
}

export function getPhotosBrowserLink(photoType, forObject) {
  return `/${SubDomainPhotos[photoType]}/${forObject.id}/${slugify(forObject.displayName)}`
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



