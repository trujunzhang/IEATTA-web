import React, {Component} from 'react';

class EditUserProfilePhoto extends Component {
  render() {
    return (
      <div className="ysection">
        <h4>Your Profile Photo
          <strong>
            <a href="/user_photos?return_url=/profile">
              (Add/Edit)
            </a>
          </strong>
        </h4>

        <div className="photo-box pb-m">
          <a className="js-analytics-click" data-analytics-label="user-photo"
             href="/user_photos?return_url=%2Fprofile">
            <img alt="" className="photo-box-img"
                 src="https://s3-media1.fl.yelpcdn.com/photo/Hjd0EAdSH-gYJbRBF5nAnw/m.jpg"/>
          </a>
        </div>

      </div>

    );
  }
}


export default EditUserProfilePhoto;
