import Telescope from '../index'
import React, {Component} from 'react'

import moment from 'moment';

class AppFooter extends Component {

  renderFooterIcon() {
    return (
      <div className="main-footer_city-landscape-img"/>
    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--separated">
        <div className="content-container">
          <div className="main-footer webview-hidden">

            {this.renderFooterIcon()}

            <div className="main-footer_copyright">

              {`Copyright © ${moment(new Date()).format("YYYY")} VirtualBreak, LLC. IEATTA,`}
              {" and related marks are registered trademarks of VirtualBreak, LLC."}
            </div>


          </div>
        </div>
      </div>

    )
  }
}

export default AppFooter;
