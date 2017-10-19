import Telescope from '../../lib'
import React, {Component} from 'react'
import Restaurants from '../../../lib/restaurants'


const {
  writeOnlineParseObject,
  showAlertMessage,
  timeout
} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  // Sections
  SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,

  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
} = require('../../../lib/constants').default

class IEAEditRestaurantLayout extends Component {

  constructor(props, context) {
    super(props)

    const mapInfo = Restaurants.getMapInfo(this.props.forObject, this.props.forObject.geoLocation, false, false, true);
    this.state = {
      mapInfo: mapInfo,
      showFixMapMarker: false,
      // showFixMapMarker: true,
      value: {
        displayName: props.editModel.form.fields.displayName,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT, props.forObject, props.pageForm);
    props.actions.onEditModelFormFieldChange('displayName', props.forObject.displayName || '', true)
    props.actions.onRestaurantFormAddressFieldChange(props.forObject)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    const mapInfo = Restaurants.getMapInfo(
      {
        address: nextProps.editModel.form.fields.address,
        displayName: nextProps.editModel.form.fields.displayName,
        id: nextProps.forObject.id
      },
      nextProps.editModel.form.fields,
      false, false, true);

    this.setState({
      mapInfo: mapInfo,
      value: {
        displayName: nextProps.editModel.form.fields.displayName,
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.displayName !== '') {
      this.props.actions.onEditModelFormFieldChange('displayName', value.displayName)
    }
    this.setState(
      {value}
    )
  }


  renderLeft() {
    return (
      <Telescope.components.EditRestaurantForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {writeOnlineParseObjectAction, showAlertMessageAction} = this.props;

    const editModelType = this.props.editModel.form.editModelType;

    const originalModel = this.props.editModel.form.originModel;
    const {id, uniqueId} = originalModel;
    const parseId = id;

    const displayName = this.props.editModel.form.fields.displayName;

    const latitude = this.props.editModel.form.fields.latitude;
    const longitude = this.props.editModel.form.fields.longitude;
    const address = this.props.editModel.form.fields.address;
    const street_number = this.props.editModel.form.fields.street_number;
    const route = this.props.editModel.form.fields.route;
    const locality = this.props.editModel.form.fields.locality;
    const sublocality = this.props.editModel.form.fields.sublocality;
    const country = this.props.editModel.form.fields.country;
    const postal_code = this.props.editModel.form.fields.postal_code;
    const administrative_area = this.props.editModel.form.fields.administrative_area;

    this.props.actions.updateModelRequest();

    let errorMessage = null
    const _object = {
      editModelType,
      objectSchemaName: PARSE_RESTAURANTS,
      model: {
        parseId,
        uniqueId,
        displayName,
        latitude,
        longitude,
        address,
        street_number,
        route,
        locality,
        sublocality,
        country,
        postal_code,
        administrative_area
      }
    }
    try {
      await Promise.race([writeOnlineParseObjectAction(_object), timeout(15000)]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        showAlertMessageAction({type: ALERT_TYPE_ERROR, text: errorMessage})
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.actions.updateModelSuccess();
        showAlertMessageAction({type: ALERT_TYPE_SUCCESS, text: 'Saved the restaurant successfully!'})
      }
    }
  }


  renderLeftButton() {
    const editModelType = this.props.editModel.form.editModelType;
    const buttonTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Save Restaurant" : "Submit Changes";

    const {editModel} = this.props;
    const isDisabled = (!editModel.form.isValid || editModel.form.isFetching);

    return (
      <div className="form-footer">
        <button
          onClick={this.onButtonPress.bind(this)}
          disabled={isDisabled}
          id="submit-biz-details-changes"
          name="action_submit"
          type="submit"
          value="Submit Changes"
          className="ybtn ybtn--primary">
          <span>{buttonTitle}</span>
        </button>
        <a onClick={this.props.goBack}>
          Cancel
        </a>
      </div>
    )
  }


  renderRight() {
    return (
      <div className="map-wrapper pull-right" id="fix-map-marker-section">
        <div className="map-container yelp-map-container">
          <Telescope.components.F8RestaurantMapSection
            mapInfo={this.state.mapInfo}
          />
        </div>
        {this.renderRightBottom()}
      </div>
    )
  }

  onCloseFixMapMaker() {
    this.setState({showFixMapMarker: false})
  }

  renderRightBottom() {
    return (
      <a onClick={(e) => {
        this.setState({showFixMapMarker: true})
      }}
         className="show-locator-popup pull-right">
                <span id="icon_18X18"
                      className="icon icon--18-marker icon--size-18 icon--neutral-gray u-space-r-half">
                     <svg className="icon_svg">
                           <path
                             d="M14 7A5 5 0 0 0 4 7c0 1.97 1.15 3.658 2.806 4.472h-.17L9 16l2.363-4.528h-.17C12.85 10.658 14 8.97 14 7zM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                     </svg>
                </span>
        {"Fix incorrect map marker"}
      </a>
    )
  }

  renderContent() {
    return (
      <div
        className="biz-attrib-form yform"
        id="biz_attrib_form"
        name="biz_attrib_form">

        {this.renderRight()}

        {this.renderLeft()}
        {this.renderLeftButton()}

      </div>

    )
  }

  render() {
    const editModelType = this.props.editModel.form.editModelType;
    const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a Restaurant" : "Update Restaurant Details";

    return (
      <div>
        <div className="main-content-wrap main-content-wrap--full">
          <div id="super-container" className="content-container">

            <Telescope.components.F8AppAlertSection/>

            <div className="container">
              <div className="clearfix layout-block layout-full" id="update-biz-details">

                <div className="column column-alpha ">

                  <h2>{formTitle}</h2>

                  {this.renderContent()}

                </div>
              </div>
            </div>
          </div>

        </div>

        {
          this.state.showFixMapMarker &&
          <div className="body-overlay" style={{"display": "block"}}/>
        }
        {
          this.state.showFixMapMarker &&
          <Telescope.components.RestaurantsFixMapMarker
            {...this.props}
            onCloseFixMapMaker={this.onCloseFixMapMaker.bind(this)}/>
        }
      </div>
    )
  }
}


import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(editModelActions, dispatch),
    writeOnlineParseObjectAction: (object) => dispatch(writeOnlineParseObject(object)),
    showAlertMessageAction: (object) => dispatch(showAlertMessage(object)),
  }
}

function select(store, ownProps) {
  return {
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAEditRestaurantLayout));
