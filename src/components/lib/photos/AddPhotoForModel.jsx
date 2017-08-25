import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'


const {
  loadRestaurantPage,
  loadEventPage,
  loadOrderedRecipePage,
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

class AddPhotoForModel extends Component {

  constructor(props, context) {
    super(props)


    this.state = this.initialState = {
      modelType: props.params.modelType,
      forObjectId: props.params.forObjectId,
      // Detailed object
      forObject: null,
      // Common
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      // Page models
      forObject: getModelByObjectId(nextProps, this.state.forObjectId, this.state.forObject),
    })
  }


  componentDidMount() {
    switch (this.state.modelType) {
      case 'restaurant':
        this.props.dispatch(loadRestaurantPage(this.state.forObjectId))
        break;
      case 'event':
        this.props.dispatch(loadEventPage(this.state.forObjectId))
        break;
      case 'recipe':
        this.props.dispatch(loadOrderedRecipePage(this.state.forObjectId))
        break;
    }
  }


  render() {
    const {forObject} = this.state;

    if (!!forObject) {
      return (<Telescope.components.IEAAddPhotosLayout
        {...this.state}
        dispatch={this.props.dispatch}/>)
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

export default withRouter(connect(select)(AddPhotoForModel));

