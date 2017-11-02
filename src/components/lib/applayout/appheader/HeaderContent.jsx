import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

const {logOut} = require('../../../../actions').default

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
        <div className="main-header_logo js-analytics-click" id="logo">
          <Link to="/">IEATTA</Link>
        </div>
      </div>
    )
  }


  render() {
    const {isLoggedIn} = this.props;
    return (
      <div className="main-header main-content-wrap js-main-header webview-hidden">
        <div className="main-header_wrapper">
          <div className="content-container">

            <div className="arrange arrange--18 arrange--middle main-header_arrange">
              {this.renderLeft()}

              <Telescope.components.HeaderContentSearchBar/>

              {isLoggedIn && <Telescope.components.HeaderRightUserIconsPanel  {...this.props}/>}

              {isLoggedIn &&
              <Telescope.components.HeaderRightUserPanel
                onLogOutPress={this.onLogOutPress.bind(this)}
                {...this.props}/>
              }

              {isLoggedIn === false && <Telescope.components.HeaderRightLoginPanel/>}

            </div>

          </div>
        </div>
      </div>
    )
  }

  onLogOutPress() {
    this.props.dispatch(logOut())
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(HeaderContent)
