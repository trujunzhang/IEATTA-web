import Telescope from '../../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {loadReviewsList} = require('../../../../actions').default

const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')
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
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    const lastSort = this.state.terms.sort_by || '';
    const newTerms = generateTermsForReviewsList(nextProps)
    const newSort = newTerms.sort_by || '';

    this.setState({
      terms: newTerms,
      listTask: byListId(nextProps.listContainerTasks, newTerms.listId, this.state.listTask)
    })

    if (lastSort !== newSort) {
      // this.loadMore(terms, listTask)
    }
  }

  componentDidMount() {
    const {terms, listTask} = this.state.terms;
    this.loadMore(terms, listTask)
  }

  loadMore(terms, listTask) {
    this.props.dispatch(loadReviewsList(listTask, terms))
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
