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
    const photosTerms = PaginationTerms.generatePhotoTerm(objectSchemaName, props.params.forObjectId, pageForm, props, false, true)

    this.state = this.initialState = {
      // Detailed object
      forObject: AppConstants.generateNewRecipeParseObject(),
      forRelationObject: null,
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
    const newPhotosTerms = PaginationTerms.generatePhotoTerm(objectSchemaName, forObjectId, newPageForm, nextProps, false, true)
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    const newRestaurant = getModelByObjectId(nextProps, forObjectId, this.state.forRelationObject);

    this.setState({
      // Detailed object
      forRelationObject: newRestaurant,
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
    const {photosListTask, forRelationObject, pageForm} = this.state;

    if (!!forRelationObject) {
      if (!!photosListTask.ready) {
        switch (pageForm) {
          case MODEL_FORM_TYPE_EDIT:
          case MODEL_FORM_TYPE_NEW:
            return (<Telescope.components.IEAEditRecipeWithPhotosLayout
                {...this.props}
                {...this.state}
                dispatch={this.props.dispatch}/>
            )
        }
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

