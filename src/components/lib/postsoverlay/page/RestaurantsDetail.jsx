import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsDetail extends Component {

  render() {
    return (
      <div>
        <Telescope.components.EventsList {...this.props}/>
      </div>
    )
  }
}

export default RestaurantsDetail;
