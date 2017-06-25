import Telescope from '../index'
import React, {Component} from 'react'

class Layout extends Component {
  constructor(props, context) {
    super(props)
  }


  render() {
    if (this.props.location.pathname.indexOf('/management') !== -1) {
      return (
        <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
          { this.props.children}
        </div>
      )
    }
    return (
      <div id='web-app-panel'>
        { this.props.children}
      </div>
    )
  }
}

export default Layout
