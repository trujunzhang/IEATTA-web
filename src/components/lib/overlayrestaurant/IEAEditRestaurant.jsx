import Telescope from '../../lib'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

const {loadRestaurantPage} = require('../../../actions').default
const {getModelByObjectId} = require('../../filter/filterPosts')

class IEAEditRestaurant extends Component {


  constructor(props, context) {
    super(props)

    const path = props.location.pathname;


    this.state = this.initialState = {
      rid: props.params.rid,
      rslug: props.params.rslug,
      restaurant: null,
      isEdit: path.indexOf('edit/') !== -1,
      ready: false
    }

  }

  render() {
    return (
      <div></div>
    );
  }
}


export default IEAEditRestaurant;
