import Telescope from '../index'
import React, {Component} from 'react'

class PostsHomeList extends Component {

  render() {
    const {results, hasMore, ready, title, showHeader, showClose, dismissBanner, loadMore, listId} = this.props
    return (

      <ul className="ylist ylist-bordered search-results">
        <li className="regular-search-result">
          {results.map((post, index) =>
            <Telescope.components.PostsItem
              listId={listId}
              key={post.id}
              post={post}
              type="save"
              canEdit={false}/>
          )}
        </li>
      </ul>
    )
  }

}

export default PostsHomeList

