import Telescope from '../index'
import React, {Component} from 'react'


class AppFooter extends Component {

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--separated">
        <div className="content-container">
          <div className="main-footer webview-hidden">

            <div className="main-footer_city-landscape-img" role="presentation"/>

            <div className="main-footer_copyright">
              Copyright © 2004–2017 Yelp Inc. Yelp,
              <img
                src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_styleguide/17089be275f0/assets/img/logos/logo_desktop_xsmall_outline.png"
                alt="Yelp logo"
                className="main-footer_logo-copyright"
                srcset="https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_styleguide/0aade8725c91/assets/img/logos/logo_desktop_xsmall_outline@2x.png 2x"
              />{','}
              <img
                src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_styleguide/58cfc999e1f5/assets/img/logos/burst_desktop_xsmall_outline.png"
                alt="Yelp burst"
                className="main-footer_logo-burst"
                srcset="https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_styleguide/dcb526e86d86/assets/img/logos/burst_desktop_xsmall_outline@2x.png 2x"
              />
              {"and related marks are registered trademarks of Yelp."}
            </div>


          </div>
        </div>
      </div>

    )
  }
}

export default AppFooter;
