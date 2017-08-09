import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

class IEARestaurantsLayout extends Component {

  render() {
    return (
      <div className="biz-country-us">

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf">
            {/*<Telescope.components.RestaurantsSingleHeader {...this.props}/>*/}
          </div>

          <div id="super-container" className="content-container">
            <Telescope.components.RestaurantsDetail {...this.props}/>
          </div>

        </div>
      </div>
    )
  }
}

export default IEARestaurantsLayout;
