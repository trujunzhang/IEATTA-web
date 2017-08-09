import Telescope from '../../../lib'
import React, {Component} from 'react';

class F8PhotosSelectRightPanel extends Component {
  render() {
    const {photos} = this.props;

    return (

      <div className="media-details-grid_side media-details-grid_side--with-local-ads">
        <div className="media-details-grid_side-inner">
          <div className="media-info">
            <div className="media-info_item media-info_user">
              <div className="photo-user-passport">
                <div className="ypassport ypassport-slim media-block">
                  <div className="media-avatar">
                    <div className="photo-box pb-30s" data-hovercard-id="cptjIGp3btE7z_1ikqgZSQ">
                      <a href="/user_details?userid=WALNtcSZlONK4Yj-o3pzKA" className="js-analytics-click"
                         data-analytics-label="user-photo">
                        <img alt="Dan B." className="photo-box-img" height="30"
                             src="https://s3-media2.fl.yelpcdn.com/photo/AQbgX0Y9bLUs_sLGqWT-QA/30s.jpg"
                             width="30"/>

                      </a>

                    </div>


                  </div>
                  <div className="media-story">
                    <ul className="user-passport-info">
                      <li className="user-name">
                        <a className="user-display-name js-analytics-click"
                           href="/user_details?userid=WALNtcSZlONK4Yj-o3pzKA"
                           data-hovercard-id="cptjIGp3btE7z_1ikqgZSQ" data-analytics-label="about_me"
                           id="dropdown_user-name">Dan B.</a>
                      </li>
                    </ul>


                    <ul className="user-passport-stats">
                      <li className="friend-count">
            <span
              id="icon_fill_18X18"
              className="icon icon--18-friends icon--size-18">
    <svg className="icon_svg">
       <g>
      <path
        d="M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      <path
        d="M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        opacity=".502"/>
    </g>
    </svg>
</span>
                        <b>1394</b>
                      </li>
                      <li className="review-count">
            <span
              id="icon_fill_18X18"
              className="icon icon--18-review icon--size-18">
    <svg className="icon_svg">
    <path
      d="M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z"/>
    </svg>
</span>
                        <b>1805</b>
                      </li>
                      <li className="is-elite responsive-small-display-inline-block">
                        <a href="/elite">Elite ’17</a>
                      </li>

                    </ul>

                  </div>
                </div>

              </div>

            </div>


            <div className="media-info_container">
              <div className="media-info_item media-info_caption">
                <div className="selected-photo-caption">
                  <div className="caption selected-photo-caption-text">
                  </div>
                </div>

              </div>

              <div className="media-info_item media-info_time">
                <div className="selected-photo-details">
                  <span className="selected-photo-upload-date time-stamp">July 29, 2017</span>
                </div>

              </div>


              <div className="media-info_item voting-feedback clearfix">
                <div className="media-info_vote" data-photo-id="fNoqHpp82jyhATSelcwgGA" data-component-bound="true">
                  <p className="voting-intro voting-prompt">
                    Was this photo …?
                  </p>
                  <ul className="voting-buttons exclusive u-space-b2"
                      data-csrf-token="009253774c345d22d23737bbc1ae57a6f4504afe40df63b2472ce0a38e0cfbb8"
                      data-submit-uri="/biz_photos/feedback/B09WOy0W83Od-Xw4xEXxog" data-component-bound="true">
                    <li className="voting-stat inline-block">


                      <a className="ybtn ybtn--small helpful" href="javascript:;" rel="helpful">
            <span
              id="icon_18X18"
              className="icon icon--18-arrow-up icon--size-18 icon--currentColor button-content">
    <svg className="icon_svg">
    <path d="M15 10L9 3l-6 7h4v5h4v-5h4z"/>
    </svg>
</span>
                        <span className="vote-type">Helpful</span>
                        <span className="count">1</span>
                      </a>
                    </li>

                    <li className="voting-stat inline-block">


                      <a className="ybtn ybtn--small not_helpful" rel="not_helpful">
            <span
              id="icon_18X18"
              className="icon icon--18-arrow-down icon--size-18 icon--currentColor button-content">
    <svg className="icon_svg">
    <path d="M3 8l6 7 6-7h-4V3H7v5H3z"/>
    </svg>
</span>
                        <span className="vote-type">Not Helpful</span>

                      </a>
                    </li>

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
}


export default F8PhotosSelectRightPanel;
