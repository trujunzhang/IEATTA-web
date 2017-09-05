import React, {Component} from 'react';

import {Link} from 'react-router'
import {
  geDetailedModelLink,
  getAddPhotoLink,
  calculateTotalCount
} from '../../../../lib/link'


class F8PhotosLoggedUserTitleHeader extends Component {

  render() {
    const {forObject, modelType, userProfile, photosListTask} = this.props;

    return (
      <div className="js-media-landing_header media-landing_header">
        <div className="section-header media-header">
          <div className="arrange arrange--12 arrange--bottom">
            <div className="arrange_unit arrange_unit--fill">
              <ul className="breadcrumbs">
                <li>
                  <Link to={geDetailedModelLink(modelType, userProfile)}>
                    {forObject.displayName}
                  </Link>
                </li>
                <li>

                  <span id="icon_24X24"
                        className="icon icon--24-chevron-right icon--size-24 icon--neutral-gray u-space-r-half">
                       <svg className="icon_svg">
                            <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                        </svg>
                   </span>
                  {"Local photos"}
                </li>
              </ul>

              <h1 className="media-header_title h2">
                {`${calculateTotalCount(photosListTask)} photos by ${forObject.displayName}`}
              </h1>
            </div>
          </div>
        </div>

      </div>

    )
  }
}


export default F8PhotosLoggedUserTitleHeader;
