import moment from 'moment'

import Users from './users'

import {
  getLoggedUserMenuLink,
  getPhotosBrowserSelectionLink,
  geDetailedModelLink
} from './link'

const Photos = {
  config: {
    paginationCountPerPage: 6 * 5,
    // July 29, 2017
    selectedPhotoCreatedAtFormat: 'MMMM DD, YYYY'
  }
}

Photos.getThumbnailUrl = function (photo) {
  return photo.thumbnail._url;
}

Photos.getOriginalUrl = function (photo) {
  return photo.original._url;
}

Photos.getListThumbnailUrl = function (item = {}) {
  const photos = item.photos || [];

  if (photos.length > 0) {
    const firstPhoto = photos[0];
    const _thumbnail = firstPhoto.thumbnail || {};
    return _thumbnail._url || '';
  }

  return '';
}


Photos.getSinglePhotoItem = function (photo, modelType, forObject) {
  return {
    linkObject: getPhotosBrowserSelectionLink(photo, modelType, forObject),
    imageUrl: Photos.getThumbnailUrl(photo)
  }
}

Photos.getPhotoItem = function (photos, modelType, forObject, index) {
  return {
    linkObject: getPhotosBrowserSelectionLink(photos[index], modelType, forObject),
    imageUrl: Photos.getThumbnailUrl(photos[index])
  }
}

Photos.getPhotoInfoAboutUser = function (_photo) {
  let user = Users.anonymousUser;
  if (!!_photo.owner) {
    user = _photo.owner;
  }
  return {
    userId: user.id,
    username: user.username,
    imageUrl: Photos.getListThumbnailUrl(user),
    userProfileUrl: getLoggedUserMenuLink(user)
  }
}


Photos.getSinglePhotoItemInfo = function (photo, modelType, forObject) {
  const photoObject = photo[photo.photoType]
  return {
    ...Photos.getSinglePhotoItem(photo, modelType, forObject),
    overlay: {
      title: photoObject.displayName,
      linkUrl: geDetailedModelLink(modelType, photoObject),
      user: {
        ...Photos.getPhotoInfoAboutUser(photo)
      }
    }
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
        Photos.getSinglePhotoItemInfo(photos[0], modelType, forObject),
        Photos.getSinglePhotoItemInfo(photos[1], modelType, forObject),
      ],
      photosWall: [
        Photos.getPhotoItem(photos, modelType, forObject, 2),
        Photos.getPhotoItem(photos, modelType, forObject, 3),
        Photos.getPhotoItem(photos, modelType, forObject, 4),
        Photos.getPhotoItem(photos, modelType, forObject, 5),
      ]
    }
  } else {
    const _photos = photos.map((item, index) => {
      return Photos.getSinglePhotoItemInfo(photos[index], modelType, forObject);
    })

    return {
      singleModel: true,
      total: photoLength,
      photos: _photos
    }
  }
}

/**
 * July 29, 2017
 * @param props
 * @returns {{createdAtFormat: string}}
 */
Photos.generateSelectedPhotoInfo = function ({photosListTask, selectPhotoIndex}) {
  const photos = photosListTask.results;
  const current = photos[selectPhotoIndex];
  return {
    ...Photos.getPhotoInfoAboutUser(photos [selectPhotoIndex]),
    photoId: current.id,
    photoCreatedAtFormat: moment(current.createdAt).format(Photos.config.selectedPhotoCreatedAtFormat)
  }
}

Photos.generateScrollPhotoIndex = function (props, action, last = {}) {
  const currentIndex = (last.currentIndex || 0) + action;

  const {photoModelObject} = props;
  const {total} = photoModelObject;

  const showPhotosIndex = [];

  for (let i = 0; i < 3; i++) {
    if (currentIndex + i < total) {
      showPhotosIndex.push(currentIndex + i);
    }
  }

  return {
    haveLeftIcon: currentIndex > 0,
    haveRightIcon: currentIndex + showPhotosIndex.length < total,
    currentIndex: currentIndex,
    showPhotosIndex: showPhotosIndex
  }
}

export default Photos
