import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

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
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
  CLOUD_STATISTIC_FOR_REVIEWS,
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

class OrderedRecipes extends Component {
  constructor(props, context) {
    super(props)

    const photosTerms = generatePhotoTerm('recipe', props.params.oid)

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
      pageForm: getPageFormType('recipe', props, null),
      modelType: 'recipe',
      onPreIconClick: this.onPreIconClick.bind(this),
      onNextIconClick: this.onNextIconClick.bind(this)
    }
  }

  componentWillReceiveProps(nextProps) {

    const oldOID = this.state.oid;
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms.listId, this.state.photosListTask);

    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, oldOID, this.state.forObject),
      reviewStatistic: getModelByObjectId(nextProps, oldOID, this.state.reviewStatistic, 'statistic'),
      // photos
      pageForm: getPageFormType('recipe', nextProps, this.state.pageForm),
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })

    const currentOID = nextProps.params.oid;
    if (currentOID !== oldOID) {
      const photosTerms = generatePhotoTerm('recipe', currentOID)

      this.setState({
        oid: nextProps.params.oid,
        oslug: nextProps.params.oslug,
        // Detailed object
        forObject: null,
        // photos
        photosTerms: photosTerms,
        photosListTask: getDefaultListTask(photosTerms),
        selectPhotoIndex: -1,
      })

      this.props.dispatch(loadOrderedRecipePage(currentOID))
      this.props.dispatch(loadPhotosBrowser(photosTerms))
      this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
        reviewType: this.state.modelType,
        forObjectId: currentOID,
      }, currentOID))
    }

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

    if (!!forObject && !!photosListTask.ready && !!reviewStatistic) {
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
        case PAGE_EDIT_FORM:
        case PAGE_NEW_FORM:
          return (<Telescope.components.IEAEditRecipeLayout
              {...this.state}
              dispatch={this.props.dispatch}/>
          )
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

    let nextIndex = selectPhotoIndex + 1;
    if (nextIndex >= totalPhotosLength) nextIndex = totalPhotosLength - 1;
    this.setState({selectPhotoIndex: nextIndex})

    this.props.router.push({pathname: this.props.location.pathname, query: {select: photos[nextIndex].id}})
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

