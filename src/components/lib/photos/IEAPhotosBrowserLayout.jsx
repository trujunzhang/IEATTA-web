import Telescope from '../index'
import React, {Component} from 'react'


const {
  PHOTO_BROWSER_NORMAL_TITLE,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
} = require('../../../lib/constants').default


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

  renderContent() {
    const {photosListTask} = this.props;
    const {
      results,
      ready
    } = photosListTask;

    if (!ready) {
      return (<Telescope.components.F8LoadingView/>)
    }

    return (<Telescope.components.F8PhotosCollectionView {...this.props}/>)
  }

  renderTitle() {
    const {photoTitleType} = this.props;
    if (photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE) {
      return (<Telescope.components.F8PhotosLoggedUserTitleHeader {...this.props}/>)
    }
    return (<Telescope.components.F8PhotosTitleHeader {...this.props}/>)
  }

  render() {
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container">
            <div className="js-media-landing_container">

              {this.renderTitle()}

              <div className="media-landing js-media-landing">

                {this.renderContent()}
                {this.renderFooter()}

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}


IEAPhotosBrowserLayout.propTypes = {
  photoTitleType: React.PropTypes.string
};

IEAPhotosBrowserLayout.defaultProps = {
  photoTitleType: PHOTO_BROWSER_NORMAL_TITLE
};


export default IEAPhotosBrowserLayout;
