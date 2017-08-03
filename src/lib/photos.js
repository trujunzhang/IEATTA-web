import Telescope from './settings'
import moment from 'moment'

const Photos = {}

/**
 * @summary Photos config namespace
 * @type {Object}
 */
Photos.config = {}

Photos.getListThumbnailUrl = function (post) {
  let photos = post.photos,
    firstPhoto = photos[0]

  return firstPhoto.url
}


export default Photos
