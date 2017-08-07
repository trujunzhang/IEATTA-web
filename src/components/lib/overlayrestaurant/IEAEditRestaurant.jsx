import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {loadRestaurantPage} = require('../../../actions').default
const {getModelByObjectId} = require('../../filter/filterPosts')

class IEAEditRestaurant extends Component {

  constructor(props, context) {
    super(props)


    const {restaurant} = this.props;

    this.state = this.initialState = {
      displayName: restaurant.displayName,
      address: restaurant.address,
      geoLocation: restaurant.geoLocation
    }

  }

  renderLeft() {
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


export default IEAEditRestaurant;
