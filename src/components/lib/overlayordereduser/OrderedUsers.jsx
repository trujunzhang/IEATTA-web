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
      peopleInEventId: props.params.peopleInEventId,
      // Detailed object
      peopleInEvent: null,
      orderedUser: null,
      forEvent: null,
      forRestaurant: null,
      orderedRecipes: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const peopleInEvent = getModelByObjectId(nextProps, this.state.peopleInEventId, this.state.peopleInEvent)

    this.setState({
      peopleInEvent: peopleInEvent,
      orderedUser: peopleInEvent.user,
      forEvent: peopleInEvent.event,
      forRestaurant: peopleInEvent.restaurant,
      orderedRecipes: peopleInEvent.recipes
    })
  }

  componentDidMount() {
    this.props.loadPeopleInEventPageAction(this.state.peopleInEventId)
  }

  render() {
    const {orderedUser, forRestaurant, forEvent} = this.state;

    if (!!orderedUser && !!forRestaurant && !!forEvent) {
      return (<Telescope.components.IEAOrderedUsersLayout {...this.state}/>)
    }

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

const {connect} = require('react-redux')

function mapDispatchToProps(dispatch) {
  return {
    //Model
    //List
    loadPeopleInEventPageAction: (parseId) => dispatch(loadPeopleInEventPage(parseId)),
  }
}

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select, mapDispatchToProps)(OrderedUsers)

