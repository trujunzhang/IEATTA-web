import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class RestaurantsSingleHeader extends Component {


  render() {
    const {restaurant} = this.props;
    return (
      <div className="content-container">
        <div className="biz-page-header clearfix">

          <Telescope.components.RestaurantsSingleHeaderTopLeftPanel  {...this.props}/>

          <div className="biz-page-header-right u-relative">
            <Telescope.components.F8PageHeaderButtonsSection {...this.props}/>
          </div>
        </div>

        <div className="biz-page-subheader">

          {/*Left Panel*/}
          <div className="mapbox-container">
            <Telescope.components.F8RestaurantMapSection  {...this.props} showEditButton={true}/>
          </div>


          {/*Right Panel*/}
          <Telescope.components.F8SingleHeaderRightPhotos photos={this.props.photosListTask.results}
                                                          photoType="restaurant"
                                                          forObject={restaurant}/>
        </div>
      </div>
    )

  }
}

export default RestaurantsSingleHeader;
