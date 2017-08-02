import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'

const {loadRestaurantsList} = require('../../../actions').default
const {byListId} = require('../../filter/filterPosts').default

class IEARestaurantsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listTask: byListId(props.listContainerTasks, props.listId, props.limit)
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, nextProps.listId, nextProps.limit)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadRestaurantsList(nextListTask, this.props.listId, this.props.terms))
  }

  render() {
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

    let hasMore = !ready && totalCount !== results.length

    const showReady = Posts.showReady(results, hasMore, ready, totalCount, limit, firstPagination)


    if (showReady) {
      return (
        <section className='results_37tfm'>
          <Telescope.components.RestaurantsLoading id={'load.more.hint.posts'}/>
        </section>
      )
    } else if (!!results && !!results.length) {
      return (
        <Telescope.components.RestaurantsHomeList
          infinite={infinite}
          results={results}
          limit={limit}
          hasMore={hasMore}
          ready={ready}
          title={title}
          listId={listId}
          showClose={showClose}
          showHeader={showHeader}
          dismissBanner={dismissBanner}
          loadMore={this.loadMore.bind(this)}/>
      )
    } else {
      return (
        <section className="results_37tfm">
          <Telescope.components.RestaurantsNoResults relatedList={false}/>
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

export default connect(select)(IEARestaurantsList)

