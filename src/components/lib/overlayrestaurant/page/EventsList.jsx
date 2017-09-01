import Telescope from '../../../lib'
import React, {Component} from 'react'

const {
  loadEventsList,
  loadPeopleInEventList,
} = require('../../../../actions').default

const {generateTermsForEventsList} = require('../../../filter/filterRoutes')
const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')


const {
  EVENTS_LIST_FOR_RESTAURANT,
  EVENTS_LIST_FOR_USER,
} = require('../../../../lib/constants').default

class EventsList extends Component {

  constructor(props) {
    super(props)

    const terms = generateTermsForEventsList(props)
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
    const {terms, listTask} = this.state;
    const {eventType} = this.props;
    if (eventType === EVENTS_LIST_FOR_USER) {
      this.props.dispatch(loadPeopleInEventList(listTask, terms))
    } else {
      this.props.dispatch(loadEventsList(listTask, terms))
    }
  }

  renderRows() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask;

    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    } else if (!!results && results.length) {
      return (
        <ul className="ylist ylist-bordered">
          {results.map(event =>
            <Telescope.components.EventsItem key={event.id} event={event}/>
          )}
        </ul>
      )
    } else {
      return (
        <Telescope.components.F8EmptySection
          title={`No Events`}
          text="You can add new events clicking the 'Add Event' button."/>
      )
    }
  }

  renderTitle() {
    return (
      <div className="arrange">
        <div className="arrange_unit arrange_unit--fill">
          <h2>Events</h2>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className="ysection events">

        {this.renderTitle()}

        {this.renderRows()}

      </div>
    )
  }
}


EventsList.propTypes = {
  eventType: React.PropTypes.string
};

EventsList.defaultProps = {
  eventType: EVENTS_LIST_FOR_RESTAURANT
};


const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(EventsList)
