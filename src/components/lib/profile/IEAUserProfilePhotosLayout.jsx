import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadPhotosBrowser,
} = require('../../../actions').default

const {
  PARSE_USERS,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_RECIPES
} = require('../../../lib/constants').default


const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

const {
  generatePhotoTerm,
  getPageFormType,
  getSelectPhoto,
} = require('../../filter/filterRoutes')


class IEAUserProfilePhotosLayout extends Component {

  constructor(props, context) {
    super(props)

    const photosTerms = generatePhotoTerm(PARSE_USERS, props.userProfile.id)

    this.state = this.initialState = {
      photosTerms: photosTerms,
      photosListTask: getDefaultListTask(photosTerms),
      selectPhotoIndex: -1,
      // Common
      pageForm: getPageFormType(PARSE_USERS, props, null),
      modelType: 'user',
      onPreIconClick: this.onPreIconClick.bind(this),
      onNextIconClick: this.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms.listId, this.state.photosListTask);
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

    if (!!photosListTask.ready) {
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
    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }


  onPreIconClick() {
    const {photosListTask, selectPhotoIndex} = this.state;
    const photos = photosListTask.results;

    let preIndex = selectPhotoIndex - 1;
    if (preIndex < 0) preIndex = 0;
    this.setState({selectPhotoIndex: preIndex})

    this.props.router.push({pathname: this.props.location.pathname, query: {select: photos[preIndex].id}})
  }

  onNextIconClick() {
    const {photosListTask, selectPhotoIndex} = this.state;
    const photos = photosListTask.results;
    const totalPhotosLength = photos.length;

    let nextIndex = selectPhotoIndex + 1;
    if (nextIndex >= totalPhotosLength) nextIndex = totalPhotosLength - 1;
    this.setState({selectPhotoIndex: nextIndex})

    this.props.router.push({pathname: this.props.location.pathname, query: {select: photos[nextIndex].id}})
  }


}

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(IEAUserProfilePhotosLayout));


