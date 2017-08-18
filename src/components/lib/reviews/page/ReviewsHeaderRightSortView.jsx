import React, {Component} from 'react';
import Telescope from '../../index'
import Posts from '../../../../lib/posts'

import onClickOutside from 'react-onclickoutside'

import {withRouter} from 'react-router'

const {
  REVIEW_LIST_TYPE_NORMAL,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS,
} = require('../../../../lib/constants').default

export class ReviewsHeaderRightSortView extends Component {


  constructor(props) {
    super(props)

    const {params, location} = props;
    const forUserProfile = this.props.forUserProfile || REVIEW_LIST_TYPE_NORMAL;

    this.state = {
      isOpening: false
    }
  }

  renderDropList() {
    const {isOpening} = this.state;
    const dropMenuClass =
      "dropdown_menu js-dropdown-menu " + (isOpening ? "is-visible" : "");

    return (
      <div className={dropMenuClass}>
        <div className="dropdown_menu-inner">
          <ul className="dropdown_menu-group">
            <li className="dropdown_item">
              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown">
                <span className="tab-link_label" title="Yelp Sort">Normal Sort</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">

              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown is-selected">
                <span className="tab-link_label" title="Newest First">Newest First</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown">
                <span className="tab-link_label" title="Oldest First">Oldest First</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">

              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown">
                <span className="tab-link_label" title="Highest Rated">Highest Rated</span>
              </a>

            </li>
            <li className="dropdown_item" role="presentation">


              <a className="tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown">
                <span className="tab-link_label" title="Lowest Rated">Lowest Rated</span>
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
      <a onClick={this.onSortPress.bind(this)} id="review-header-sort-button" className="dropdown_toggle-action">
        <span className="dropdown_toggle-text js-dropdown-toggle-text">
          {"Normal Sort"}
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
