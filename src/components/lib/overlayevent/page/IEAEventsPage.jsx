import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class IEAEventsPage extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="biz-country-us">

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf">
            <Telescope.components.EventsSingleHeader {...this.props}/>

            <Telescope.components.EventsDetail {...this.props}/>
          </div>
        </div>
      </div>
    )
  }
}

export default IEAEventsPage;
