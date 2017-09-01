import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadRestaurantPage,
  loadPhotosBrowser,
  invokeParseCloudMethod
} = require('../../../actions').default

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_USERS
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
      // onPreIconClick: this.onPreIconClick.bind(this),
      // onNextIconClick: this.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms.listId, this.state.photosListTask);


    this.setState({
      // photos
      pageForm: getPageFormType(PARSE_USERS, nextProps, this.state.pageForm),
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })
  }

  componentDidMount() {
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }

  render() {
    debugger
    return (
      <Telescope.components.IEAPhotosBrowserLayout {...this.state} {...this.props}/>
    )
  }

}

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(IEAUserProfilePhotosLayout));


