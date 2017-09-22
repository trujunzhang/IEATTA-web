import Telescope from '../../index'
import React, {Component} from 'react';

import {Link} from 'react-router'

class F8PhotosSelectRightPanel extends Component {
  render() {
    return (

      <div className="media-details-grid_side media-details-grid_side--with-local-ads">
        <div className="media-details-grid_side-inner">
          <div className="media-info">

            {this.renderTopUserInfo()}

            <div className="media-info_container">

              <div className="media-info_item voting-feedback clearfix">
                <div className="media-info_vote">
                  <p className="voting-intro voting-prompt">
                    Was this photo …?
                  </p>
                  <ul className="voting-buttons exclusive u-space-b2">
                    {this.renderHelpfulButton()}
                    {this.renderNotHelpfulButton()}
                  </ul>

                </div>

              </div>
            </div>
          </div>


          <div className="media-info_footer">
            <div className="js-media_ad-container media_ad-container yloca--small">
            </div>
          </div>

        </div>
      </div>


    );
  }

  renderPhotoCreatedAt() {
    const {selectedPhotoInfo} = this.props;
    return (
      <div className="media-info_item media-info_time">
        <div className="selected-photo-details">
          <span className="selected-photo-upload-date time-stamp">
            {selectedPhotoInfo.createdAtFormat}
          </span>
        </div>
      </div>

    )
  }

  renderHelpfulButton() {
    return (
      <li className="voting-stat inline-block">
        <a className="ybtn ybtn--small helpful">
            <span id="icon_18X18" className="icon icon--18-arrow-up icon--size-18 icon--currentColor button-content">
                <svg className="icon_svg"><path d="M15 10L9 3l-6 7h4v5h4v-5h4z"/></svg>
            </span>
          <span className="vote-type">Helpful</span>
          <span className="count">1</span>
        </a>
      </li>

    )
  }

  renderNotHelpfulButton() {
    return (
      <li className="voting-stat inline-block">

        <a className="ybtn ybtn--small not_helpful">
            <span id="icon_18X18" className="icon icon--18-arrow-down icon--size-18 icon--currentColor button-content">
              <svg className="icon_svg"><path d="M3 8l6 7 6-7h-4V3H7v5H3z"/></svg>
            </span>
          <span className="vote-type">Not Helpful</span>

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
                     {selectedPhotoInfo.createdAtFormat}
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


export default F8PhotosSelectRightPanel;
