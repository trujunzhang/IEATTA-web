import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadPeopleInEventList} = require('../../../../actions').default

import PaginationTerms from "../../../../lib/paginationTerms";

const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')

class OrderedUserList extends Component {

  constructor(props) {
    super(props)

    const orderedUserTerms = PaginationTerms.generateTermsForOrderedUsersList(props)
    this.state = {
      orderedUserTerms,
      orderedUserListTask: getDefaultListTask(orderedUserTerms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderedUserListTask: byListId(nextProps, this.state.orderedUserTerms, this.state.orderedUserListTask)
    })
  }

  componentDidMount() {
    const {orderedUserTerms, orderedUserListTask} = this.state;
    this.props.dispatch(loadPeopleInEventList(orderedUserListTask, orderedUserTerms))
  }

  renderRows() {
    const {orderedUserListTask} = this.state;

    const {
      results,
      ready
    } = orderedUserListTask;

    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    }

    return (
      <ul className="ylist">
        {results.map(peopleInEvent =>
          <Telescope.components.OrderedUserItem
            key={peopleInEvent.id}
            peopleInEvent={peopleInEvent}
            listTask={orderedUserListTask}
          />
        )}
      </ul>
    )
  }

  renderEmptySection() {
    const {orderedUserListTask} = this.state

    const {
      results,
      ready,
      totalCount,
    } = orderedUserListTask

    if (ready && results.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={`No Users ordered`}
          text="You can add new users clicking the 'Add user' button."/>
      )
    }
    return null;
  }

  render() {

    return (
      <div className="ysection">

        <Telescope.components.F8SectionHeaderTitle title={"Who's in?"}/>

        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          {this.renderEmptySection()}
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
