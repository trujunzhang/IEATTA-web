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
      displayName: restaurant.displayName
    }

  }

  renderLeft() {
    return (
      <ul>
        <li className="BusinessName">
          <label
          >Business Name</label>

          <span className="placeholder-sub help-block">
                        Mel’s Diner
                    </span>
          <input className="text" id="attr_BusinessName" name="BusinessName" placeholder="Mel’s Diner" type="text"
                 value="Los Cabos"
          />
        </li>


        <li className="BusinessStreetAddress1">
          <label
          >Address 1</label>

          <span className="placeholder-sub help-block">
                        123 Main St
                    </span>
          <input className="text" id="attr_BusinessStreetAddress1" name="BusinessStreetAddress1"
                 placeholder="123 Main St" type="text" value="3283 Walnut Ave"/>

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
      <div className="map-wrapper pull-right" data-component-bound="true">
        <div className="map-container yelp-map-container" data-component-bound="true">
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <form
        className="biz-attrib-form yform"
        id="biz_attrib_form"
        method="POST"
        name="biz_attrib_form" data-component-bound="true">

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
