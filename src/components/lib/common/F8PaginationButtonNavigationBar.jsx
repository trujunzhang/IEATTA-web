import React, { Component } from 'react';

import {withRouter} from 'react-router'

class F8PaginationButtonNavigationBar extends Component {

    onPaginationButtonPress(){
    const {listTask,forObject} = this.props;

    const {
        limit,
        results,
        ready,
        totalCount,
    } = listTask;


        const newLocation =
            {
                pathname: this.props.location.pathname,
                query: Object.assign(this.props.location.query,{start: 15})
            };
        this.props.router.push(newLocation);

    }

  renderReviewsListFooter() {
    const {listTask,forObject} = this.props;

      const {
          limit,
          results,
          ready,
          totalCount,
    } = listTask;

      debugger

    return (
      <div className="pagination-block">
        <div className="arrange arrange--stack arrange--baseline arrange--6">
          <div className="page-of-pages arrange_unit arrange_unit--fill">
            Page 1 of 6
          </div>

          <div className="pagination-links arrange_unit">
            <div className="arrange arrange--baseline">

              <div className="arrange_unit page-option current">
                <span className="pagination-links_anchor">1</span>
              </div>

              <div className="arrange_unit page-option">
                <a className="available-number pagination-links_anchor"
                   href="/not_recommended_reviews/mourad-restaurant-san-francisco?not_recommended_start=10">
                  2
                </a>
              </div>

              <div className="arrange_unit">
                <a className="u-decoration-none next pagination-links_anchor"
                   href="/not_recommended_reviews/mourad-restaurant-san-francisco?not_recommended_start=10">
                  <span className="pagination-label responsive-hidden-small pagination-links_anchor">Next</span>
                  <span id="icon_24X24" className="icon icon--24-chevron-right icon--size-24 icon--currentColor">
                       <svg className="icon_svg">
                            <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                       </svg>
                 </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }


	render() {
      return this.renderReviewsListFooter();
	}
}


export default F8PaginationButtonNavigationBar;
