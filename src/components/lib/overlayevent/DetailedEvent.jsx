import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadEventPage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class DetailedEvent extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      eid: props.params.eid,
      eslug: props.params.eslug,
      event: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      event: getModelByObjectId(nextProps, this.state.eid, this.state.event),
    })
  }

  componentDidMount() {
    this.props.dispatch(loadEventPage(this.state.eid))
  }

  render() {
    const {event} = this.state;

    if (!!event) {
      return (<Telescope.components.IEAEventsLayout event={event}/>)
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

