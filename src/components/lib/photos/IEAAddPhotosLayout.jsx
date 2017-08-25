import Telescope from '../index'
import React, {Component} from 'react'

class IEAAddPhotosLayout extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container media-details js-media-details">

          </div>
        </div>
      </div>
    )
  }
}

export default IEAAddPhotosLayout;
