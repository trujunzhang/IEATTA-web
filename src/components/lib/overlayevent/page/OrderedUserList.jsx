import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadPeopleInEventList} = require('../../../../actions').default

const {generateTermsForOrderedUsersList} = require('../../../filter/filterRoutes')
const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')

class OrderedUserList extends Component {

  constructor(props) {
    super(props)

    const terms = generateTermsForOrderedUsersList(props)
    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms.listId, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {terms,listTask} = this.state;
    this.props.dispatch(loadPeopleInEventList(listTask, terms))
  }

  renderRows() {
    const {listTask} = this.state

    const {
      results,
      ready
    } = listTask

    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    }

    return (
      <ul className="ylist">
        {results.map(peopleInEvent =>
          <Telescope.components.OrderedUserItem key={peopleInEvent.id} peopleInEvent={peopleInEvent}/>
        )}
      </ul>
    )
  }

  renderEmptySection() {
    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
    } = listTask

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
