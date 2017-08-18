import Telescope from '../../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {loadReviewsList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')
const {generateTermsForReviewsList} = require('../../../filter/filterRoutes')

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../../lib/constants').default

class ReviewsList extends Component {

  constructor(props) {
    super(props)

    const terms = generateTermsForReviewsList(props)
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms)
    }
  }

  componentWillReceiveProps(nextProps) {
    const terms = generateTermsForReviewsList(nextProps)
    // const query = terms.

    debugger

    this.setState({
      terms: terms,
      listTask: byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const terms = this.state.terms;
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadReviewsList(nextListTask, terms))
  }


  renderRowItem(review, index) {
    const reviewListType = this.props.reviewListType || REVIEW_LIST_TYPE_NORMAL;

    switch (reviewListType) {
      case REVIEW_LIST_TYPE_NORMAL:
        return (<Telescope.components.ReviewsItem key={review.id} review={review}/>)
      case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
        return (<Telescope.components.ReviewsItemForUserProfile key={review.id} review={review}/>)
    }

  }

  renderRows() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask;

    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    } else if (!!results && results.length) {
      return (
        <ul className="ylist ylist-bordered reviews">
          {results.map((review, index) => {
              return this.renderRowItem(review, index)
            }
          )}
        </ul>
      )
    } else {
      return (
        <Telescope.components.F8EmptySection
          title={`No reviews`}
          text="You can add new reviews clicking the 'Add review' button."/>
      )
    }
  }


  render() {
    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
      limit,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;

    return (
      <div className="feed">
        <Telescope.components.ReviewsHeaderView  {...this.props}/>

        <div className="review-list" id="position-relative">

          {this.renderRows()}

        </div>
      </div>
    )
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(ReviewsList));
