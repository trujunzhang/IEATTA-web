import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadRestaurantPage} = require('../../../actions').default

class DetailedEvent extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      eid: props.params.eid,
      eslug: props.params.eslug
    }
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
  }

  render() {
    const {detailedEventsOverlay} = this.props,
      {isFetching, currentModel} = detailedEventsOverlay;

    if (isFetching) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.IEAEventsPage restaurant={currentModel.model}/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedEventsOverlay: store.detailedEventsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(DetailedEvent)

