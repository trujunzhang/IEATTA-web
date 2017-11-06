import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'


import AppConstants from "../../../lib/appConstants";

const {
  loadRestaurantPage,
  loadEventPage,
  loadOrderedRecipePage,
  loadUserProfilePage,
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
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
} = require('../../../lib/constants').default


const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')


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
    const {objectSchemaName} = AppConstants.realmObjects[this.state.modelType]
    switch (objectSchemaName) {
      case PARSE_RESTAURANTS:
        this.props.dispatch(loadRestaurantPage(this.state.forObjectId))
        break;
      case PARSE_EVENTS:
        this.props.dispatch(loadEventPage(this.state.forObjectId))
        break;
      case PARSE_RECIPES:
        this.props.dispatch(loadOrderedRecipePage(this.state.forObjectId))
        break;
      case PARSE_USERS:
        this.props.dispatch(loadUserProfilePage(this.state.forObjectId))
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

