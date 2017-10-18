import Telescope from '../index'
import React, {Component} from 'react'

class IEAOrderedUsersInEventsLayout extends Component {

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">
        <div className="top-shelf top-shelf-grey">
        </div>

        <div id="super-container" className="content-container">
          <Telescope.components.EventsDetail {...this.props}/>
        </div>
      </div>

    )
  }
}

export default IEAOrderedUsersInEventsLayout;
