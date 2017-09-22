import Telescope from '../../index'
import React, {Component} from 'react';

import {Link} from 'react-router'

class F8PhotosSelectRightPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowSelectList: false
    }

  }

  render() {
    return (

      <div className="media-details-grid_side media-details-grid_side--with-local-ads">
        <div className="media-details-grid_side-inner">
          <div className="media-info">

            {this.renderTopUserInfo()}

            {this.renderModifyPhotoOwner()}
          </div>


          <div className="media-info_footer">
            <div className="js-media_ad-container media_ad-container yloca--small">
            </div>
          </div>

        </div>
      </div>


    )
  }

  renderModifyPhotoOwner() {
    return (
      <div className="media-info_container section-reselect-owner">

        <div className="media-info_item voting-feedback clearfix">
          <div className="media-info_vote margin-top-8">
            <p className="voting-intro voting-prompt">
              Reselect this photo's owner?
            </p>

            <ul className="voting-buttons exclusive u-space-b2">
              {this.renderReselect()}
            </ul>

          </div>

        </div>
      </div>

    )
  }

  renderReselect() {
    return (
      <li className="voting-stat inline-block">
        <a className="ybtn ybtn--small helpful">
            <span id="icon_18X18" className="icon icon--18-arrow-up icon--size-18 icon--currentColor button-content">
                <svg className="icon_svg">
                    <path
                      d="M2.002 16h13.996a9.87 9.87 0 0 0-5.66-2.786V12.08c.898-.655 1.733-1.75 1.79-2.46 1.016-.495 1.228-1.723.506-1.994l-.017.024c.326-.458.527-1.04.527-1.706 0-.863-.156-1.66-.79-2.182C11.914 2.72 10.998 2 9.934 2c-.625 0-1.198.25-1.656.664a.955.955 0 0 0-.612-.23c-.4 0-.747.268-.934.662-1.005.37-1.738 1.505-1.738 2.848 0 .615.154 1.186.417 1.66-.78.307-.52 1.477.463 2.015.057.71.89 1.804 1.79 2.46v1.133A9.87 9.87 0 0 0 2.003 16z"/>
                </svg>
            </span>
          <span className="vote-type">Select</span>
        </a>
      </li>

    )
  }

  renderTopUserInfo() {
    const {selectedPhotoInfo} = this.props;

    return (
      <div className="media-info_item media-info_user">
        <div className="photo-user-passport">
          <div className="ypassport ypassport-slim media-block">

            <div className="media-avatar">

              <div className="photo-box pb-30s">
                <Link to={selectedPhotoInfo.userProfileUrl} className="js-analytics-click">

                  <Telescope.components.F8PlaceHolderImage
                    key={selectedPhotoInfo.username}
                    alt={selectedPhotoInfo.username}
                    className="photo-box-img"
                    width="30"
                    height="30"
                    placeholderSource={"/default/user_30_square.png"}
                    source={selectedPhotoInfo.imageUrl}/>

                </Link>

              </div>
            </div>

            <div className="media-story">
              <ul className="user-passport-info">
                <li className="user-name">
                  <Link className="user-display-name js-analytics-click"
                        to={selectedPhotoInfo.userProfileUrl}
                        id="dropdown_user-name">
                    {selectedPhotoInfo.username}
                  </Link>
                </li>
                <li>
                  <span className="selected-photo-upload-date time-stamp">
                     {selectedPhotoInfo.photoCreatedAtFormat}
                  </span>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>

    )
  }
}


import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(F8PhotosSelectRightPanel);
