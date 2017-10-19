import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import PhotoBrowser from '../../../lib/photobrowser'

const {
  loadRestaurantPage,
  loadPhotosBrowser,
  loadOrderedRecipePage,
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
  PARSE_RECIPES,
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

    debugger

    const {modelType, forObjectId, recipeId} = props.params;
    const {objectSchemaName} = AppConstants.realmObjects[modelType]
    const pageForm = getPageFormType(objectSchemaName, props, null)
    const photosTerms = PaginationTerms.generatePhotoTermForRecipe(objectSchemaName, props.params.forObjectId, pageForm, props)

    let forObject = null;
    if (pageForm === MODEL_FORM_TYPE_NEW) {
      forObject = AppConstants.generateNewRecipeParseObject();
    }

    this.state = this.initialState = {
      // Detailed object
      recipeId,
      forObject,
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

    const {modelType, forObjectId, recipeId} = nextProps.params;

    const newPageForm = getPageFormType(objectSchemaName, nextProps, this.state.pageForm)
    const newPhotosTerms = PaginationTerms.generatePhotoTermForRecipe(objectSchemaName, forObjectId, newPageForm, nextProps)
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    const newRestaurant = getModelByObjectId(nextProps, forObjectId, this.state.forRelationObject);

    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, recipeId, this.state.forObject),
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
    const {pageForm, recipeId} = this.state;
    const parseId = this.state.forObjectId;

    this.props.dispatch(loadRestaurantPage(parseId))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))

    if (pageForm === MODEL_FORM_TYPE_EDIT) {
      this.props.dispatch(loadOrderedRecipePage(recipeId))
    }
  }

  render() {
    const {photosListTask, forObject, forRelationObject, pageForm} = this.state;

    if (!!forRelationObject && forObject) {
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

