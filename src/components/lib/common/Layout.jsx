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
    if (this.props.location.pathname.indexOf('login') !== -1) {
      return (
        <div id='web-app-panel'>
          { this.props.children}
        </div>
      )
    }
    return (
      <div id="wrap" className="lang-en" data-component-bound="true">

        <div>wanghao</div>
      </div>
    )
  }
}

export default Layout
