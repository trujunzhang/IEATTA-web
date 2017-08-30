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
   return(

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
                <input className="file-browser_input hidden"
                       type="file"
                       onChange={(e) => this._handleImageChange(e)}
                />
                <button type="submit" value="submit" className="ybtn ybtn--primary file-browser_button"><span>
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
