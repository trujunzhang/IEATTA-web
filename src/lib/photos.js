import Telescope from './settings'
import moment from 'moment'

const Photos = {}

/**
 * @summary Photos config namespace
 * @type {Object}
 */
Photos.config = {}

Photos.getListThumbnailUrl = function (item) {
  const photos = item.photos,
    firstPhoto = photos.length > 0 ? photos[0] : {}

  return firstPhoto.url || '';
}


export default Photos
