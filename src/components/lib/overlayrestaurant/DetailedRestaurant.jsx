import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import PhotoBrowser from '../../../lib/photobrowser'

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
  PARSE_RESTAURANTS,
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
  checkNeedUpdatePhotosTask
} = require('../../filter/filterRoutes')

class DetailedRestaurant extends Component {

  constructor(props, context) {
    super(props)

    const photoBrowserInstance = new PhotoBrowser()

    const pageForm = getPageFormType(PARSE_RESTAURANTS, props, null)
    const photosTerms = generatePhotoTerm(PARSE_RESTAURANTS, props.params.rid, pageForm, props)

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      // Detailed object
      forObject: null,
      reviewStatistic: null,
      // photos
      photosTerms: photosTerms,
      photosListTask: getDefaultListTask(photosTerms),
      selectPhotoIndex: -1,
      // Common
      pageForm: pageForm,
      modelType: 'restaurant',
      // Events
      onPreIconClick: photoBrowserInstance.onPreIconClick.bind(this),
      onNextIconClick: photoBrowserInstance.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const lastPageForm = this.state.pageForm;
    const lastPhotosTerms = this.state.photosTerms;

    const newPageForm = getPageFormType(PARSE_RESTAURANTS, nextProps, this.state.pageForm)
    const newPhotosTerms = generatePhotoTerm(PARSE_RESTAURANTS, nextProps.params.rid, newPageForm, nextProps)
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, this.state.rid, this.state.forObject),
      reviewStatistic: getModelByObjectId(nextProps, this.state.rid, this.state.reviewStatistic, 'statistic'),
      // photos
      photosTerms: newPhotosTerms,
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex),
      // Common
      pageForm: newPageForm,
    })

    this.checkNeedUpdate(lastPageForm, lastPhotosTerms, newPageForm, newPhotosTerms, photosListTask)
  }

  checkNeedUpdate(lastPageForm, lastPhotosTerms, newPageForm, newPhotosTerms, photosListTask) {
    if (checkNeedUpdatePhotosTask(lastPageForm, newPageForm) ||
      lastPhotosTerms.pageIndex !== newPhotosTerms.pageIndex  // Change page index.
    ) {
      debugger
      this.setState({
        // photos
        photosTerms: newPhotosTerms,
        photosListTask: getDefaultListTask(newPhotosTerms, photosListTask),
        selectPhotoIndex: -1,
      })
      this.props.dispatch(loadPhotosBrowser(newPhotosTerms))
    }
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
    this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
      reviewType: this.state.modelType,
      forObjectId: this.state.rid,
    }, this.state.rid))
  }

  render() {
    const {photosListTask, forObject, pageForm, reviewStatistic} = this.state;

    if (!!forObject && !!reviewStatistic) {
      if (!!photosListTask.ready) {
        switch (pageForm) {
          case PAGE_SINGLE_SELECTED_PHOTO_FORM:
            return (<Telescope.components.IEAPhotosSingleLayout {...this.state}/>)
          case PAGE_MAIN_FORM:
          case PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY:
            return (<div>
                <Telescope.components.IEARestaurantsLayout  {...this.state}/>
                {
                  (pageForm === PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY) &&
                  <Telescope.components.IEAPhotosSelectionLayout {...this.state}/>}
              </div>
            )
          case PAGE_EDIT_FORM:
          case PAGE_NEW_FORM:
            return (<Telescope.components.IEAEditRestaurantLayout
                {...this.props}
                {...this.state}
                dispatch={this.props.dispatch}/>
            )
        }
      }
      switch (pageForm) {
        case PAGE_PHOTOS_BROWSER_FORM:
        case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
          return (<div>
              <Telescope.components.IEAPhotosBrowserLayout {...this.state}/>
              {
                (pageForm === PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY) &&
                <Telescope.components.IEAPhotosSelectionLayout {...this.state}/>
              }
            </div>
          )
      }
    }


    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(DetailedRestaurant));

