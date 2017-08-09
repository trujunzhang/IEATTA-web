import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

class IEAPhotosBrowserLayout extends Component {

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container">
            <div className="js-media-landing_container">

              <Telescope.components.F8PhotosTitleHeader {...this.state}/>
              <Telescope.components.F8PhotosCollectionView {...this.state}/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IEAPhotosBrowserLayout;
