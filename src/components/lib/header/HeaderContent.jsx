import Telescope from '../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

const {pushModel} = require('../../../actions/index').default

class HeaderContent extends Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      showSearchForm: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    //if ((!!nextProps.router.location.query.topicId) || (!nextProps.router.location.query.query)) {
    //this.setState({showSearchForm: false})
    //}
  }

  renderLeft() {
    return (
      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="main-header_logo js-analytics-click" id="logo" data-analytics-label="logo">
          <a href="/">Yelp</a>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className="main-header main-content-wrap js-main-header webview-hidden">
        <div className="main-header_wrapper">
          <div className="content-container">

            <div className="arrange arrange--18 arrange--middle main-header_arrange">
              {this.renderLeft()}

              <Telescope.components.HeaderContentSearchBar/>

              <Telescope.components.HeaderRightUserIconsPanel/>
              
              {/*<Telescope.components.HeaderRightLoginPanel/>*/}
            </div>

          </div>
        </div>
      </div>
    )
  }

}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(HeaderContent)
