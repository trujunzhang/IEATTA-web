import Telescope from '../index'
import React, {Component} from 'react'

class Layout extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
      const {location} = this.props,
            {pathname} = location

    if (pathname.indexOf('/management') !== -1) {
      return (
        <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
          { this.props.children}
        </div>
      )
    }
    if (pathname.indexOf('login') !== -1 || pathname.indexOf('signup') !== -1) {
      return (
        <div id='web-app-panel'>
          { this.props.children}
        </div>
      )
    }
    return (
      <div id="wrap" className="lang-en" data-component-bound="true">
        <div className="page-header">
          <Telescope.components.HeaderContent />
        </div>

        { this.props.children}

      </div>
    )
  }
}

export default Layout
