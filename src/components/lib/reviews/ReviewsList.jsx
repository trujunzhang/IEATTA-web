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

    return (
      <ul className="ylist ylist-bordered">
        {results.map(event =>
          <Telescope.components.EventsItem key={event.id} event={event}/>
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
      <div className="ysection">

        <div className="arrange arrange--12 arrange--baseline">

          <div className="arrange_unit nowrap">
            <h3 className="subscribe-list_title">Who's in?</h3>
          </div>

          <div className="arrange_unit arrange_unit--fill">
            <span>90 responses</span>
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
