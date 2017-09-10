import Telescope from '../../lib'
import React, {Component} from 'react'

import Reviews from "../../../lib/reviews";
import AppConstants from "../../../lib/appConstants";

const {
  loadReviewPage,
  loadRestaurantPage,
  loadEventPage,
  loadOrderedRecipePage,
} = require('../../../actions').default

const {
  MODEL_FORM_TYPE_EDIT,
  MODEL_FORM_TYPE_NEW,
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

    const {params, location} = props;
    const {reviewType, forObjectId} = params;

    const {objectSchemaName} = AppConstants.realmObjects[reviewType]

    this.state = this.initialState = {
      reviewId: location.query.reviewId,
      reviewType: reviewType,
      forObjectId: forObjectId,
      // Page models
      forObject: null,
      review: null,
      // Common
      pageForm: getPageFormType(objectSchemaName, props, null),
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger

    const _forObject = getModelByObjectId(nextProps, this.state.forObjectId, this.state.forObject);
    const _review = getModelByObjectId(nextProps, this.state.reviewId, this.state.review);

    debugger

    this.setState({
      // Page models
      forObject: _forObject,
      review: _review,
      // Common
      pageForm: getPageFormType(this.state.reviewType, nextProps, this.state.pageForm),
    })
  }

  componentDidMount() {
    const {reviewType, reviewId, forObjectId, pageForm} = this.state;
    const {objectSchemaName} = AppConstants.realmObjects[reviewType]

    switch (pageForm) {
      case  MODEL_FORM_TYPE_EDIT:
        this.props.dispatch(loadReviewPage(reviewId))
        break;
      case  MODEL_FORM_TYPE_NEW:
        break;
    }

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
    const {pageForm} = this.state;

    if (Reviews.canShowPage(this.state)) {

      debugger

      switch (pageForm) {
        case MODEL_FORM_TYPE_EDIT:
        case MODEL_FORM_TYPE_NEW:
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

