import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {
  PAGE_MAIN_FORM,
  PAGE_EDIT_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_ONLY_SELECTED_PHOTO_FORM,
} = require('../../../actions').default


const {getModelByObjectId, getDefaultListTask, byListId} = require('../../filter/filterPosts')

const {
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
      isEdit: checkEdit(props),
      isPhotoBrowser: checkPhotosBrowser(props),
      isPhotoBrowserSelectionId: checkPhotosBrowserSelection(props),
      photosTerms: photoTerms,
      pageForm: PAGE_MAIN_FORM,
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
      isEdit: checkEdit(nextProps),
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
    const {isPhotoBrowser, isPhotoBrowserSelectionId, photos, ready, restaurant, isEdit} = this.state;

    if (!!restaurant && !!photos) {
      if (isEdit) {
        return (<Telescope.components.IEAEditRestaurant
          {...this.state}
          dispatch={this.props.dispatch}/>)
      }

      return this.renderNormal()
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

