import Telescope from '../index'
import React, {Component} from 'react'


const {
  checkLoginFormPage,
} = require('../../filter/filterRoutes')


class Layout extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    if (checkLoginFormPage(this.props)) {
      return (
        <div id='web-app-panel'>
          {this.props.children}
        </div>
      )
    }
    return (
      <div id="wrap" className="lang-en">
        <div className="page-header">
          <Telescope.components.HeaderContent/>
        </div>

        {this.props.children}

      </div>
    )
  }
}

export default Layout;
