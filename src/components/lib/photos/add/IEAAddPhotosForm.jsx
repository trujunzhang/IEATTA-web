import Telescope from '../../index'
import React, {Component} from 'react'

import Dropzone from 'react-dropzone'

/**
 * States of login display
 */
const {
  UPLOAD_IMAGE_FILE_DROP,
  UPLOAD_IMAGE_FILE_PREVIEW,
} = require('../../../../lib/constants').default

class IEAAddPhotosForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      file: {},
      formType: UPLOAD_IMAGE_FILE_DROP
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }


  onDrop(files) {
    this.setState({
      file: files[0],
      formType: UPLOAD_IMAGE_FILE_PREVIEW
    });
  }

  render() {
    const {formType} = this.state;
    switch (formType) {
      case UPLOAD_IMAGE_FILE_DROP:
        return this.renderFileDrop()
      case UPLOAD_IMAGE_FILE_PREVIEW:
        return this.renderFilePreview()
    }
  }

  renderFilePreview() {
    return (
      <div className="post-upload-container no-js-hidden">

        <div className="arrange arrange--middle finish-upload-header">

          <div className="arrange_unit">

            <div id="upload-title--success" className="upload-title biz-uploader">
                <span id="icon_18X18" className="icon icon--18-checkmark icon--size-18 icon--success">
                       <svg className="icon_svg">
                            <path
                              d="M7.232 14.273L1.93 8.97a1 1 0 1 1 1.413-1.414l3.89 3.89 7.424-7.426a1 1 0 0 1 1.414 1.414l-8.837 8.84z"/>
                       </svg>
                </span>
              <h3 className="alternate inline-block">
                Perfect!
                <b>Next, describe your photo below.</b>
              </h3>
            </div>

          </div>

          <div className="arrange_unit arrange arrange--middle arrange--18 finish-social-media-container">
            <div className="arrange_unit">
              <button className="ybtn ybtn-primary finish-upload-btn" type="submit" value="submit"><span>Finish</span>
              </button>
            </div>
          </div>
        </div>

        <ul className="uploaded-photos js-uploaded-photos photo-box-grid--inline-block photo-box-grid--wide">
          <li className="uploaded-photo" data-component-bound="true">
            <div className="photo-caption-box photo-box js-photo-box photo-box--interactive">
              <img className="photo-caption-img js-photo-caption-img photo-box-img"
                   src="https://s3-media1.fl.yelpcdn.com/bphoto/fC368LORs0YSatjo_10oaQ/o.jpg"/>

              <div className="photo-box_status">
                    <span className="photo-box_status-icon pull-right photo-error" style="display: none;">
                        <span id="icon_24X24"
                              className="icon icon--24-exclamation icon--size-24 icon--inverse icon--fallback-inverted">
                              <svg className="icon_svg">
                                   <path
                                     d="M12 15a2 2 0 0 1-2-2V4a2 2 0 0 1 4 0v9a2 2 0 0 1-2 2zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                              </svg>
                         </span>
                    </span>
              </div>

              <div className="photo-box_actions photo-box_actions--right">
                <a className="photo-box_action-link show-tooltip">
                        <span id="icon_24X24"
                              className="icon icon--24-trash icon--size-24 icon--inverse icon--fallback-inverted delete-photo">
                        <svg className="icon_svg">
                              <path
                                d="M5 7V5a1 1 0 0 1 1-1h4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h4a1 1 0 0 1 1 1v2H5zm13 12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8h12v11zm-8-8H9v8h1v-8zm5 0h-1v8h1v-8z"/>
                        </svg>
                        </span>
                  <span className="tooltip-wrapper">
                            <span className="tooltip">Delete</span>
                        </span>
                </a>
              </div>

            </div>

          </li>
        </ul>

      </div>

    )
  }

  renderFileDrop() {
    return (
      <div className="upload upload--photos js-html5-uploader hidden" style={{'display': 'block'}}>

        <Dropzone
          multiple={false}
          className="file-drop file-drop--big js-file-drop"
          onDrop={this.onDrop.bind(this)}>

          <div className="file-drop_area">
            <div className="file-drop_area-inner">
              <h1>Drag and drop your photos here</h1>

              <fieldset className="hr-line">
                <legend>OR</legend>
              </fieldset>

              <div className="file-browser js-file-browser">
                <button type="submit" value="submit" className="ybtn ybtn--primary file-browser_button">
                  <span>
                    {"Browse Files"}
                  </span>
                </button>
              </div>
            </div>
          </div>

        </Dropzone>

      </div>


    )
  }
}

export default IEAAddPhotosForm;
