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
        <Telescope.components.HeaderContent />

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf top-shelf-grey"></div>


          <div id="super-container" className="content-container">


            <div className="container">

              <div className="clearfix layout-block layout-full search-exception" data-component-bound="true"
                   style="position: relative;">
                <div className="column column-alpha ">
                  <div className="content">
                  </div>
                </div>
                <div className="throbber-overlay" style="display: none;">
                  <div className="throbber-container"></div>
                </div>
              </div>

              <div className="clearfix layout-block layout-a scroll-map-container search-results-block">
                <div className="column column-alpha ">

                  <div className="results-wrapper indexed-biz-archive" data-component-bound="true"
                       style="position: relative; min-height: 345px;">

                    <div className="search-results-content">
                      { this.props.children}

                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
    )
  }
}

export default Layout
