import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import Posts from '../../../lib/posts'

import {withRouter} from 'react-router'
let md5 = require('blueimp-md5')

/**
 * Make day wise groups on category pages, remove calendar widget from tag and source pages
 * So calendar will only show on “Homepage” and “Category” page
 * Homepage and category pages will have day wise groups
 */
class PostsHome extends Component {
  constructor(props) {
    super(props)

    this.state = this.initialState = {
      // Navigation menu
    }
  }

  renderPostList(key) {
    const {params, location} = this.props,
      limit = Telescope.settings.get('postsPerPage', 10)

    const terms = {...params, listId: 'posts.list.main', view: 'new', limit: limit}

    // debugger

    return (
      <Telescope.components.PostsList
        key={key}
        limit={limit}
        terms={terms}
        listId={'single-list-view'}/>
    )
  }

  render() {
    const {params, location} = this.props
    const paramsLength = Object.keys(params).length

    // const key = md5(location.pathname)
    const key = 'list'
    return this.renderPostList(key)
  }
}

export default withRouter(PostsHome)
