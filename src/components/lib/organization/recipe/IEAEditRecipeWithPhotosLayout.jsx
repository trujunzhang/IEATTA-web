import Telescope from '../../index'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const numberMask = createNumberMask({
  prefix: '$',
  suffix: '',
  allowDecimal: true,
  requireDecimal: true,
  integerLimit: 3
})

const {
  writeOnlineParseObject,
  showAlertMessage,
  timeout
} = require('../../../../actions/index').default


/**
 * The states were interested in
 */
const {
  MODEL_FORM_TYPE_NEW,
  PARSE_RECIPES,
  MENU_ITEM_ADD_OR_EDIT_RECIPE,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  // Photo browser title
  PHOTO_BROWSER_ORGANIZATION_TITLE,
} = require('../../../../lib/constants').default


class IEAEditRecipeWithPhotosLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      value: {
        displayName: props.editModel.form.fields.displayName,
        price: props.editModel.form.fields.price,
      }
    }

    const recipe = props.forObject || {displayName: '', price: 0};

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RECIPE, props.forObject, props.pageForm);
    props.actions.onEditModelFormFieldChange('displayName', recipe.displayName, true)
    props.actions.onEditModelFormFieldChange('price', recipe.price, true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        displayName: nextProps.editModel.form.fields.displayName,
        price: nextProps.editModel.form.fields.price,
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
      <Telescope.components.EditRecipeForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {writeOnlineParseObjectAction, forRelationObject} = this.props;

    const editModelType = this.props.editModel.form.editModelType;

    const originalModel = this.props.editModel.form.originModel;
    const {id, uniqueId} = originalModel;
    const parseId = id;

    const displayName = this.props.editModel.form.fields.displayName;
    const price = this.props.editModel.form.fields.price;

    this.props.actions.updateModelRequest();

    let errorMessage = null

    const _object = {
      editModelType,
      objectSchemaName: PARSE_RECIPES,
      model: {
        parseId,
        uniqueId,
        displayName, price,
        restaurant: {
          id: forRelationObject.id,
          uniqueId: forRelationObject.uniqueId
        },
      }
    }

    debugger

    try {
      // await Promise.race([writeOnlineParseObjectAction(_object), timeout(15000)]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.actions.updateModelSuccess();
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_SUCCESS, text: 'Saved the recipe successfully!'}))
      }
    }
  }


  renderLeftButton() {
    const {editModel} = this.props;
    const isDisabled = (!editModel.form.isValid || editModel.form.isFetching);

    const editModelType = this.props.editModel.form.editModelType;
    const buttonTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Create an Recipe" : "Update the Recipe";

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
          {'Cancel'}
        </a>
      </div>
    )
  }

  onPriceChange(e) {
    const newValue = e.target.value.replace('$', '')

    this.props.actions.onEditModelFormFieldChange('price', newValue, true)

    this.setState({
      value:
        Object.assign({}, this.state.value, {
          price: newValue
        })
    })
  }

  renderContent() {
    return (
      <div
        className="biz-attrib-form yform"
        id="biz_attrib_form"
        name="biz_attrib_form">

        {this.renderLeft()}

        <label>Price</label>

        <div className="js-event-set-date event-calendar-fields">
          <div className="js-event-start-date-container date-container">

            <MaskedInput
              mask={numberMask}
              guide={false}
              placeholder="Enter a price number"
              className='form-control'
              type='text'
              value={this.state.value.price}
              onChange={this.onPriceChange.bind(this)}
            />

          </div>
        </div>

        {this.renderLeftButton()}

      </div>

    )
  }


  renderTitle() {
    const editModelType = this.props.editModel.form.editModelType;
    const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Submit an Recipe" : "Update the Recipe";

    return (
      <div className="section-header">
        <h2>{formTitle}</h2>
      </div>
    )
  }

  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <Telescope.components.F8AppAlertSection/>

          <div className="container">

            <div className="clearfix layout-block layout-full" id="update-biz-details">
              <div className="column column-alpha ">
                {this.renderTitle()}
                {this.renderContent()}
              </div>
            </div>
          </div>


          <Telescope.components.IEAPhotosBrowserLayout
            photoTitleType={PHOTO_BROWSER_ORGANIZATION_TITLE}
            {...this.props}/>

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

import * as editModelActions from '../../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(editModelActions, dispatch),
    writeOnlineParseObjectAction: (object) => dispatch(writeOnlineParseObject(object)),
  }
}

function select(store, ownProps) {
  return {
    editModel: store.editModel,
    goBack: ownProps.router.goBack
  };
}

export default withRouter(connect(select, mapDispatchToProps)(IEAEditRecipeWithPhotosLayout));
