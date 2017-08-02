import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class IEARestaurantsPage extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="biz-country-us">

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf">
            <Telescope.components.RestaurantsSingleHeader {...this.props}/>

            <Telescope.components.RestaurantsDetail {...this.props}/>
          </div>
        </div>
      </div>
    )
  }
}

export default IEARestaurantsPage;
