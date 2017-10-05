import Telescope from '../index'
import React, {Component} from 'react'


const {
  // Photo browser title
  PHOTO_BROWSER_NORMAL_TITLE,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
  PHOTO_BROWSER_ORGANIZATION_TITLE,
} = require('../../../lib/constants').default


class IEAPhotosBrowserLayout extends Component {

  renderFooter() {

    const {photosListTask} = this.props;

    return (
      <div className="media-landing_footer">

        <div className="media-pager">

          <Telescope.components.F8PaginationButtonNavigationBar
            listTask={photosListTask}
            {...this.props}
            {...this.state}/>

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
    switch (this.props.photoTitleType) {
      case PHOTO_BROWSER_LOGGED_USER_TITLE:
        return (<Telescope.components.F8PhotosLoggedUserTitleHeader {...this.props}/>)
      case  PHOTO_BROWSER_NORMAL_TITLE :
        return (<Telescope.components.F8PhotosTitleHeader {...this.props}/>)
    }

    return null;
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
