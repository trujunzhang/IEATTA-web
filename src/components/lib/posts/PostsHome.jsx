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
    return (
      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey"/>
        <div id="super-container" className="content-container">
          <div className="container">
            <div className="clearfix layout-block layout-a scroll-map-container search-results-block">
              <div className="column column-alpha ">
                <div className="results-wrapper indexed-biz-archive" id="restaurants_list_results"
                     data-component-bound="true">
                  <div className="search-results-content">
                    { this.renderPostList('list')}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostsHome)
