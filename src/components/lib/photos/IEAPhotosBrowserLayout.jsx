import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

class IEAPhotosBrowserLayout extends Component {
  renderFooter() {
    return (
      <div className="media-landing_footer">

        <div className="media-pager">

          <div className="pagination-block">
            <div className="arrange arrange--stack arrange--baseline arrange--6">
              <div className="page-of-pages arrange_unit arrange_unit--fill">
                Page 1 of 1
              </div>

            </div>
          </div>


        </div>
      </div>

    )
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container">
            <div className="js-media-landing_container">

              <Telescope.components.F8PhotosTitleHeader {...this.props}/>

              <div className="media-landing js-media-landing">

                {/*<Telescope.components.F8PhotosCollectionView {...this.props}/>*/}

                {this.renderFooter()}

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IEAPhotosBrowserLayout;
