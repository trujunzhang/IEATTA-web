import Telescope from '../../lib'
import React, {Component} from 'react'

const {
  loadEventPage,
  loadRestaurantPage,
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
  PARSE_EVENTS
} = require('../../../lib/constants').default

const {
  getModelByObjectId,
} = require('../../filter/filterPosts')

const {
  generatePhotoTerm,
  getPageFormType,
  getSelectPhoto,
} = require('../../filter/filterRoutes')

class DetailedEvent extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      eid: props.params.eid,
      eslug: props.params.eslug,
      // Detailed object
      forObject: null,
      reviewStatistic: null,
      // Common
      pageForm: getPageFormType(PARSE_EVENTS, props, null),
      modelType: 'event',
    }
  }

  componentWillReceiveProps(nextProps) {
    const newEvent = getModelByObjectId(nextProps, this.state.eid, this.state.forObject)
    this.setState({
      // Detailed object
      forObject: newEvent,
      reviewStatistic: getModelByObjectId(nextProps, this.state.eid, this.state.reviewStatistic, 'statistic'),
      // Common
      pageForm: getPageFormType(PARSE_EVENTS, nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    const objectId = this.state.eid;
    this.props.dispatch(loadEventPage(objectId))
    this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
      reviewType: this.state.modelType,
      forObjectId: objectId,
    }, objectId))
  }

  render() {
    const {forObject, pageForm, reviewStatistic} = this.state;

    if (!!forObject && !!reviewStatistic) {
      switch (pageForm) {
        case PAGE_MAIN_FORM:
          return (<Telescope.components.IEAEventsLayout  {...this.state}/>)
        case MODEL_FORM_TYPE_EDIT:
        case MODEL_FORM_TYPE_NEW:
          return (<Telescope.components.IEAEditEventLayout
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
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(DetailedEvent)

