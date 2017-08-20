import {
  getLoggedUserMenuLink,
  getPhotosBrowserLink,
  getPhotosBrowserSelectionLink,
  geDetailedModelLink
} from './link'

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

Photos.getPhotoItem = function (photos, modelType, forObject, index) {
  return {
    url: getPhotosBrowserSelectionLink(photos[index], modelType, forObject),
    imageUrl: Photos.getPhotoThumbnailByPosition(photos, index)
  }
}

Photos.getPhotoInfoAboutUser = function (photos, index) {
  const user = photos[index].user;
  return {
    username: user.username,
    imageUrl: Photos.getListThumbnailUrl(user),
    userProfileUrl: getLoggedUserMenuLink(user)
  }
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
          ...Photos.getPhotoItem(photos, modelType, forObject, 0),
          overlay: {
            title: photos[0].restaurant.displayName,
            linkUrl: geDetailedModelLink(modelType, photos[0].restaurant),
            user: {
              ...Photos.getPhotoInfoAboutUser(photos, 0)
            }
          }
        },
        {
          ...Photos.getPhotoItem(photos, modelType, forObject, 1),
          overlay: {
            title: photos[1].restaurant.displayName,
            linkUrl: geDetailedModelLink(modelType, photos[1].restaurant),
            user: {
              ...Photos.getPhotoInfoAboutUser(photos, 1)
            }
          }

        }
      ],
      photosWall: [
        Photos.getPhotoItem(photos, modelType, forObject, 2),
        Photos.getPhotoItem(photos, modelType, forObject, 3),
        Photos.getPhotoItem(photos, modelType, forObject, 4),
        Photos.getPhotoItem(photos, modelType, forObject, 5),
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
