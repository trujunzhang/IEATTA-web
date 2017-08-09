import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadEventsList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')

class EventsList extends Component {

  constructor(props) {
    super(props)

    const terms = {
      listId: 'event-list-view-for-' + props.restaurant.id,
      limit: 10,
      restaurantId: props.restaurant.id
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms,this.state.listTask)
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
    this.props.dispatch(loadEventsList(nextListTask, terms))
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
        <ul className="ylist ylist-bordered">
          {results.map(event =>
            <Telescope.components.EventsItem key={event.id} event={event}/>
          )}
        </ul>
      )
    } else {
      return (
        <Telescope.components.F8EmptySection
          title={`No Events`}
          text="You can add new events clicking the 'Add Event' button."/>
      )
    }
  }

  renderEmptySection() {
    return (
      <div>

      </div>
    )
  }

  renderTitle() {
    return (
      <div className="arrange">
        <div className="arrange_unit arrange_unit--fill">
          <h2>Events</h2>
        </div>
      </div>
    )
  }

  render() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;


    return (
      <div className="ysection events">

        {this.renderTitle()}

        {this.renderRows()}
        {this.renderEmptySection()}

        <div className="u-space-t2 u-space-b2">
          {/*<a href="/events/sf/browse">View all events in San Francisco</a>*/}
        </div>

      </div>
    )
  }

  renderContent() {
    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;


  }
}

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(EventsList)
