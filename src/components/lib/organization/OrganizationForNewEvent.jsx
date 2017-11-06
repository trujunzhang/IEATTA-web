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
} = require('../../../lib/constants').default

const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

import AppConstants from "../../../lib/appConstants";

class OrganizationForNewEvent extends Component {

  constructor(props, context) {
    super(props)

    const {modelType, forObjectId} = props.params;
    const {objectSchemaName} = AppConstants.realmObjects[modelType]

    this.state = this.initialState = {
      // Detailed object
      forObject: AppConstants.generateNewEventParseObject(),
      forRelationObject: null,
      // Common
      pageForm: MODEL_FORM_TYPE_NEW,
      forObjectId,
      modelType,
      objectSchemaName,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {forObjectId} = nextProps.params;
    const newRestaurant = getModelByObjectId(nextProps, forObjectId, this.state.forRelationObject);

    this.setState({
      // Detailed object
      forRelationObject: newRestaurant,
    })
  }

  componentDidMount() {
    const parseId = this.state.forObjectId;
    this.props.loadRestaurantPageAction(parseId)
  }

  render() {
    const {forObject, forRelationObject, pageForm} = this.state;

    if (!!forRelationObject && forObject) {
      switch (pageForm) {
        case MODEL_FORM_TYPE_NEW:
          return (<Telescope.components.IEAEditEventLayout
              {...this.state}
              {...this.props}
            />
          )
      }
    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    // Edit Model
    actions: bindActionCreators(editModelActions, dispatch),
    writeOnlineParseObjectAction: (object) => dispatch(writeOnlineParseObject(object)),
    showAlertMessageAction: (object) => dispatch(showAlertMessage(object)),
    //Model
    loadRestaurantPageAction: (parseId) => dispatch(loadRestaurantPage(parseId)),
  }
}

function select(store, ownProps) {
  return {
    editModel: store.editModel,
    goBack: ownProps.router.goBack,
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select, mapDispatchToProps)(OrganizationForNewEvent));

