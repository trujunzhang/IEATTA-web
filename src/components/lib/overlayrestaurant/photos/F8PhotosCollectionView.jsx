import React, {Component} from 'react';

class F8PhotosCollectionView extends Component {

  renderRow(photo) {
    return (
      <li data-photo-id="x57_yoZarQuIn9y1r2jsQw">
        <div className="photo-box photo-box--interactive">

          <img
            alt="Photo of Roma Antica - San Francisco, CA, United States. outdoor tater seating, combo rearrangeable table"
            width="226"
            height="226"
            className="photo-box-img"
            src="https://s3-media4.fl.yelpcdn.com/bphoto/x57_yoZarQuIn9y1r2jsQw/258s.jpg"/>

          <a className="biz-shim js-lightbox-media-link js-analytics-click" data-analytics-label="biz-photo"
             href="/biz_photos/roma-antica-san-francisco-3?select=x57_yoZarQuIn9y1r2jsQw">
          </a>

        </div>

      </li>

    )
  }

  render() {
    const {photos} = this.props;

    return (
      <div className="media-landing_gallery photos">
        <ul className="photo-box-grid photo-box-grid--highlight photo-box-grid--small clearfix lightbox-media-parent">
          {photos.map((photo, item) => {
            return this.renderRow(photo)
          })}
        </ul>
      </div>
    );
  }
}


export default F8PhotosCollectionView;
