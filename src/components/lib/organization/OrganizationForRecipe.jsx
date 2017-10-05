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
  // Edit form
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
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


import AppConstants from "../../../lib/appConstants";

const {getPageFormType, getSelectPhoto, checkNeedUpdatePhotosTask} = require('../../filter/filterRoutes')

import PaginationTerms from "../../../lib/paginationTerms";

class OrganizationForRecipe extends Component {

  constructor(props, context) {
    super(props)

    const {modelType, forObjectId} = props.params;
    const {objectSchemaName} = AppConstants.realmObjects[modelType]
    const pageForm = getPageFormType(objectSchemaName, props, null)
    const photosTerms = PaginationTerms.generatePhotoTerm(objectSchemaName, props.params.forObjectId, pageForm, props)

    this.state = this.initialState = {
      // Detailed object
      forObject: null,
      // photos
      photosTerms: photosTerms,
      photosListTask: getDefaultListTask(photosTerms),
      selectPhotoIndex: -1,
      // Common
      pageForm: pageForm,
      forObjectId,
      modelType,
      objectSchemaName,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {objectSchemaName} = this.state;

    const lastPageForm = this.state.pageForm;
    const lastPhotosTerms = this.state.photosTerms;

    const {modelType, forObjectId} = nextProps.params;

    const newPageForm = getPageFormType(objectSchemaName, nextProps, this.state.pageForm)
    const newPhotosTerms = PaginationTerms.generatePhotoTerm(objectSchemaName, forObjectId, newPageForm, nextProps)
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    const newRestaurant = getModelByObjectId(nextProps, forObjectId, this.state.forObject);

    this.setState({
      // Detailed object
      forObject: newRestaurant,
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
    const parseId = this.state.forObjectId;
    this.props.dispatch(loadRestaurantPage(parseId))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }

  render() {
    const {photosListTask, forObject, pageForm} = this.state;

    if (!!forObject) {
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
          case MODEL_FORM_TYPE_EDIT:
          case MODEL_FORM_TYPE_NEW:
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

export default withRouter(connect(select)(OrganizationForRecipe));

