import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadOrderedUserPage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class IEAOrderedUsers extends Component {
  constructor(props, context) {
    super(props)

    // path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:rid)',

    this.state = this.initialState = {
      uid: props.params.uid,
      uslug: props.params.uslug,
      eid: props.params.eid,
      rid: props.params.rid,
      orderedUser: null,
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderedUser: getModelByObjectId(nextProps, this.state.eid, this.state.orderedUser),
      ready: true
    })
  }

  componentDidMount() {
    this.props.dispatch(loadOrderedUserPage(this.state.uid))
  }

  render() {
    const {ready, orderedUser} = this.state;

    if (!ready) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    debugger

    return (<Telescope.components.IEAEventsPage orderedUser={orderedUser}/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(IEAOrderedUsers)

