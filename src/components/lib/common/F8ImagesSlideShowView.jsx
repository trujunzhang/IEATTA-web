import Telescope from '../../lib'
import React, {Component} from 'react'

import {
  geDetailedModelLinkByObjectSchemaName,
  geDetailedModelLink,
  calculateTotalCount
} from '../../../lib/link'

import {Link} from 'react-router'

import Photos from '../../../lib/photos'

/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  // Sections
  SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
  // Model Form Type
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class F8ImagesSlideShowView extends Component {

  constructor(props, context) {
    super(props)

    const slideObject = Photos.generateSlideShowObject(props)

    debugger
    this.state = {slideObject}
  }

  render() {
    const {altValue, forObject, objectSchemaName} = this.props;

    return (
      <div className="media-avatar">
        <div className="photo-box pb-90s">
          <Link to={geDetailedModelLinkByObjectSchemaName(objectSchemaName, forObject)}>

            <Telescope.components.F8PlaceHolderImage
              alt={altValue}
              className="photo-box-img"
              width="90"
              height="90"
              placeholderSource={Photos.config.placeHolderSmallImage[objectSchemaName]}
              source={Photos.getListThumbnailUrl(forObject)}/>

          </Link>
        </div>
      </div>
    )
  }
}


export default F8ImagesSlideShowView;
