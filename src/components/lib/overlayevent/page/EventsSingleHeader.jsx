import Telescope from '../../../lib'
import React, {Component} from 'react'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

import {getEditEventLink} from '../../../../lib/link'

class EventsSingleHeader extends Component {


  rendRatingRow() {
    const {reviewStatistic} = this.props;
    return (
      <div className="biz-rating biz-rating-medium clearfix">
        <Telescope.components.F8StarIcon
          rate={reviewStatistic.reviewRating}
          iconExtension="rating"
          iconType="small"
          iconWidth="84"
          iconHeight="303"/>
        <span className="review-count rating-qualifier">
                {`${reviewStatistic.total} reviews`}
                </span>

      </div>
    )
  }

  renderTopTitle() {
    const {event} = this.props;

    return (
      <div className="arrange arrange--12">
        <div className="arrange_unit arrange_unit--fill">
          <h1>{event.displayName}</h1>
        </div>
      </div>
    )
  }

  renderTopSection() {
    const {forObject} = this.props;
    return (
      <div className="event-details_header ysection">
        {this.renderTopTitle()}

        {this.rendRatingRow()}

        <Telescope.components.F8SinglePageHeaderButtonsSection
          {...this.props}
          showEdit={true}
          editLink={getEditEventLink(forObject, forObject.restaurant)}
        />
      </div>
    )
  }


  renderSubHeader() {
    return (
      <div
        className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive">

        <div className="column column-alpha column--responsive">
          <Telescope.components.EventsSingleHeaderLeftPanel {...this.props}/>
        </div>

        <div className="column column-beta column--responsive">
          <Telescope.components.EventsSingleHeaderRightMap {...this.props}/>
        </div>

      </div>

    )
  }

  render() {
    return (
      <div className="content-container">
        {this.renderTopSection()}
        {this.renderSubHeader()}
      </div>
    )

  }
}

export default EventsSingleHeader;
