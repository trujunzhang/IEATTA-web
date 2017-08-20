import {getPhotosBrowserLink, getPhotosBrowserSelectionLink} from './link'

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

Photos.generateHeaderRightPhotoObject = function (props) {
  const {modelType, forObject, photosListTask} = props;
  const photos = photosListTask.results;
  const photoLength = photos.length;

  if (photoLength >= 6) {
    return {
      singleModel: false,
      total: photoLength,
      photos: [
        {
          url: getPhotosBrowserSelectionLink(photos[0], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 0)
        },
        {
          url: getPhotosBrowserSelectionLink(photos[1], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 1)
        }
      ],
      photosWall: [
        {
          url: getPhotosBrowserSelectionLink(photos[2], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 2)
        },
        {
          url: getPhotosBrowserSelectionLink(photos[3], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 3)
        },
        {
          url: getPhotosBrowserSelectionLink(photos[4], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 4)
        },
        {
          url: getPhotosBrowserSelectionLink(photos[5], modelType, forObject),
          imageUrl: Photos.getPhotoThumbnailByPosition(photos, 5)
        }
      ]
    }
  } else {
    return {
      singleModel: true,
      total: photoLength,
      photos: {}
    }
  }
}

export default Photos
