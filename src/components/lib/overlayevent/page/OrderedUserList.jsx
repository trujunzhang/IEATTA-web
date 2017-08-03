import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadPeopleInEventList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')

class OrderedUserList extends Component {

  constructor(props) {
    super(props)

    const terms = {
      listId: 'single-list-view-for-ordered-users',
      limit: 10,
      eventId: props.event.id
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const terms = this.state.terms;
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadPeopleInEventList(nextListTask, terms))
  }

  render() {

    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask

    let hasMore = !ready && totalCount !== results.length;


    return (
      <div className="ysection">

        <div className="arrange arrange--12 arrange--baseline">

          <div className="arrange_unit nowrap">
            <h3 className="subscribe-list_title">Who's in?</h3>
          </div>

          <div className="arrange_unit arrange_unit--fill">
            <span>90 responses</span>
          </div>

        </div>

        <ul className="ylist">
          {results.map(user =>
            <Telescope.components.OrderedUserItem key={user.id} user={user}/>
          )}
        </ul>


        <div className="u-space-t2 u-space-b2">
          <a href="/events/sf/browse">View all events in San Francisco</a>
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

export default connect(select)(OrderedUserList)
