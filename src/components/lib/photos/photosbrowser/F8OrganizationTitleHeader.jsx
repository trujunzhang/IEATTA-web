import React, {Component} from 'react';

import {Link} from 'react-router'
import {
  geDetailedModelLink,
  getAddPhotoLink,
  calculateTotalCount
} from '../../../../lib/link'


class F8OrganizationTitleHeader extends Component {
  onEditPhotosPress() {

  }

  render() {
    const {forRelationObject, modelType, photosListTask} = this.props;

    return (
      <div className="js-media-landing_header media-landing_header">
        <div className="section-header media-header">

          <div className="arrange arrange--12 arrange--bottom">

            <div className="arrange_unit arrange_unit--fill">
              <ul className="breadcrumbs">
                <li>
                  <span>
                  {"The following photos maybe own the recipe"}
                  </span>
                </li>
              </ul>

              <h1 className="media-header_title h2">
                {`${calculateTotalCount(photosListTask)} photos by ${forRelationObject.displayName}`}
              </h1>
            </div>


          </div>

        </div>

      </div>

    )
  }
}


export default F8OrganizationTitleHeader;
