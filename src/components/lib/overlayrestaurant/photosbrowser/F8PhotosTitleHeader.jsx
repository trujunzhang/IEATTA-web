import React, {Component} from 'react';

class F8PhotosTitleHeader extends Component {

  renderBottom() {
    return (
      <div className="section-header media-header--tabbed">

        <div className="arrange arrange--12 arrange--bottom">
          <div className="arrange_unit arrange_unit--fill media-header_biz-listing">
            <div className="media-block media-block biz-passport--slim">
              <div className="media-avatar">
                <div className="photo-box pb-30s">
                  <a href="/biz/roma-antica-san-francisco-3" className="js-analytics-click"
                     data-analytics-label="biz-photo">
                    <img alt="Roma Antica" className="photo-box-img" height="30"
                         src="https://s3-media4.fl.yelpcdn.com/bphoto/x57_yoZarQuIn9y1r2jsQw/30s.jpg" width="30"/>
                  </a>

                </div>


              </div>
              <div className="media-story">
                <div className="media-title clearfix">
                  <a className="biz-name js-analytics-click" data-analytics-label="biz-name"
                     href="/biz/roma-antica-san-francisco-3"
                     data-hovercard-id="wuDfO9BuLXh37gA1JpznGQ"><span>Roma Antica</span></a>

                </div>
                <div className="biz-passport_rating">
                  <div className="biz-rating biz-rating-medium clearfix">


                    <div className="i-stars i-stars--small-5 rating" title="5.0 star rating">
                      <img className="offscreen" height="303"
                           src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png"
                           width="84" alt="5.0 star rating"/>
                    </div>


                    <span className="review-count rating-qualifier">
            <span
            >9</span> reviews
    </span>

                  </div>

                </div>
              </div>
            </div>

          </div>
          <div className="arrange_unit nowrap media-header_actions">

            <a className="ybtn ybtn--primary u-space-r1" href="/biz_user_photos/B09WOy0W83Od-Xw4xEXxog/upload">
        <span
          id="icon_24X24"
          className="icon icon--24-add-photo icon--size-24 icon--currentColor u-space-r1 icon--fallback-inverted">
    <svg className="icon_svg">
    <path
      d="M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM13 14v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1z"/>
    </svg>
</span>Add photos
            </a>


          </div>
        </div>

        <div className="section-header_tabs js-section-header_tabs" data-component-bound="true">
          <div className="media-header_root-navbar" data-component-bound="true">


          </div>

        </div>
      </div>

    )
  }


  render() {
    return (
      <div className="js-media-landing_header media-landing_header" data-component-bound="true">

        <h1 className="js-media-landing_header_title">Photos for Roma Antica</h1>
        {this.renderBottom()}
      </div>

    );
  }
}


export default F8PhotosTitleHeader;
