import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadEventsList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts').default

class EventsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listId: 'single-list-view',
      listTask: byListId(props.listContainerTasks, props.listId, props.limit)
    }
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const terms = {

    }
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadEventsList(nextListTask, this.state.listId, terms))
  }

  render() {
    const {detailedRestaurantsOverlay} = this.props,
      {isFetchingRelated} = detailedRestaurantsOverlay,
      results = detailedRestaurantsOverlay.currentRelatedPosts || []

    if (!isFetchingRelated && !!results.length) {
      return (
        <div>
          {results.map(post =>
            <Telescope.components.EventsItem key={post.id} post={post}/>
          )}
        </div>
      )
    } else if (isFetchingRelated) {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsLoading id='load.more.hint.posts'/>
        </section>
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

/**
 * ## Imports
 *
 * Redux
 */
const {connect} = require('react-redux')

function select(store) {
  return {
    detailedRestaurantsOverlay: store.detailedRestaurantsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(EventsList)
