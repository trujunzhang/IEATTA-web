import Telescope from '../../lib'
import React, {Component} from 'react'

const {
  loadRestaurantPage,
  loadEventPage,
  loadOrderedRecipePage,
} = require('../../../actions').default

const {
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
} = require('../../../lib/constants').default

const {
  getModelByObjectId,
} = require('../../filter/filterPosts')

const {
  getPageFormType,
} = require('../../filter/filterRoutes')

class DetailedReview extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      reviewType: props.params.reviewType,
      forObjectId: props.params.forObjectId,
      forObject: null,
      review: {},
      // Common
      pageForm: getPageFormType(props.params.reviewType, props, null),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      forObject: getModelByObjectId(nextProps, this.state.forObjectId, this.state.forObject),
      pageForm: getPageFormType(this.state.reviewType, nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    switch (this.state.reviewType) {
      case 'restaurant':
        this.props.dispatch(loadRestaurantPage(this.state.forObjectId))
        break;
      case 'event':
        this.props.dispatch(loadEventPage(this.state.forObjectId))
        break;
      case 'recipe':
        this.props.dispatch(loadOrderedRecipePage(this.state.forObjectId))
        break;
    }
  }

  render() {
    const {forObject, pageForm} = this.state;

    if (!!forObject) {
      switch (pageForm) {
        case PAGE_EDIT_FORM:
        case PAGE_NEW_FORM:
          return (<Telescope.components.IEAEditReviewLayout
              {...this.state}
              dispatch={this.props.dispatch}/>
          )
      }
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

export default connect(select)(DetailedReview)

