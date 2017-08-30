import Telescope from '../../index'
import React, {Component} from 'react'

import Dropzone from 'react-dropzone'

/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../../lib/constants').default

class IEAAddPhotosForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      file: {},
      // formType:
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  onDrop(files) {
    debugger
    this.setState({
      file: files[0]
    });
  }

  render() {

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
