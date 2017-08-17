import Telescope from '../../lib'
import React, {Component} from 'react'

const {
  loadPeopleInEventPage,
  loadUserProfilePage,
  loadEventPage,
  loadRestaurantPage
} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class OrderedUsers extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      pid: props.params.pid,
      // Detailed object
      peopleInEvent: null,
      orderedUser: null,
      forEvent: null,
      forRestaurant: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const peopleInEvent = getModelByObjectId(nextProps, this.state.pid, this.state.peopleInEvent)

    this.setState({
      peopleInEvent: peopleInEvent,
      orderedUser: peopleInEvent.user,
      forEvent: peopleInEvent.event,
      forRestaurant: peopleInEvent.restaurant,
    })
  }

  componentDidMount() {
    this.props.dispatch(loadPeopleInEventPage(this.state.pid))
  }

  render() {
    const {orderedUser, forRestaurant, forEvent} = this.state;

    if (!!orderedUser && !!forRestaurant && !!forEvent) {
      return (<Telescope.components.IEAOrderedUsersLayout {...this.state}/>)
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

export default connect(select)(OrderedUsers)

