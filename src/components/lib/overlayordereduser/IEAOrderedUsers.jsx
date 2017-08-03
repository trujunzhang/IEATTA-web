import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadEventPage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class IEAOrderedUsers extends Component {
  constructor(props, context) {
    super(props)

    // path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:eslug)/(:rid)/(:rslug)',

    this.state = this.initialState = {
      uid: props.params.uid,
      uslug: props.params.uslug,
      eid: props.params.eid,
      eslug: props.params.eslug,
      rid: props.params.rid,
      rslug: props.params.rslug,
      isFetching: true,
      orderedUser: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderedUser: getModelByObjectId(nextProps, this.state.eid, this.state.orderedUser),
      isFetching: false
    })
  }

  componentDidMount() {
    this.props.dispatch(loadEventPage(this.state.eid))
  }

  render() {
    const {isFetching, event} = this.state;

    if (isFetching) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.IEAEventsPage event={event}/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(IEAOrderedUsers)

