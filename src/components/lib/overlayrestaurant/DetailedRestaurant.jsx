import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadRestaurantPage,
  loadPhotosBrowser
} = require('../../../actions').default

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
} = require('../../../lib/constants').default


const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

const {
  getPageFormType,
  getSelectPhoto,
  checkEdit,
  checkPhotosBrowser,
  checkPhotosBrowserSelection
} = require('../../filter/filterRoutes')

class DetailedRestaurant extends Component {

  constructor(props, context) {
    super(props)

    const photoTerms = {
      listId: 'photos-list-view-for-restaurants-' + props.params.rid,
      forObjectId: props.params.rid,
      photoType: 'restaurant',
      allItems: true
    }

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      restaurant: null,
      forObject: null,
      photosListTask: getDefaultListTask(photoTerms),
      photos: null,
      pageForm: getPageFormType(props, null),
      photosTerms: photoTerms,
      photoType: 'restaurant',
      onPreIconClick: this.onPreIconClick.bind(this),
      onNextIconClick: this.onNextIconClick.bind(this),
      selectPhotoIndex: -1
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
      forObject: getModelByObjectId(nextProps, this.state.rid, this.state.forObject),
      photosListTask: photosListTask,
      photos: photosListTask.results,
      pageForm: getPageFormType(nextProps, this.state.pageForm),
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }

  render() {
    const {photos, restaurant, pageForm, selectPhotoIndex} = this.state;

    if (!!restaurant && !!photos) {
      switch (pageForm) {
        case PAGE_SINGLE_SELECTED_PHOTO_FORM:
          return (<div>
              <Telescope.components.IEAPhotosSingleLayout {...this.state}/>
            </div>
          )
        case PAGE_MAIN_FORM:
          return (<div>
              <Telescope.components.IEARestaurantsLayout  {...this.state}/>
            </div>
          )
        case PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY:
          return (<div>
              <Telescope.components.IEARestaurantsLayout  {...this.state}/>
              <Telescope.components.IEAPhotosSelectionLayout
                {...this.state}/>
            </div>
          )
        case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
          return (<div>
              <Telescope.components.IEAPhotosBrowserLayout {...this.state}/>
              <Telescope.components.IEAPhotosSelectionLayout
                {...this.state}/>
            </div>
          )
        case PAGE_PHOTOS_BROWSER_FORM:
          return (<div>
              <Telescope.components.IEAPhotosBrowserLayout {...this.state}/>
            </div>
          )
        case PAGE_EDIT_FORM:
          return (<Telescope.components.IEAEditRestaurant
              {...this.state}
              dispatch={this.props.dispatch}/>
          )
      }
    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

  onPreIconClick() {
    const {photos, restaurant, pageForm, selectPhotoIndex} = this.state;
    const totalPhotosLength = photos.length;

    let preIndex = selectPhotoIndex - 1;
    if (preIndex < 0) preIndex = 0;
    this.setState({selectPhotoIndex: preIndex})

    this.props.router.push({pathname: this.porps.location.pathname, query: {select: photos[preIndex].id}})
  }

  onNextIconClick() {
    const {photos, selectPhotoIndex} = this.state;
    const totalPhotosLength = photos.length;

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

export default withRouter(connect(select)(DetailedRestaurant));

