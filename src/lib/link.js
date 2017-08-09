let _ = require('underscore')

function adjustNewQuery(router, newQuery) {
  const query = _.clone(router.location.query)
  if (query.before && query.after) {
    newQuery['before'] = query.before
    newQuery['after'] = query.after
  }
}

export function pushForTopic(router, topic) {
  const obj = {pathname: `/topic/${topic.id}/${topic.name}`, query: {}}
  adjustNewQuery(router, obj.query)
  router.push(obj)
}

export function showDetailedPagePath(router, post) {
  const {location} = router
  const obj = {pathname: location.pathname, query: {postId: post.id}}
  router.push(obj)
}

export function cleanUpQuery(router) {
  const {location} = router
  const obj = {pathname: location.pathname, query: {}}
  router.push(obj)
}

export function getRestaurantLink(restaurant) {
  return `/biz/${restaurant.id}/${restaurant.displayName}`
}

export function getEventLink(event) {
  return `/events/${event.id}/${event.displayName}`
}

/**
 * path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:rid)',
 *
 * @param user
 * @param peopleInEvent
 * @returns {string}
 */
export function getOrderedUserLink(user, peopleInEvent) {
  return `/ordereduser/${user.id}/${user.username}/${peopleInEvent.eventId}/${peopleInEvent.restaurantId}`
}

/**
 *
 * path: 'orderedrecipe/(:oid)/(:oid)
 * @param recipe
 * @returns {string}
 */
export function getOrderedRecipeLink(recipe) {
  const {restaurant, event, user} = recipe;
  return `/orderedrecipe/${recipe.id}/${recipe.displayName}`
}

export function getEditRestaurantLink(restaurant) {
  return `/edit/biz/${restaurant.id}/${restaurant.displayName}`
}

/**
 * http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud
 *
 * @param photo
 * @param photoType
 * @returns {string}
 */
export function getPhotosBrowserSelectionLink(photo, photoType) {
  const subDomain = {
    'restaurant': 'biz_photo'
  }
  return `/${subDomain[photoType]}/${restaurant.id}/${restaurant.displayName}`
}


export function getPhotosBrowserLink(photo, photoType) {
  return `/edit/biz/${restaurant.id}/${restaurant.displayName}`
}
