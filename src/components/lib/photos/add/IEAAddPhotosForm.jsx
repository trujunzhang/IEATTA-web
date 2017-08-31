import Telescope from '../../index'
import React, {Component} from 'react'

import Dropzone from 'react-dropzone'


const {
  uploadPhoto,
  showAlertMessage,
  timeout
} = require('../../../../actions').default

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

  async onButtonPress() {
    const {dispatch, currentUser, modelType, forObject} = this.props;

    const forObjectId = forObject.id;
    const file = this.state.file;
    const currentUserId = currentUser.id;

    this.props.actions.updateModelRequest();
    let haveError = false;
    try {
      await Promise.race([
        dispatch(uploadPhoto({
          forObjectId,
          modelType,
          currentUserId,
          file,
        })),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      haveError = true;
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        this.props.dispatch(showAlertMessage(message))
        debugger
      }
    } finally {
      if (!haveError) {
        this.setState({
          file: {},
          formType: UPLOAD_IMAGE_FILE_DROP
        });
        this.props.actions.updateModelSuccess();
      }
    }
  }


  onDrop(accepted, rejected) {
    if (accepted.length === 1) {
      this.setState({
        file: accepted[0],
        formType: UPLOAD_IMAGE_FILE_PREVIEW
      });
    }
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
    const {editModel} = this.props;
    const isDisabled = (!editModel.form.isValid || editModel.form.isFetching);

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
                {"Perfect!"}
                <b className="margin-left-4">{"Next, submit your photo."}</b>
              </h3>
            </div>

          </div>

          <div className="arrange_unit arrange arrange--middle arrange--18 finish-social-media-container">
            <div className="arrange_unit">
              <button
                disabled={isDisabled}
                onClick={this.onButtonPress.bind(this)}
                className="ybtn ybtn-primary finish-upload-btn"
                type="submit"
                value="submit">
                <span>{"Finish"}</span>
              </button>
            </div>
          </div>
        </div>

        <ul className="uploaded-photos js-uploaded-photos photo-box-grid--inline-block photo-box-grid--wide">
          <li className="uploaded-photo" data-component-bound="true">
            <div className="photo-caption-box photo-box js-photo-box photo-box--interactive">
              <img className="photo-caption-img js-photo-caption-img photo-box-img"
                   src={this.state.file.preview}
              />

              <div className="photo-box_actions photo-box_actions--right">
                <a
                  onClick={(e) => {
                    this.setState({
                      file: {},
                      formType: UPLOAD_IMAGE_FILE_DROP
                    });
                  }}
                  className="photo-box_action-link show-tooltip">
                  <span id="icon_24X24"
                        className="icon icon--24-trash icon--size-24 icon--inverse icon--fallback-inverted delete-photo">
                            <svg className="icon_svg">
                                 <path
                                   d="M5 7V5a1 1 0 0 1 1-1h4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h4a1 1 0 0 1 1 1v2H5zm13 12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8h12v11zm-8-8H9v8h1v-8zm5 0h-1v8h1v-8z"/>
                            </svg>
                  </span>
                  <span className="tooltip-wrapper">
                    <span className="tooltip">
                      {"Delete"}
                    </span>
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
          accept="image/jpeg, image/png"
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

import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(editModelActions, dispatch)
  }
}

function select(store, ownProps) {
  return {
    currentUser: store.user,
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAAddPhotosForm));
