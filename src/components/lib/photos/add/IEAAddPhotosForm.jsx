import Telescope from '../../index'
import React, {Component} from 'react'

class IEAAddPhotosForm extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({})
  }

  render() {

    return (
      <div className="upload upload--photos js-html5-uploader hidden" style={{'display': 'block'}}>

        <div className="file-drop file-drop--big js-file-drop">
          <div className="file-drop_area">
            <div className="file-drop_area-inner">
              <h1>Drag and drop your photos here</h1>

              <fieldset className="hr-line">
                <legend>OR</legend>
              </fieldset>

              <div className="file-browser js-file-browser">
                <input className="file-browser_input hidden" type="file" multiple=""
                       aria-label="Select A File To Upload"/>
                <button type="submit" value="submit" className="ybtn ybtn--primary file-browser_button"><span>
                    {"Browse Files"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="file-drop_info hidden">
            <div className="file-drop_uploading">
              <div className="section-header">
                <div className="section-header_throbber throbber">
                  <h3 className="section-header_text">Uploading...</h3>
                </div>
              </div>
              <ul className="upload-previews js-upload-previews photo-box-grid--inline-block photo-box-grid--wide">
              </ul>

            </div>


            <ul className="upload-previews hidden">
              <li className="upload-preview hidden photo-box--bordered">
                <div className="photo-box photo-box--interactive">
                  <div className="photo-box-img photo-box--background"></div>
                  <div className="photo-box_status">
                    <div className="media-progress-bar">
                      <div className="media-progress-bar_fill"></div>
                    </div>
                    <div
                      className="photo-box_status-icon photo-box_status-icon--success photo-box_status-indicator--success hidden u-pull-right">
                        <span
                          id="icon_24X24"
                          className="icon icon--24-checkmark icon--size-24 icon--inverse icon--fallback-inverted">
    <svg className="icon_svg">
    <path
      d="M19.698 7.748L9.895 17.994 4.292 12.14a1.07 1.07 0 0 1 0-1.464.96.96 0 0 1 1.4 0l4.203 4.39 8.403-8.782a.96.96 0 0 1 1.4 0c.387.405.387 1.06 0 1.464z"/>
    </svg>
</span>
                    </div>
                    <div className="photo-box_status-icon photo-box_status-indicator--error hidden u-pull-right">
                        <span
                          id="icon_24X24"
                          className="icon icon--24-exclamation icon--size-24 icon--inverse icon--fallback-inverted">
    <svg className="icon_svg">
    <path d="M12 15a2 2 0 0 1-2-2V4a2 2 0 0 1 4 0v9a2 2 0 0 1-2 2zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
</span>
                    </div>
                  </div>
                </div>
                <div
                  className="upload-preview_info upload-preview_info--error yform-help-inline yform-help-invalid"></div>
              </li>
            </ul>


          </div>
        </div>
      </div>


    )
  }
}

export default IEAAddPhotosForm;
