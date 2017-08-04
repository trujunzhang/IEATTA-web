import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadOrderedUserPage, loadEventPage, loadRestaurantPage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class OrderedUsers extends Component {
  constructor(props, context) {
    super(props)

    // path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:rid)',

    this.state = this.initialState = {
      uid: props.params.uid,
      uslug: props.params.uslug,
      eid: props.params.eid,
      rid: props.params.rid,
      orderedUser: null,
      forEvent: null,
      forRestaurant: null,
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderedUser: getModelByObjectId(nextProps, this.state.uid, this.state.orderedUser),
      forEvent: getModelByObjectId(nextProps, this.state.eid, this.state.forEvent),
      forRestaurant: getModelByObjectId(nextProps, this.state.rid, this.state.forRestaurant),
      ready: true
    })
  }

  componentDidMount() {
    this.props.dispatch(loadOrderedUserPage(this.state.uid))
    this.props.dispatch(loadRestaurantPage(this.state.rid))
    this.props.dispatch(loadEventPage(this.state.eid))
  }

  render() {
    const {ready, orderedUser, forRestaurant, forEvent} = this.state;

    if (!ready) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.IEAOrderedUsersLayout {...this.state}/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(OrderedUsers)

