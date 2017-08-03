import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

let md5 = require('blueimp-md5')

const {loadRestaurantsList} = require('../../../actions').default
const {byListId, getDefaultListTask, generateMarkers} = require('../../filter/filterPosts')

/**
 * Make day wise groups on category pages, remove calendar widget from tag and source pages
 * So calendar will only show on “Homepage” and “Category” page
 * Homepage and category pages will have day wise groups
 */
class IEARestaurantsHome extends Component {

  constructor(props) {
    super(props)

    const {params, location} = props;

    debugger
    const terms = {
      ...params,
      limit: 10,
      listId: 'single-list-view-for-restaurants'
    }
    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
      markers: generateMarkers(props.listContainerTasks, props.listId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask),
      markers: generateMarkers(nextProps.listContainerTasks, this.state.terms, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadRestaurantsList(nextListTask, this.state.terms))
  }

  renderLeft() {
    return (
      <div className="column column-alpha ">
        <div className="results-wrapper indexed-biz-archive" id="restaurants_list_results">
          <div className="search-results-content">

            <Telescope.components.IEARestaurantsList
              key={"restaurantsList"}
              listTask={this.state.listTask}
              loadMore={this.loadMore.bind(this)}
            />

          </div>
        </div>
      </div>
    )
  }

  renderRight() {
    return (
      <div className="column column-beta ">
        <Telescope.components.RestaurantsListRightMap
          marks={this.state.markers}
          listId={this.state.terms.listId}/>
      </div>
    )
  }


  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey"/>
        <div id="super-container" className="content-container">
          <div className="container">
            <div className="clearfix layout-block layout-a scroll-map-container search-results-block">
              {this.renderLeft()}
              {this.renderRight()}
            </div>
          </div>
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

export default withRouter(connect(select)(IEARestaurantsHome))

