import Telescope from '../../lib'
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

class DetailedRestaurant extends Component {

  constructor(props, context) {
    super(props)

    const photosTerms = generatePhotoTerm('restaurant', props.params.rid)

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
      pageForm: getPageFormType('restaurant', props, null),
      modelType: 'restaurant',
      onPreIconClick: this.onPreIconClick.bind(this),
      onNextIconClick: this.onNextIconClick.bind(this),
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms.listId, this.state.photosListTask);

    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, this.state.rid, this.state.forObject),
      reviewStatistic: getModelByObjectId(nextProps, this.state.rid, this.state.reviewStatistic, 'statistic'),
      // photos
      pageForm: getPageFormType('restaurant', nextProps, this.state.pageForm),
      photosListTask: photosListTask,
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })
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
    if (!!forObject && !!photosListTask.ready && !!reviewStatistic) {
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
          return (<Telescope.components.IEAEditRestaurantLayout
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
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(DetailedRestaurant));

