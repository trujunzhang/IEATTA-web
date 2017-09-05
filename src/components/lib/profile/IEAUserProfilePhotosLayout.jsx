import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'
import PhotoBrowser from '../../../lib/photobrowser'

const {
  loadPhotosBrowser,
} = require('../../../actions').default

const {
  PARSE_USERS,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
} = require('../../../lib/constants').default

const {
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

const {
  generatePhotoTerm,
  getPageFormType,
  getSelectPhoto,
} = require('../../filter/filterRoutes')


class IEAUserProfilePhotosLayout extends Component {

  constructor(props) {
    super(props)

    const photoBrowserInstance = new PhotoBrowser()
    const pageForm = getPageFormType(PARSE_USERS, props, null)

    const photosTerms = generatePhotoTerm(PARSE_USERS, props.userProfile.id, pageForm, props)

    this.state = this.initialState = {
      // photos
      photosTerms: photosTerms,
      photosListTask: getDefaultListTask(photosTerms),
      selectPhotoIndex: -1,
      // Common
      pageForm: pageForm,
      modelType: 'user',
      // Events
      onPreIconClick: photoBrowserInstance.onPreIconClick.bind(this),
      onNextIconClick: photoBrowserInstance.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);
    const newPageFormType = getPageFormType(PARSE_USERS, nextProps, this.state.pageForm);

    this.setState({
      // photos
      pageForm: newPageFormType,
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })
  }

  componentDidMount() {
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }


  render() {
    const {photosListTask, pageForm} = this.state;

    switch (pageForm) {
      case PAGE_SINGLE_SELECTED_PHOTO_FORM:
        return (<Telescope.components.IEAPhotosSingleLayout
          photoTitleType={PHOTO_BROWSER_LOGGED_USER_TITLE}
          {...this.state} {...this.props}/>)
      case PAGE_PHOTOS_BROWSER_FORM:
      case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
        return (<div>
          <Telescope.components.IEAPhotosBrowserLayout
            photoTitleType={PHOTO_BROWSER_LOGGED_USER_TITLE}
            {...this.state} {...this.props}/>
          {
            (pageForm === PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY) &&
            <Telescope.components.IEAPhotosSelectionLayout {...this.state} {...this.props}/>
          }
        </div>)

    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(IEAUserProfilePhotosLayout));


