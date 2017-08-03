import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class OrderedUsersSingleHeader extends Component {

  renderTopTitle() {
    const {forEvent} = this.props;


    return (
      <div className="arrange arrange--12">
        <div className="arrange_unit arrange_unit--fill">
          <h1>{forEvent.displayName || ''}</h1>
          <div className="event-details_category-links">

            <span className="category-str-list">
                <a href="/events/fremont-ca-us/browse?c=8">Festivals &amp; Fairs</a>
            </span>

          </div>
        </div>
      </div>

    )
  }


  render() {
    return (
      <div className="content-container">

        <div className="event-details_header ysection">
          {this.renderTopTitle()}
        </div>


        <div
          className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive">

          <div className="column column-alpha column--responsive">
            {/*<Telescope.components.OrderedUsersSingleHeaderLeftPanel {...this.props}/>*/}
          </div>

          <div className="column column-beta column--responsive">
            {/*<Telescope.components.OrderedUsersSingleHeaderRightMap {...this.props}/>*/}
          </div>

        </div>

      </div>
    )

  }
}

export default OrderedUsersSingleHeader;
