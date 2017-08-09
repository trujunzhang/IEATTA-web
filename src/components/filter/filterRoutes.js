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

const {
  PAGE_MAIN_FORM,
  PAGE_EDIT_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_ONLY_SELECTED_PHOTO_FORM,
} = require('../../../actions').default


export function checkEdit(props: Object) {
  return props.location.pathname.indexOf('edit/') !== -1;
}

export function checkPhotosBrowser(props: Object) {
  return props.location.pathname.indexOf('biz_photos/') !== -1;
}

export function checkPhotosBrowserSelection(props: Object) {
  const query = props.location.query;
  if (!!query && !!query.select) {
    return query.select;
  }
  return null;
}

export function getPageFormType(props: Object) {
  const isEdit = checkEdit(props);

  if (isEdit) return PAGE_EDIT_FORM;

  return PAGE_MAIN_FORM;
}
