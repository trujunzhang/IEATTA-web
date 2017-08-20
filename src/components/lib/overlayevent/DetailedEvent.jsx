import Telescope from '../../lib'
import React, {Component} from 'react'

const {
  loadEventPage,
  loadRestaurantPage,
  loadPhotosBrowser,
  loadStatisticCloudPage
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
  STATISTIC_FOR_REVIEWS,
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
      pageForm: getPageFormType('event', props, null),
      modelType: 'event',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // Detailed object
      forObject: getModelByObjectId(nextProps, this.state.eid, this.state.forObject),
      reviewStatistic: getModelByObjectId(nextProps, this.state.eid, this.state.reviewStatistic, 'statistic'),
      // Common
      pageForm: getPageFormType('event', nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    this.props.dispatch(loadEventPage(this.state.eid))
    this.props.dispatch(loadStatisticCloudPage(STATISTIC_FOR_REVIEWS, {
      reviewType: this.state.modelType,
      forObjectId: this.state.eid,
    }, this.state.eid))
  }

  render() {
    const {forObject, pageForm, reviewStatistic} = this.state;

    if (!!forObject && !!reviewStatistic) {
      switch (pageForm) {
        case PAGE_MAIN_FORM:
          return (<Telescope.components.IEAEventsLayout  {...this.state}/>)
        case PAGE_EDIT_FORM:
        case PAGE_NEW_FORM:
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

