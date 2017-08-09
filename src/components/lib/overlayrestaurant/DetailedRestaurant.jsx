import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {
  loadRestaurantPage,
  loadPhotosBrowser
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
      ready: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const isPhotoBrowser = checkPhotosBrowser(nextProps);
    const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(nextProps);
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
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

  render() {
    const {isPhotoBrowser, isPhotoBrowserSelectionId, photos, ready, restaurant, isEdit} = this.state;

    if (!!restaurant && !!photos) {

      if (isPhotoBrowser) {
        if (!!isPhotoBrowserSelectionId) {
          return (<Telescope.components.IEARestaurantsLayout  {...this.state}/>)
        } else {
          return (<Telescope.components.IEARestaurantsLayout  {...this.state}/>)
        }
      }
      if (isEdit) {
        return (<Telescope.components.IEAEditRestaurant
          {...this.state}
          dispatch={this.props.dispatch}/>)
      }
      return (<Telescope.components.IEARestaurantsLayout  {...this.state}/>)
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

