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
    const {children} = this.props;

    if (checkLoginFormPage(this.props)) {
      return (
        <div id='web-app-panel'>
          {children}
          <Telescope.components.AppFooter/>
        </div>
      )
    }
    return (
      <div id="wrap" className="lang-en">
        <div className="page-header">
          <Telescope.components.HeaderContent/>
        </div>

        {children}

        <Telescope.components.AppFooter/>
      </div>
    )
  }
}

export default Layout;
