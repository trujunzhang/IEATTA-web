import Telescope from '../index'
import React, {Component} from 'react'
import Photos from '../../../lib/photos'

const {
  PHOTO_BROWSER_NORMAL_TITLE,
  PHOTO_BROWSER_LOGGED_USER_TITLE,
} = require('../../../lib/constants').default


class IEAPhotosSingleLayout extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {
      selectedPhotoInfo: Photos.generateSelectedPhotoInfo(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPhotoInfo: Photos.generateSelectedPhotoInfo(nextProps)
    })
  }

  renderTitle() {
    if (this.props.photoTitleType === PHOTO_BROWSER_LOGGED_USER_TITLE) {
      return (<Telescope.components.F8PhotosLoggedUserTitleHeader {...this.props}/>)
    }

    return (<Telescope.components.F8PhotosSingleTop {...this.props}/>)
  }

  render() {
    return (

      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container media-details js-media-details">

            {this.renderTitle()}

            <Telescope.components.F8PhotosContentWithNavBar
              {...this.props}
              {...this.state}
              contentClass="media-details_container media-details_container--fixed-height media-details_container--with-sidebar"
            />

          </div>
        </div>
      </div>

    )
  }
}

IEAPhotosSingleLayout.propTypes = {
  photoTitleType: React.PropTypes.string
};

IEAPhotosSingleLayout.defaultProps = {
  photoTitleType: PHOTO_BROWSER_NORMAL_TITLE
};


export default IEAPhotosSingleLayout;
