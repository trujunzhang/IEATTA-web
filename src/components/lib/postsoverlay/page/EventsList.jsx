import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadEventsList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts').default

class EventsList extends Component {

  constructor(props) {
    super(props)

    const terms = {
      listId: 'single-list-view-for-events',
      limit: 10,
      restaurantId: props.restaurant.id
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms.listId, terms.limit)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms.listId, this.state.terms.limit)
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
    this.props.dispatch(loadEventsList(nextListTask, terms.listId, terms))
  }

  render(){
   return(

   )
  }

  renderContent() {
    const {
      listId,
      showHeader = false,
      title,
      showClose = false,
      infinite = false,
      dismissBanner = null
    } = this.props

    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;

    if (!ready) {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsLoading id='load.more.hint.posts'/>
        </section>
      )
    }
    else if (!!results && !!results.length) {
      return (
        <div>
          {results.map(event =>
            <Telescope.components.EventsItem key={event.id} event={event}/>
          )}
        </div>
      )
    } else {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsNoResults relatedList={true}/>
        </section>
      )
    }
  }
}

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(EventsList)
