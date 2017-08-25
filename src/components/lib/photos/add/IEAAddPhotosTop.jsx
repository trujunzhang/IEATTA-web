import Telescope from '../../index'
import React, {Component} from 'react'

class IEAAddPhotosTop extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }

  render() {
    return (
      <div className="section-header media-header">
        <div className="arrange arrange--12 arrange--bottom">
          <div className="arrange_unit arrange_unit--fill">
            <ul className="breadcrumbs">
              <li>
                <a href="/user_details?userid=kIEHaO2vd6Lic4rwkMgH6Q">
                  Trujun Z.</a>
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
