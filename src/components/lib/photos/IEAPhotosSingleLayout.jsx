import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import Photos from '../../../lib/photos'

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

  render() {
    return (

      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container media-details js-media-details">

            <Telescope.components.F8PhotosSingleTop {...this.props}/>

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

export default IEAPhotosSingleLayout;
