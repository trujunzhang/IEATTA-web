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
    this.state = {slideObject}
  }

  componentDidMount() {

  }

  render() {
    const {altValue, forObject, objectSchemaName} = this.props;
    const {slideObject} = this.state;
    const {
      emptyList,
      imageArray,
      placeholder
    } = slideObject;


    const imageViews = []
    if (emptyList) {
      imageViews.push(
        <img
          key={`emptyItem-for-${objectSchemaName}-${forObject.id}`}
          alt={altValue}
          className="photo-box-img"
          width="90"
          height="90"
          src={placeholder}
        />
      )
    } else {
      imageViews.push(
        <img
          key={`item-for-${objectSchemaName}-${forObject.id}-1`}
          alt={altValue}
          className="photo-box-img"
          width="90"
          height="90"
          src={imageArray[0]}
        />
      )
    }

    return (
      <div className="media-avatar">
        <div className="photo-box pb-90s">
          <Link to={geDetailedModelLinkByObjectSchemaName(objectSchemaName, forObject)}>

            {imageViews}

          </Link>
        </div>
      </div>
    )
  }
}


export default F8ImagesSlideShowView;
