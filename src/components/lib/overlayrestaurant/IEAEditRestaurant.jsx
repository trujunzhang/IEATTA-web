import Telescope from '../../lib'
import React, {Component} from 'react'


/**
 * ### Translations
 */
// const I18n = require('react-i18n')
// import Translations from '../../../lib/Translations'

// I18n.translations = Translations

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


const {loadRestaurantPage} = require('../../../actions').default
const {getModelByObjectId} = require('../../filter/filterPosts')

class IEAEditRestaurant extends Component {

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
      <Telescope.components.RestaurantForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }

  renderLeftxxx() {
    return (
      <ul>
        <li className="BusinessName">
          <label>Restaurant Name</label>

          <input className="text"
                 id="attr_BusinessName"
                 name="BusinessName"
                 placeholder={this.props.restaurant.displayName}
                 type="text"
                 value={this.state.displayName}
          />
        </li>


        <li className="BusinessStreetAddress1">
          <label>Address 1</label>

          <input className="text"
                 id="attr_BusinessStreetAddress1"
                 name="BusinessStreetAddress1"
                 placeholder="123 Main St"
                 type="text"
                 value="3283 Walnut Ave"/>
        </li>


        <li className="BusinessStreetAddress2">
          <label
          >Address 2</label>

          <span className="placeholder-sub help-block">
                        Ste 200
                    </span>
          <input className="text" id="attr_BusinessStreetAddress2" name="BusinessStreetAddress2" placeholder="Ste 200"
                 type="text"/>

        </li>

      </ul>

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
      <form
        className="biz-attrib-form yform"
        id="biz_attrib_form"
        method="POST"
        name="biz_attrib_form">

        {this.renderRight()}

        {this.renderLeft()}

      </form>

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
                <p>Any suggested changes to a business page must first be verified by Yelp’s moderators.</p>

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

function select(store) {
  return {
    editModel: store.editModel
  };
}

export default connect(select, mapDispatchToProps)(IEAEditRestaurant)
