import React from 'react'
// import { browserHistory, Router } from 'react-router'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import {IntlProvider} from 'react-intl'

let Parse = require('parse')

Parse.initialize('YJ60VCiTAD01YOA3LJtHQlhaLjxiHSsv4mkxKvVM', '3S9VZj8y9g0Tj1WS64dl19eDJrEVpvckG7uhcXIi', '87rxX8J0JwaaPSBxY9DdKJEqWXByqE7sShRsX4vg')
Parse.serverURL = 'https://parseapi.back4app.com/'

let Telescope = require('../lib/en_US').default

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {

    // https://developers.facebook.com/docs/javascript/reference/FB.init/v2.9
    const facebookInit = {
      appId: '1050096535124346',
      secret: 'd969c13f2d19112e26c6b9c3f2563d2f',
      xfbml: true,
      cookie: true,
      version: 'v2.8',
    }

    window.fbAsyncInit = function () {
      Parse.FacebookUtils.init(facebookInit)
    };
    // https://developers.facebook.com/docs/javascript/quickstart
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

  }

  render() {
    return (
      <Provider store={this.props.store}>
        <IntlProvider locale='en' messages={Telescope.strings.en}>
          <div style={{height: '100%'}}>
            <Router history={this.props.history} children={this.props.routes} onUpdate={this.props.onUpdate}/>
          </div>
        </IntlProvider>
      </Provider>
    )
  }
}

export default App
