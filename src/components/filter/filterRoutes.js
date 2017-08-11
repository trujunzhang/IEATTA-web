/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict'

const _ = require('underscore')

import {SubDomainPhotos} from '../../actions/types'


const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
} = require('../../lib/constants').default

export function checkEditModel(props: Object) {
  return props.location.pathname.indexOf('edit/') !== -1;
}

export function checkNewModel(props: Object) {
  return props.location.pathname.indexOf('new/') !== -1;
}

export function checkPhotosBrowser(pageType: string, props: Object) {
  const subDomain = SubDomainPhotos[pageType];
  return props.location.pathname.indexOf(subDomain + '/') !== -1;
}

export function checkPhotosBrowserSelection(props: Object) {
  const query = props.location.query;
  if (!!query && !!query.select) {
    return query.select;
  }
  return null;
}

export function getPageFormType(pageType, props: Object, lastFormType: Any) {
  if (checkEditModel(props)) return PAGE_EDIT_FORM;
  if (checkNewModel(props)) return PAGE_NEW_FORM;

  const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(props);
  if (!!isPhotoBrowserSelectionId) {
    if (lastFormType === PAGE_MAIN_FORM) {
      return PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY;
    }
    else if (lastFormType === PAGE_PHOTOS_BROWSER_FORM) {
      return PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY;
    }
    if (!!lastFormType) {
      return lastFormType;
    }
    return PAGE_SINGLE_SELECTED_PHOTO_FORM;
  }

  const isPhotoBrowser = checkPhotosBrowser(pageType, props);

  if (isPhotoBrowser) return PAGE_PHOTOS_BROWSER_FORM;

  return PAGE_MAIN_FORM;
}

export function getSelectPhoto(props: Any, photosListTask: Any, lastPhotoIndex) {
  const {results} = photosListTask;
  if (results && results.length > 0) {
    const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(props);
    if (!!isPhotoBrowserSelectionId && isPhotoBrowserSelectionId !== '') {
      const selectedIndex = _.findLastIndex(results, {
        id: isPhotoBrowserSelectionId
      });
      return selectedIndex;
    }
  }


  return lastPhotoIndex;
}

export function generatePhotoTerm(photoType, forObjectId) {
  const photoTerms = {
    listId: 'photos-list-view-for-objectId-' + forObjectId,
    forObjectId: forObjectId,
    photoType: photoType,
    allItems: true
  }

  return photoTerms;
}
