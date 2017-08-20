const Photos = {}

/**
 * @summary Photos config namespace
 * @type {Object}
 */
Photos.config = {}

Photos.getThumbnailUrl = function (photo) {
  return photo.thumbnail._url;
}

Photos.getOriginalUrl = function (photo) {
  return photo.original._url;
}

Photos.getListThumbnailUrl = function (item) {
  const photos = item.photos || [];

  if (photos.length > 0) {
    const firstPhoto = photos[0];
    const _thumbnail = firstPhoto.thumbnail || {};
    return _thumbnail._url || '';
  }

  return '';
}

Photos.getPhotoThumbnailByPosition = function (photos, index) {
  const firstPhoto = photos[index];
  return Photos.getThumbnailUrl(firstPhoto)
}


export default Photos
