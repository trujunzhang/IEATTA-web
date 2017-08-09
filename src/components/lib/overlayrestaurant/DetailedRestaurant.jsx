import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {
  loadRestaurantPage,
  loadPhotosBrowser
} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')
const {
  checkEdit,
  checkPhotosBrowser,
  checkPhotosBrowserSelection
} = require('../../filter/filterRoutes')

class DetailedRestaurant extends Component {

  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      restaurant: null,
      isEdit: checkEdit(props),
      isPhotoBrowser: checkPhotosBrowser(props),
      isPhotoBrowserSelectionId: checkPhotosBrowserSelection(props),
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const isPhotoBrowser = checkPhotosBrowser(nextProps);
    const isPhotoBrowserSelectionId = checkPhotosBrowserSelection(nextProps);

    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.rid, this.state.restaurant),
      ready: true,
      isEdit: checkEdit(nextProps),
      isPhotoBrowser: isPhotoBrowser,
      isPhotoBrowserSelectionId: isPhotoBrowserSelectionId
    })
    // Check if the last is not the photos browser.
    if (!this.state.isPhotoBrowser && isPhotoBrowser) {
      if (!this.state.isPhotoBrowserSelectionId && !!isPhotoBrowserSelectionId) {

      } else {

      }
    }
  }

  componentDidMount() {
    this.props.dispatch(loadRestaurantPage(this.state.rid))
    this.props.dispatch(loadPhotosBrowser(this.state.rid))
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

