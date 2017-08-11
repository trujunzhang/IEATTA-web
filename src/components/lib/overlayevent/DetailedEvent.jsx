import Telescope from '../../lib'
import React, {Component} from 'react'

const {
  loadEventPage,
  loadRestaurantPage,
  loadPhotosBrowser
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

class DetailedEvent extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      eid: props.params.eid,
      eslug: props.params.eslug,
      event: null,
      // Common
      pageForm: getPageFormType('event', props, null),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      event: getModelByObjectId(nextProps, this.state.eid, this.state.event),
      pageForm: getPageFormType('event', nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    this.props.dispatch(loadEventPage(this.state.eid))
  }

  render() {
    const {event, pageForm} = this.state;

    if (!!event) {
      switch (pageForm) {
        case PAGE_MAIN_FORM:
          return (<Telescope.components.IEAEventsLayout event={event}/>)
        case PAGE_EDIT_FORM:
          return (<Telescope.components.IEAEditEventLayout
              {...this.state}
              dispatch={this.props.dispatch}/>
          )
      }
    }

    return (
      <div className="placeholder_1WOC3">
        <div className="loader_54XfI animationRotate loader_OEQVm"/>
      </div>
    )
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(DetailedEvent)

