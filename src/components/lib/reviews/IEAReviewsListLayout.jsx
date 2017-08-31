import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

class IEAReviewsListLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {}

  }

  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">


        </div>
      </div>
    );
  }

}


import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    currentUserId: store.user.id,
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select)(IEAReviewsListLayout));
