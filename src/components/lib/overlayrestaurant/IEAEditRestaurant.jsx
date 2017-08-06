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

  render() {
    return (
      <div></div>
    );
  }
}


export default IEAEditRestaurant;
