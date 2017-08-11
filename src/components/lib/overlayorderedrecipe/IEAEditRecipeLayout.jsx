import Telescope from '../../lib'
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

/**
 * ### Translations
 */
// const I18n = require('react-i18n')
// import Translations from '../../../lib/Translations'

// I18n.translations = Translations

const {updateRecipe, timeout} = require('../../../actions').default

const {
  isNewModelPage
} = require('../../filter/filterRoutes')

/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
} = require('../../../lib/constants').default


class IEAEditRecipeLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      value: {
        displayName: props.editModel.form.fields.displayName,
        price: props.editModel.form.fields.price,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT);
    props.actions.onEditModelFormFieldChange('displayName', props.recipe.displayName || '', true)
    props.actions.onEditModelFormFieldChange('price', props.recipe.price || 0, true)
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
    const {dispatch, recipe} = this.props;

    const objectId = recipe.id;
    const displayName = this.props.editModel.form.fields.displayName;
    const price = this.props.editModel.form.fields.price;

    this.props.actions.updateModelRequest();

    try {
      await Promise.race([
        dispatch(updateRecipe({objectId, displayName, price})),
        timeout(15000),
      ]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        // debugger
        alert(message);
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
          <span>{`${isNewModelPage(this.state.pageForm) ? 'Create Recipe' : 'Submit Changes'}`}</span>
        </button>
        <a onClick={this.props.goBack}>
          Cancel
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
    return (
      <div className="section-header">
        <h2>{`${isNewModelPage(this.state.pageForm) ? 'Submit' : 'Update'} a Recipe`}</h2>
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

export default withRouter(connect(select, mapDispatchToProps)(IEAEditRecipeLayout));
