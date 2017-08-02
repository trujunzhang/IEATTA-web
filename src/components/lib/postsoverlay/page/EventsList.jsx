import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadPostsList} = require('../../../../actions').default

const {
  OVERLAY_LOADED_RELATED_POSTS
} = require('../../../../lib/constants').default

const RELATED_POSTS_COUNT = 6

class EventsList extends Component {

  componentDidMount() {
    const listTask = {
      pageIndex: 1,
      limit: RELATED_POSTS_COUNT
    }
    const terms = {
      related: {id: this.props.post.id, author: this.props.post.author}
    }
    this.props.dispatch(loadPostsList(listTask, 'posts.related.list', terms, OVERLAY_LOADED_RELATED_POSTS))
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
