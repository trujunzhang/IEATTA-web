import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  updateRestaurant,
  showAlertMessage,
  timeout
} = require('../../../actions').default


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


class IEAEditRestaurantLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      value: {
        displayName: props.editModel.form.fields.displayName,
      }
    }
    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT);
    props.actions.onEditModelFormFieldChange('displayName', props.restaurant.displayName || '', true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
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
    const {dispatch, restaurant} = this.props;

    const displayName = this.props.editModel.form.fields.displayName;

    this.props.actions.updateModelRequest();

    try {
      await Promise.race([
        dispatch(updateRestaurant({objectId: restaurant.id, displayName: displayName})),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        this.props.dispatch(showAlertMessage(message))
        debugger
        // alert(message);
        // console.warn(e);
      }
    } finally {
      this.props.actions.updateModelSuccess();
      // this._isMounted && this.setState({isLoading: false});
    }
  }


  renderLeftButton() {
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
          <span>Submit Changes</span>
        </button>
        <a onClick={this.props.goBack}>
          Cancel
        </a>
      </div>
    )
  }


  renderRight() {
    return (
      <div className="map-wrapper pull-right">
        <div className="map-container yelp-map-container">
          <Telescope.components.F8RestaurantMapSection  {...this.props} showEditButton={true} onlyMap={true}/>
        </div>
        {this.renderRightBottom()}
      </div>
    )
  }

  renderRightBottom() {
    return (
      <a className="show-locator-popup pull-right">
                <span
                  id="icon_18X18"
                  className="icon icon--18-marker icon--size-18 icon--neutral-gray u-space-r-half">
    <svg className="icon_svg">
    <path
      d="M14 7A5 5 0 0 0 4 7c0 1.97 1.15 3.658 2.806 4.472h-.17L9 16l2.363-4.528h-.17C12.85 10.658 14 8.97 14 7zM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
</span>
        Fix incorrect map marker
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
    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container">
            <div className="clearfix layout-block layout-full" id="update-biz-details">

              <div className="column column-alpha ">

                <h2>Update Business Details</h2>

                {this.renderContent()}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(editModelActions, dispatch)
  }
}

function select(store, ownProps) {
  return {
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAEditRestaurantLayout));
