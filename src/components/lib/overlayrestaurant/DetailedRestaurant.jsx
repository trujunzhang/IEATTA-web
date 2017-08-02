import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadRestaurantPage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts').default

class DetailedRestaurant extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      isFetching: true,
      restaurant: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
      isFetching: false
    })
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
  }

  render() {
    const {isFetching, restaurant} = this.state;

    if (isFetching) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.IEARestaurantsPage restaurant={restaurant}/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(DetailedRestaurant)

