import Telescope from './settings'
import moment from 'moment'

const Photos = {}

/**
 * @summary Photos config namespace
 * @type {Object}
 */
Photos.config = {}

Photos.getListThumbnailUrl = function (item) {
  const photos = item.photos;

  if (photos.length > 0) {
    const firstPhoto = photos[0];
    return firstPhoto.thumbnail.url;
  }

  return '';
}


export default Photos
