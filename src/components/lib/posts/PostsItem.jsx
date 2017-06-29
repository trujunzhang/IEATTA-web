import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {withRouter} from 'react-router'

class PostsItem extends Component {
  // A: Title + Image should open the “Read More” link - link to the original article
  // B: Title + Image in post list is like in post detail. click them will open original url?
  // A: YES

  renderContent() {
    const {post, listId} = this.props

    // debugger
    return (
      <div className={'row '}></div>
    )
  }

  renderThumbnail() {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post)

    if (imageSet.small) {
      return (
        <div className="post-thumbnail thumbnail_JX64A post-left-thumbnail">
          <div className="container_22rD3 post-list-thumbnail">
            <Telescope.components.BlurryImage
              imageId={post.id + '-thumbnail'}
              containerClass={'container__Ql6q lazyLoadContainer_3KgZD'}
              imageClass={'post-list-thumbnail'}
              imageSet={imageSet}
              width={'100%'}
              height={'100%'}
            />
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const {listId} = this.props
    if (typeof listId === 'undefined') {
      throw new Error('You need to set a proper List Id before using PostsItem')
    }
    return (
      <li className='postItem_block'>
        <div className="link_3fUGJ">
          {this.renderThumbnail()}
          {this.renderContent()}
        </div>
      </li>
    )
  }

}

export default withRouter(PostsItem)
