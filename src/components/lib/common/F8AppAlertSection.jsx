import React, {Component} from 'react'

const {dismissAlertMessage} = require('../../../actions').default

class F8AppAlertSection extends React.Component {

  render() {
    if (!!this.props.appAlert.message) {

      return (
        <div id="alert-container">

          <div className="alert alert-error">
            <a
              onClick={() => {
                this.props.dispatch(dismissAlertMessage())
              }}
              className="js-alert-dismiss dismiss-link">×</a>
            <p className="alert-message">
              <ul>
                <li>
                  {this.props.appAlert.message}
                </li>
              </ul>
            </p>
          </div>
        </div>
      )
    }

    return null;
  }
}


const {connect} = require('react-redux')

function select(store) {
  return {
    appAlert: store.appAlert
  }
}

export default connect(select)(F8AppAlertSection)
