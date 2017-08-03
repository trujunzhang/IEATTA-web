import Telescope from '../../../lib'
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
      listTask: byListId(props.listContainerTasks, terms),
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms),
      ready: true
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
    const {listTask, ready} = this.state;

    const {
      results,
      totalCount,
    } = listTask;

    debugger

    return (
      <ul className="ylist ylist-bordered">
        {results.map(review =>
          <Telescope.components.ReviewsItem key={review.id} review={review}/>
        )}
      </ul>
    )
  }

  renderEmptySection() {

  }


  render() {
    const {listTask, ready} = this.state

    const {
      results,
      totalCount,
      limit,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;

    return (
      <div className="ysection reviews">

        <div className="arrange">
          <div className="arrange_unit arrange_unit--fill">
            <h2>Reviews</h2>
          </div>
        </div>

        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          <a href="/events/sf/browse">View all events in San Francisco</a>
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
