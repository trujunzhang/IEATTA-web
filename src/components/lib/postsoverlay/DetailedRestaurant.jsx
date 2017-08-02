import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadPostPage} = require('../../../actions').default

class DetailedRestaurant extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug
    }
  }

  componentDidMount() {
    this.props.dispatch(loadPostPage(this.state.rid))
  }

  render() {
    const {detailedRestaurantsOverlay} = this.props,
      {isFetching, currentModel} = detailedRestaurantsOverlay;

    if (isFetching) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.RestaurantsPage restaurant={currentModel.model}/>)
  }


}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedRestaurantsOverlay: store.detailedRestaurantsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(DetailedRestaurant)

