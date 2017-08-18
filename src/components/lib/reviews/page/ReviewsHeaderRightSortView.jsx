import React, {Component} from 'react';
import Telescope from '../../index'
import Posts from '../../../../lib/posts'

import onClickOutside from 'react-onclickoutside'

import {withRouter} from 'react-router'

export class ReviewsHeaderRightSortView extends Component {


  constructor(props) {
    super(props)

    const {params, location} = props;

    this.state = {
      isOpening: false
    }
  }

  renderDropList() {
    const {isOpening} = this.state;
    const dropMenuClass =
      "dropdown_menu js-dropdown-menu " +
      (isOpening ? "is-visible" : "");

    return (
      <div className={dropMenuClass}>
        <div className="dropdown_menu-inner">
          <ul className="dropdown_menu-group" role="menu" aria-hidden="false">
            <li className="dropdown_item" role="presentation">
              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown is-selected"
                 data-review-feed-label="Yelp Sort" data-sort="relevance"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=relevance_desc&amp;start=0">
                <span className="tab-link_label" title="Yelp Sort">Yelp Sort</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown"
                 data-order_by="desc"
                 data-review-feed-label="Newest First" data-sort="date"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=date_desc&amp;start=0">
                <span className="tab-link_label" title="Newest First">Newest First</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown"
                 data-order_by="asc"
                 data-review-feed-label="Oldest First" data-sort="date"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=date_asc&amp;start=0">
                <span className="tab-link_label" title="Oldest First">Oldest First</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown"
                 data-order_by="desc"
                 data-review-feed-label="Highest Rated" data-sort="rating"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=rating_desc&amp;start=0">
                <span className="tab-link_label" title="Highest Rated">Highest Rated</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown"
                 data-order_by="asc"
                 data-review-feed-label="Lowest Rated" data-sort="rating"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=rating_asc&amp;start=0">
                <span className="tab-link_label" title="Lowest Rated">Lowest Rated</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown"
                 data-review-feed-label="Elites" data-sort="elites"
                 href="https://www.yelp.com/biz/chef-cho-fremont?sort_by=elites_desc&amp;start=0">
                <span className="tab-link_label" title="Elites">Elites</span>
              </a>

            </li>
          </ul>
        </div>
      </div>

    )
  }

  onSortPress(e) {
    this.setState({isOpening: !this.state.isOpening})
  }


  handleClickOutside(e) {
    this.setState({isOpening: false})
  }

  renderSortButton() {
    /* DropDown prefix is so IMPORTANT */
    return (
      <a onClick={this.onSortPress.bind(this)}
         id="review-header-sort-button" className="dropdown_toggle-action">
        <span className="dropdown_toggle-text js-dropdown-toggle-text">
          {"Yelp Sort"}
        </span>
        <span
          id="icon_14X14"
          className="icon icon--14-triangle-down icon--size-14 icon--currentColor u-triangle-direction-down dropdown_arrow">
                  <svg className="icon_svg">
                       <path d="M7 9L3.5 5h7L7 9z"/>
                  </svg>
               </span>
      </a>
    )
  }

  render() {
    const {isOpening} = this.state;
    const dropClass =
      "dropdown js-dropdown dropdown--tab dropdown--arrow dropdown--hover dropdown--restricted " +
      (isOpening ? "is-active" : "");

    const dropToggleClass =
      "dropdown_toggle js-dropdown-toggle " +
      (isOpening ? "is-active" : "");

    return (
      <div className="arrange_unit u-nowrap">
        <div className="feed_sort js-review-feed-sort">

          <div className={dropClass}>

            <div className={dropToggleClass}>
              {this.renderSortButton()}
            </div>

            <div className="dropdown_menu-container">
              {this.renderDropList()}
            </div>

          </div>

        </div>
      </div>

    );
  }
}


export default onClickOutside(ReviewsHeaderRightSortView);
