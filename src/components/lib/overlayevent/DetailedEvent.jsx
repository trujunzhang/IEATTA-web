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
  PAGE_ORDERED_USERS_IN_EVENT,
  CLOUD_STATISTIC_FOR_REVIEWS,
  PARSE_EVENTS
} = require('../../../lib/constants').default

const {getModelByObjectId} = require('../../filter/filterPosts')
const {getPageFormType} = require('../../filter/filterRoutes')

class DetailedEvent extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      eid: props.params.eid,
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
    const parseId = this.state.eid;
    this.props.dispatch(loadEventPage(parseId))

    const {pageForm} = this.state;

    switch (pageForm) {
      case PAGE_ORDERED_USERS_IN_EVENT:
        break;
      default:
        this.props.dispatch(invokeParseCloudMethod(CLOUD_STATISTIC_FOR_REVIEWS, {
          reviewType: this.state.modelType,
          forObjectId: parseId,
        }, parseId))
        break;
    }
  }

  render() {
    const {forObject, pageForm, reviewStatistic} = this.state;
    if (!!forObject) {
      switch (pageForm) {
        case PAGE_ORDERED_USERS_IN_EVENT:
          return (<Telescope.components.IEAOrderedUsersInEventsLayout
            {...this.props}
            {...this.state}/>)
      }

      if (!!reviewStatistic) {
        switch (pageForm) {
          case PAGE_MAIN_FORM:
            return (<Telescope.components.IEAEventsLayout  {...this.state}/>)
          case MODEL_FORM_TYPE_EDIT:
            return (<Telescope.components.IEAEditEventLayout
                forRelationObject={forObject.restaurant}
                {...this.state}
                dispatch={this.props.dispatch}/>
            )
        }

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

