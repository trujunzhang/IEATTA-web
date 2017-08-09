import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {loadRestaurantPage} = require('../../../actions').default
const {getModelByObjectId} = require('../../filter/filterPosts')
const {checkEdit, checkPhotoBrowser, checkPHotoBrowserSelection} = require('../../filter/filterRoutes')

class DetailedRestaurant extends Component {

  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      restaurant: null,
      isEdit: checkEdit(props),
      ready: false
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
      ready: true,
      isEdit: checkEdit(nextProps)
    })
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
  }

  render() {
    const {ready, restaurant, isEdit} = this.state;

    if (!!restaurant) {
      if (isEdit) {
        return (<Telescope.components.IEAEditRestaurant  {...this.state}
                                                         dispatch={this.props.dispatch}/>)
      }
      return (<Telescope.components.IEARestaurantsLayout  {...this.state}/>)
    }


    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)

  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(DetailedRestaurant)

