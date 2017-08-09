import Telescope from '../../lib'
import React, {Component} from 'react'

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


const {getModelByObjectId, getDefaultListTask, byListId} = require('../../filter/filterPosts')

const {
  getPageFormType,
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
      photosListTask: getDefaultListTask(photoTerms),
      photos: null,
      pageForm: getPageFormType(props, null),
      isPhotoBrowser: checkPhotosBrowser(props),
      isPhotoBrowserSelectionId: checkPhotosBrowserSelection(props),
      photosTerms: photoTerms,
      ready: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const isPhotoBrowser = checkPhotosBrowser(nextProps);
    const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(nextProps);
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
      photosListTask: photosListTask,
      photos: photosListTask.results,
      ready: true,
      pageForm: getPageFormType(nextProps, this.state.pageForm),
      isPhotoBrowser: isPhotoBrowser,
      isPhotoBrowserSelectionId: isPhotoBrowserSelectionId
    })
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }

  renderNormal() {

    const {isPhotoBrowser, isPhotoBrowserSelectionId, photos, ready, restaurant, isEdit} = this.state;

    const content = (isPhotoBrowser) ?
      (<Telescope.components.IEAPhotosBrowserLayout {...this.state}/>) :
      (<Telescope.components.IEARestaurantsLayout  {...this.state}/>)

    const overLayout =
      (!!isPhotoBrowserSelectionId) ?
        (<Telescope.components.IEAPhotosSelectionLayout {...this.state}/>) :
        null

    return (
      <div>
        {content}
        {overLayout}
      </div>
    )
  }

  render() {
    const {isPhotoBrowser, isPhotoBrowserSelectionId, photos, ready, restaurant, pageForm} = this.state;

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
              <Telescope.components.IEAPhotosSelectionLayout {...this.state}/>
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

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(DetailedRestaurant)

