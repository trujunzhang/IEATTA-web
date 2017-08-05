import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadReviewsList} = require('../../../actions').default

const {byListId} = require('../../filter/filterPosts')

class ReviewsList extends Component {

  constructor(props) {
    super(props)

    const terms = {
      ...this.props,
      listId: 'reviews-list-view-for-' + props.forObject.id,
      limit: 10
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms)
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


  renderRows() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask;

    if (!ready ) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    }

    return (

      <ul className="ylist ylist-bordered reviews" data-component-bound="true">
        {results.map(review =>
          <Telescope.components.ReviewsItem key={review.id} review={review}/>
        )}
      </ul>
    )
  }

  renderEmptySection() {

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

export default connect(select)(ReviewsList)
