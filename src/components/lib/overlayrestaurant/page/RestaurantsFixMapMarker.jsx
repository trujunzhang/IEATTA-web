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
      <div></div>
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
      <div></div>
    )
  }

  render() {
    return (
      <div className="ypop" id="locate-biz-pop">
        <div className="ypop-content clearfix" id="locate-biz-pop-content">

          {this.renderCloseIcon()}
          {this.renderTitle()}

          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default RestaurantsFixMapMarker;
