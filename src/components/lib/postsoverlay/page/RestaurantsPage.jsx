import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsPage extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="biz-country-us">

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf">
            <Telescope.components.RestaurantsSingleHeader/>

            <div id="super-container" className="content-container">
              <Telescope.components.RestaurantsDetail/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantsPage
