import Telescope from '../../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {loadReviewsList} = require('../../../../actions').default

const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')

import PaginationTerms from "../../../../lib/paginationTerms";

const {
  // Review List Type
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../../lib/constants').default

class ReviewsList extends Component {

  constructor(props) {
    super(props)

    const terms = PaginationTerms.generateTermsForReviewsList(props)
    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    const lastSort = this.state.terms.sort_by || '';

    const newTerms = PaginationTerms.generateTermsForReviewsList(nextProps)
    const newListTask = byListId(nextProps, newTerms, this.state.listTask);

    this.setState({
      terms: newTerms,
      listTask: newListTask
    })

    const newSort = newTerms.sort_by || '';
    /**
     *  Because different sort parameter changed here.
     *  So need to reset all query parameters container 'pageIndex'.
     */
    if (lastSort !== newSort) {
      const resetListTask = getDefaultListTask(newTerms);
      this.setState({
        listTask: resetListTask
      })
      this.props.dispatch(loadReviewsList(resetListTask, newTerms))
    }
  }

  componentDidMount() {
    const {terms, listTask} = this.state;
    this.props.dispatch(loadReviewsList(listTask, terms))
  }

  renderRowItem(review, index) {
    const {listTask} = this.state;
    const {reviewListType} = this.props;

    switch (reviewListType) {
      case REVIEW_LIST_TYPE_NORMAL:
        return (<Telescope.components.ReviewsItem
          key={review.id}
          listTask={listTask}
          review={review}/>)
      case REVIEW_LIST_TYPE_USER_PROFILE_ABOUT:
        return (<Telescope.components.ReviewsItemForUserProfile
          key={review.id}
          listTask={listTask}
          review={review}/>)
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
      return (<Telescope.components.F8LoadingView/>)
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
    const {showHeaderTitle} = this.props;

    return (
      <div className="feed">

        {
          showHeaderTitle &&
          <Telescope.components.ReviewsHeaderView  {...this.props}/>
        }

        <div className="review-list" id="position-relative">
          {this.renderRows()}
        </div>
      </div>
    )
  }

}


ReviewsList.propTypes = {
  showHeaderTitle: React.PropTypes.bool,
  reviewListType: React.PropTypes.string
};

ReviewsList.defaultProps = {
  showHeaderTitle: true,
  reviewListType: REVIEW_LIST_TYPE_NORMAL
};

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(ReviewsList));
