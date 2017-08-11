import React, {Component} from 'react';

class EditReviewTopSection extends Component {
  render() {
    return (
      <div className="war-write_business">
        <div className="media-block media-block--12 biz-listing-medium">
          <div className="media-avatar">
            <div className="photo-box pb-60s">
              <a className="js-analytics-click">
                <img alt="Wayfare Tavern"
                     className="photo-box-img"
                     width="60"
                     height="60"
                     src="https://s3-media1.fl.yelpcdn.com/bphoto/f-DXV3kCBLJNArROFoS3KQ/60s.jpg"
                />

              </a>

            </div>


          </div>
          <div className="media-story">
            <div className="media-title clearfix">
              <a className="biz-name js-analytics-click">
                <span>
                Wayfare Tavern
                </span>
              </a>


            </div>
            <div className="price-category">
                <span className="bullet-after">

        <span className="business-attribute price-range">$$$</span>
        </span>
              <span className="category-str-list">
                    <a href="/search?find_loc=San+Francisco%2C+CA&amp;cflt=tradamerican">
                      American (Traditional)
                    </a>
    </span>


            </div>


            <span>
              558 Sacramento St
                San Francisco, CA 94111
            </span>

          </div>
        </div>

      </div>
    );
  }
}


export default EditReviewTopSection;
