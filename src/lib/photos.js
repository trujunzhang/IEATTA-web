import moment from 'moment'

import Users from './users'

import {
  getLoggedUserMenuLink,
  getPhotosBrowserSelectionLink,
  geDetailedModelLink
} from './link'

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENT,
  // 1.1 LOGGED user left menus.
  LOGGED_USER_MENU_ABOUT,
  LOGGED_USER_MENU_REVIEWS,
  LOGGED_USER_MENU_BROWSER_PHOTOS,
  LOGGED_USER_MENU_EVENTS,
  LOGGED_USER_MENU_RECIPES,
  // 1.2 Edit User.
  LOGGED_USER_EDIT_FORM,
} = require('../lib/constants').default

const Photos = {

  config: {
    paginationCountPerPage: 6 * 5, //Using it now.
    // paginationCountPerPage: 6 * 1, //Using it now.
    // July 29, 2017
    selectedPhotoCreatedAtFormat: 'MMMM DD, YYYY',
    placeHolderSmallImage: {
      PAGE_MAIN_FORM,
      PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
      PAGE_PHOTOS_BROWSER_FORM,
      PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
      PARSE_RESTAURANTS: "/default/blank_biz_small.png",
      PARSE_USERS,
      PARSE_RECORDS,
      PARSE_EVENTS,
      PARSE_RECIPES,
      PARSE_PHOTOS,
      PARSE_REVIEWS,
      PARSE_PEOPLE_IN_EVENT,
    }
  }
}

Photos.getThumbnailUrl = function (photo) {
  return photo.thumbnailUrl;
}

Photos.getOriginalUrl = function (photo) {
  return photo.originalUrl;
}

Photos.getListThumbnailUrl = function (item = {}) {
  const _photo = item.listPhoto || {};
  return Photos.getThumbnailUrl(_photo);
}

Photos.getSinglePhotoItem = function (photo, modelType, forObject) {
  return {
    linkObject: getPhotosBrowserSelectionLink(photo, modelType, forObject),
    imageUrl: Photos.getThumbnailUrl(photo)
  }
}


Photos.getPhotoInfoAboutUser = function (_photo) {
  let user = Users.anonymousUser;
  if (!!_photo.creator) {
    user = _photo.creator;
  }
  return {
    userId: user.id,
    username: user.username,
    imageUrl: user.defaultAvatarUrl,
    userProfileUrl: getLoggedUserMenuLink(user)
  }
}


Photos.getSinglePhotoItemInfo = function (photo) {
  const _photoType = photo.photoType;
  const photoObject = photo[_photoType]

  return {
    ...Photos.getSinglePhotoItem(photo, _photoType, photoObject),
    overlay: {
      title: photoObject.displayName,
      linkUrl: geDetailedModelLink(_photoType, photoObject),
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
        Photos.getSinglePhotoItemInfo(photos[0]),
        Photos.getSinglePhotoItemInfo(photos[1]),
      ],
      photosWall: [
        Photos.getSinglePhotoItem(photos[2], modelType, forObject),
        Photos.getSinglePhotoItem(photos[3], modelType, forObject),
        Photos.getSinglePhotoItem(photos[4], modelType, forObject),
        Photos.getSinglePhotoItem(photos[5], modelType, forObject),
      ]
    }
  } else {
    const _photos = photos.map((item, index) => {
      return Photos.getSinglePhotoItemInfo(photos[index]);
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

Photos.isPhotoParseObjectOwnRecipe = function (recipeId, photoParseInstance) {
  const recipeParseInstance = photoParseInstance.get('recipe')
  if (!!recipeParseInstance && recipeId === recipeParseInstance.id) {
    return true;
  }

  return false
}

Photos.isPhotoOwnRecipe = function (recipeId, photo) {
  const recipe = photo.recipe || {id: ""}
  return (recipeId === recipe.id)
}

/**
 * Format:
 * {
 *   emptyList: true|false
 *   imageArray:[]
 *   placeholder: string
 * }
 * @param props
 */
Photos.generateSlideShowObject = function (props) {
  const {listTask, objectSchemaName, forObject} = props;
  const {listPhotosDict} = listTask;
  const parseId = forObject.id;
  const photos = listPhotosDict[parseId]

  const size = photos.length;

  const slideObject = {
    emptyList: size === 0,
    imageArray: photos.map(function (photo) {
      return Photos.getThumbnailUrl(photo)
    }),
    placeholder: Photos.config.placeHolderSmallImage[objectSchemaName]
  }

  return slideObject;
}

export default Photos
