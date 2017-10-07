import Telescope from '../../../lib'
import React, {Component} from 'react'

const {
  loadEventsList,
  loadPeopleInEventList,
} = require('../../../../actions').default

const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')

import PaginationTerms from "../../../../lib/paginationTerms";

const {
  EVENTS_LIST_FOR_RESTAURANT,
  EVENTS_LIST_FOR_USER,
} = require('../../../../lib/constants').default

class EventsList extends Component {

  constructor(props) {
    super(props)

    const terms = PaginationTerms.generateTermsForEventsList(props)
    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    const newListTask = byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask)
    this.setState({
      listTask: newListTask
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
    const {eventType} = this.props;
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
          {results.map((item, index) => {
            const event = (eventType === EVENTS_LIST_FOR_USER) ? item.event : item;
            return (<Telescope.components.EventsItem key={event.id} event={event} index={index}/>)
          })}
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
