import Telescope from '../../lib'
import React, {Component} from 'react'

import Records from "../../../lib/records";

const {
  loadRestaurantPage,
  loadEventPage,
  loadOrderedRecipePage,
} = require('../../../actions').default

const {
  PAGE_EDIT_FORM,
  PAGE_NEW_FORM,
  PARSE_RESTAURANTS,
  PARSE_EVENTS,
  PARSE_RECIPES
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

    const {reviewType, forObjectId} = props.params;
    const {objectSchemaName} = Records.realmObjects[reviewType]

    this.state = this.initialState = {
      reviewType: reviewType,
      forObjectId: forObjectId,
      // Page models
      forObject: null,
      review: {},
      // Common
      pageForm: getPageFormType(objectSchemaName, props, null),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // Page models
      forObject: getModelByObjectId(nextProps, this.state.forObjectId, this.state.forObject),
      // Common
      pageForm: getPageFormType(this.state.reviewType, nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    const {reviewType, forObjectId} = this.state;
    const {objectSchemaName} = Records.realmObjects[reviewType]
    switch (objectSchemaName) {
      case PARSE_RESTAURANTS:
        this.props.dispatch(loadRestaurantPage(forObjectId))
        break;
      case PARSE_EVENTS:
        this.props.dispatch(loadEventPage(forObjectId))
        break;
      case PARSE_RECIPES:
        this.props.dispatch(loadOrderedRecipePage(forObjectId))
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

    return (<Telescope.components.F8LoadingView loadingClass="placeholder_1WOC3"/>)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(DetailedReview)

