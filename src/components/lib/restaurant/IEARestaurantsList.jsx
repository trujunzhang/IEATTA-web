import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'

const {loadRestaurantsList} = require('../../../actions').default
const {byListId} = require('../../filter/filterPosts').default

class IEARestaurantsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listTask: byListId(props.listContainerTasks, props.terms)
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, nextProps.terms)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadRestaurantsList(nextListTask, this.props.terms))
  }

  render() {
    const {
      title,
      infinite = false,
    } = this.props

    const {listTask} = this.state

    const {
      id,
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

        <ul className="ylist ylist-bordered search-results">
          {results.map((item, index) =>
            <Telescope.components.RestaurantsItem
              listId={id}
              key={item.id}
              index={index}
              restaurant={item}
              canEdit={false}/>
          )}

        </ul>

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

