import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

class IEAPhotosSingleLayout extends Component {
  renderContent() {
    return (
      <div className="media-lightbox">
        <div className="media-details js-media-details js-media-details-template">
          <div className="media-details_container media-details_container--embed media-details_container--with-sidebar">
            <div className="media-container js-media-container">
              <div className="media-details-grid">

                <Telescope.components.F8PhotosSelectLeftPanel {...this.props}/>
                {/*{01-left-panel.html}*/}

                <Telescope.components.F8PhotosSelectRightPanel {...this.props}/>
                {/*{02-right-panel.html}*/}

              </div>
            </div>

            <Telescope.components.F8PhotosSelectNavigatorBar {...this.props}/>
            {/*{03-left-right-navigator.html}*/}

          </div>
        </div>
      </div>

    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container media-details js-media-details">

            <Telescope.components.F8PhotosSingleTop {...this.props}/>

            <div
              className="media-details_container media-details_container--fixed-height media-details_container--with-sidebar">
              <div className="media-container js-media-container">
                <div className="media-details-grid">

                  <Telescope.components.F8PhotosSelectLeftPanel {...this.props}/>
                  <Telescope.components.F8PhotosSelectRightPanel {...this.props}/>

                </div>
              </div>

              <Telescope.components.F8PhotosSelectNavigatorBar {...this.props}/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default IEAPhotosSingleLayout;
