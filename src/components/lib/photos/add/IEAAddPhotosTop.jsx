import Telescope from '../../index'
import React, {Component} from 'react'

import {Link} from 'react-router'
import {
  geDetailedModelLink,
  getPhotosBrowserLink,
} from '../../../../lib/link'

class IEAAddPhotosTop extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }

  render() {
    const {modelType, forObject} = this.props;
    switch (modelType) {
      case "restaurant":
      case "recipe":
        return this.renderCommon()
    }

    return this.renderForUser()
  }

  renderCommon() {
    const {modelType, forObject} = this.props;
    return (
      <div id="user_biz_photo_intro">
        <h2>
          <Link to={geDetailedModelLink(modelType, forObject)}>
            {`${forObject.displayName}:`}
          </Link>
          {" Add Photos"}
        </h2>

        <Link to={getPhotosBrowserLink(modelType, forObject)}>
          {"View all photos"}
        </Link>

        <br/>
        <br/>
      </div>

    )
  }

  renderForUser() {
    const {modelType, forObject} = this.props;
    return (
      <div className="section-header media-header">
        <div className="arrange arrange--12 arrange--bottom">
          <div className="arrange_unit arrange_unit--fill">
            <ul className="breadcrumbs">
              <li>
                <a href="/user_details?userid=kIEHaO2vd6Lic4rwkMgH6Q">
                  {forObject.username}
                </a>
              </li>
              <li>
                  <span id="icon_24X24"
                        className="icon icon--24-chevron-right icon--size-24 icon--neutral-gray u-space-r-half">
                     <svg className="icon_svg">

                       <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                      </svg>
                  </span>
                {"Profile photos"}
              </li>
            </ul>

            <h1 className="media-header_title h2">Add photos</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default IEAAddPhotosTop;
