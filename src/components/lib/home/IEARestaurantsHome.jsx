import Telescope from '../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {loadRestaurantsList} = require('../../../actions').default
const {
  byListId,
  getDefaultListTask,
  generateMarkers,
  getMarker,
} = require('../../filter/filterPosts')

const {
  generateTermsForRestaurantList,
} = require('../../filter/filterRoutes')


/**
 * Make day wise groups on category pages, remove calendar widget from tag and source pages
 * So calendar will only show on “Homepage” and “Category” page
 * Homepage and category pages will have day wise groups
 */
class IEARestaurantsHome extends Component {

  constructor(props) {
    super(props)

    const terms = generateTermsForRestaurantList(props)

    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
      markers: [],
      defaultMarker: null,
      currentSearch: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const listTask = byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask);
    const markers = generateMarkers(nextProps.listContainerTasks, this.state.terms.listId);

    const defaultMarker = markers.length > 0 ? markers[0] : null;

    this.setState({
      listTask: listTask,
      markers: markers,
      defaultMarker: defaultMarker
    })


    const query = nextProps.location.query;
    const {currentSearch} = this.state;
    if ((!!query.search && query.search !== currentSearch || (!query.search && !!currentSearch))) {
      const searchTerms = generateTermsForRestaurantList(nextProps)
      const searchListTask = getDefaultListTask(searchTerms)

      this.setState({
        terms: searchTerms,
        listTask: searchListTask,
        markers: [],
        defaultMarker: null,
        currentSearch: query.search
      })

      this.loadMore(searchListTask, searchTerms)
    }

  }

  componentDidMount() {
    const {listTask, terms} = this.state;
    this.loadMore(listTask, terms)
  }

  loadMore(listTask, terms) {
    this.props.dispatch(loadRestaurantsList(listTask, terms))
  }

  onRestaurantItemHover(restaurant) {
    this.setState({defaultMarker: getMarker(restaurant)})
  }

  renderLeft() {
    return (
      <div className="column column-alpha ">
        <div className="results-wrapper indexed-biz-archive" id="restaurants_list_results">
          <div className="search-results-content">

            <Telescope.components.IEARestaurantsList
              key={"restaurantsList"}
              listTask={this.state.listTask}
              onRestaurantItemHover={this.onRestaurantItemHover.bind(this)}
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
        <Telescope.components.RestaurantsListRightMap {...this.state}/>
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

