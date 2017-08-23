import Telescope from './settings'
import moment from 'moment'

import {getEditRestaurantLink} from './link'

const Restaurants = {}

/**
 * @summary Restaurants config namespace
 * @type {Object}
 */
Restaurants.config = {}

/**
 * @summary generate 15 days as the day filter for Restaurants list admin
 */
Restaurants.getDateQueryString = function (date) {
  return moment(date).format('YYYY-MM-DD')
}

/**
 * @summary generate 15 days as the day filter for Restaurants list admin
 */
Restaurants.getDateSelectors = function () {
  const size = 15
  let REFERENCE = moment(new Date()) // today
  let currentYear = REFERENCE.format('YYYY')

  const dateSelectors = []
  for (let i = 0; i < size; i++) {
    const date = REFERENCE.clone().subtract(i, 'months')
    const queryString = moment(date).format('YYYY-MM')
    const year = moment(date).format('YYYY')

    const title = date.format('MMMM YYYY')
    dateSelectors.push({'query': queryString, 'title': title})
  }

  return dateSelectors
}

Restaurants.showReady = function (results, hasMore, ready, totalCount, limit, firstPagination) {
  if (!firstPagination) { // ignoring it, if not the first pagination.
    return false
  }
  if (typeof totalCount === 'undefined' || !ready || typeof results === 'undefined') {
    return true
  }
  if (ready && !hasMore && results.length === 0) {//empty list
    return false
  }
  if (!ready && hasMore && results.length <= limit) {// first pagination and already ready.
    return true
  }
  if (hasMore && !!results && results.length > limit) {
    return false
  }
  if (hasMore && (results.length % limit) !== 0) {
    return true
  }
  return false
}

/**
 * @summary limit the post's content
 * @param {Object} content
 * @param limit
 */
Restaurants.getLimitedContent = function (content, limit) {
  let mytextlet = content

  if ((content).length > limit) {
    mytextlet = content.substring(0, limit - 3) + '...'
  }
  return mytextlet
}


Restaurants.generateTwitterShareLink = function (post) {

  const twitterVia = Telescope.settings.get('twitterAccount', 'Getpoliticl')
  const splits = []
  splits.push('url=' + post.url)
  splits.push('via=' + twitterVia)
  splits.push('text=' + post.title)

  return 'https://twitter.com/share?' + splits.join('&')
}

/**
 *
 * https://www.facebook.com/dialog/share?
 * app_id=1549529981961270&href=http://scruby.site/?postId=hHMiCtoJkHEN56tQB&title=a-snapdragon-835-powered-windows-10-device-isn-t-far-away&quote=
 *
 */
Restaurants.generateFacebookShareLink = function (post) {
  //splits.push("u=" + post.url);
  let facebookId = Telescope.settings.get('FACEBOOK_APP_ID')
  const splits = []
  splits.push('app_id=' + facebookId)
  splits.push('href=' + post.url)
  splits.push('quote=')
  return 'https://www.facebook.com/dialog/share?' + splits.join('&')
}

Restaurants.generatePostPageUrl = function (router) {
  const prefix = Telescope.utils.getSiteUrl()
  const postId = router.location.query.postId
  return `${prefix}/?postId=${postId}`
}

Restaurants.generateCommentTwitterShareLink = function (router, comment) {

  //href="https://twitter.com/share?
  //url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&
  //via=twitterdev&
  //related=twitterapi%2Ctwitter&
  //hashtags=example%2Cdemo&
  //text=custom%20share%20text"

  //$(location).attr('href');

  const twitterVia = Telescope.settings.get('twitterAccount', 'Getpoliticl')

  const url = Restaurants.generatePostPageUrl(router)
  const userName = Users.getDisplayName(comment.user)
  let text = comment.body
  text = '\"' + text.substring(0, 50) + '...\"' + ' — ' + userName

  const splits = []
  splits.push('via=' + twitterVia)
  splits.push('url=' + url)
  splits.push('text=' + text)
  return 'https://twitter.com/share?' + splits.join('&')
}

Restaurants.generateCommentFacebookShareLink = function (router, comment) {
  //https://www.facebook.com/dialog/feed?
  //  app_id=1389892087910588
  //  &redirect_uri=https://scotch.io
  //  &link=https://scotch.io
  //  &picture=http://placekitten.com/500/500
  //  &caption=This%20is%20the%20caption
  //  &description=This%20is%20the%20description

  let facebookId = Telescope.settings.get('FACEBOOK_APP_ID')
  const url = Restaurants.generatePostPageUrl(router)
  let text = comment.body

  const splits = []

  splits.push('app_id=' + facebookId)
  splits.push('href=' + url)
  splits.push('quote=' + text)

  return 'https://www.facebook.com/dialog/share?' + splits.join('&')
}

Restaurants.getMapInfo = function (model, location, showEditButton, autoPopup) {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    displayName: model.displayName,
    address: model.address,
    editLink: getEditRestaurantLink(model),
    showEditButton: showEditButton,
    autoPopup: autoPopup,
  }
}

export default Restaurants
