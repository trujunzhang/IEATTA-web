import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import Photos from '../../../lib/photos'

class IEAPhotosSingleLayout extends Component {

  renderContent() {
    const {selectPhotoIndex} = this.props;

    if (selectPhotoIndex !== -1) {
      const selectedPhotoInfo = Photos.generateSelectedPhotoInfo(this.props);
      debugger
      return (
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
      )
    }

    return null;
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container media-details js-media-details">

            <Telescope.components.F8PhotosSingleTop {...this.props}/>

            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default IEAPhotosSingleLayout;
