import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsFixMapMarker extends Component {

  renderCloseIcon() {
    return (
      <a className="offscreen ypop-close-offscreen">Close popup</a>
    )
  }


  renderTitle() {
    return (
      <div className="ypop-title" id="locate-biz-pop-title">
        <div className="ypop-close">×</div>
        <h2>Move map marker</h2>
      </div>
    )
  }


  renderHint() {
    return (
      <div className="map-popup-info google-map">
        <p>
          Drag and drop the map marker to correct the location.
          <br/>
          Use the tools in the map to zoom in for a closer look at the map.
        </p>
      </div>
    )
  }

  renderFooter() {
    return (
      <div className="ypop-footer clearfix" id="locate-biz-pop-footer">
        <div className="ypop-status"></div>
        <div className="ypop-buttons">
          <button type="submit" value="submit" className="ybtn ybtn-primary ybtn-small">
            <span>
            Save Changes
          </span>
          </button>
          <a href="#">Cancel</a></div>
      </div>

    )
  }

  renderContent() {
    return (
      <div className="ypop-inner clearfix" id="locate-biz-pop-inner">
        <div className="map-popup-container hidden" style={{"display": "block"}}>

          {this.renderHint()}

          <div className="popup-map">

          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="ypop" id="locate-biz-pop">
        <div className="ypop-content clearfix" id="locate-biz-pop-content">

          {this.renderCloseIcon()}
          {this.renderTitle()}

          {this.renderContent()}

          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default RestaurantsFixMapMarker;
