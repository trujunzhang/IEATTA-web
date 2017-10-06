import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import PhotoBrowser from '../../../lib/photobrowser'

const {
  loadOrderedRecipePage,
  loadPhotosBrowser,
  invokeParseCloudMethod
} = require('../../../actions').default

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  MODEL_FORM_TYPE_EDIT,
  MODEL_FORM_TYPE_NEW,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_RECIPES
} = require('../../../lib/constants').default

const {
  getModelByObjectId,
  getDefaultListTask,
  byListId,
} = require('../../filter/filterPosts')

const {getPageFormType, getSelectPhoto, checkNeedUpdatePhotosTask} = require('../../filter/filterRoutes')
import PaginationTerms from "../../../lib/paginationTerms";

class OrderedRecipes extends Component {
  constructor(props, context) {
    super(props)

    const photoBrowserInstance = new PhotoBrowser()

    const pageForm = getPageFormType(PARSE_RECIPES, props, null)
    const photosTerms = PaginationTerms.generatePhotoTerm(PARSE_RECIPES, props.params.oid, pageForm, props)

    this.state = this.initialState = {
      oid: props.params.oid,
      oslug: props.params.oslug,
      // Detailed object
      forObject: null,
      reviewStatistic: null,
      // photos
      photosTerms: photosTerms,
      photosListTask: getDefaultListTask(photosTerms),
      selectPhotoIndex: -1,
      // Common
      pageForm: pageForm,
      modelType: 'recipe',
      // Events
      onPreIconClick: photoBrowserInstance.onPreIconClick.bind(this),
      onNextIconClick: photoBrowserInstance.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const lastPageForm = this.state.pageForm;
    const lastPhotosTerms = this.state.photosTerms;

    const oldOID = this.state.oid;

    const newPageForm = getPageFormType(PARSE_RECIPES, nextProps, this.state.pageForm)
    const newPhotosTerms = PaginationTerms.generatePhotoTerm(PARSE_RECIPES, nextProps.params.oid, newPageForm, nextProps)
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, oldOID, this.state.forObject),
      reviewStatistic: getModelByObjectId(nextProps, oldOID, this.state.reviewStatistic, 'statistic'),
      // photos
      pageForm: getPageFormType(PARSE_RECIPES, nextProps, this.state.pageForm),
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })

    const haveReceiveNextRecipe = this.checkReceiveNextRecipe(nextProps, oldOID, newPhotosTerms)

    if (!haveReceiveNextRecipe) {
      this.checkNeedUpdate(lastPageForm, lastPhotosTerms, newPageForm, newPhotosTerms, photosListTask)
    }
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


  checkReceiveNextRecipe(nextProps, oldOID, newPhotosTerms) {
    const currentOID = nextProps.params.oid;
    if (currentOID !== oldOID) {
      this.setState({
        oid: nextProps.params.oid,
        oslug: nextProps.params.oslug,
        // Detailed object
        forObject: null,
        // photos
        photosTerms: newPhotosTerms,
        photosListTask: getDefaultListTask(newPhotosTerms),
        selectPhotoIndex: -1,
      })

      this.props.dispatch(loadOrderedRecipePage(currentOID))
      this.props.dispatch(loadPhotosBrowser(newPhotosTerms))
      this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
        reviewType: this.state.modelType,
        forObjectId: currentOID,
      }, currentOID))

      return true;
    }
    return false;
  }

  componentDidMount() {
    const oldOID = this.state.oid;
    this.props.dispatch(loadOrderedRecipePage(oldOID))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
    this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
      reviewType: this.state.modelType,
      forObjectId: oldOID,
    }, oldOID))
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
                <Telescope.components.IEAOrderedRecipesLayout {...this.state}/>
                {
                  (pageForm === PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY) &&
                  <Telescope.components.IEAPhotosSelectionLayout {...this.state}/>
                }
              </div>
            )
          case MODEL_FORM_TYPE_EDIT:
          case MODEL_FORM_TYPE_NEW:
            return (<Telescope.components.IEAEditRecipeLayout
                {...this.state}
                dispatch={this.props.dispatch}/>
            )
        }
      }

      switch (pageForm) {
        case PAGE_SINGLE_SELECTED_PHOTO_FORM:
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

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(OrderedRecipes));

