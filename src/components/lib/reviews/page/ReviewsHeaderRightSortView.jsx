import React, {Component} from 'react';
import Telescope from '../../index'
import Reviews from '../../../../lib/reviews'

import onClickOutside from 'react-onclickoutside'

import {Link} from 'react-router'
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
    const reviewListType = this.props.reviewListType || REVIEW_LIST_TYPE_NORMAL;
    const currentDropDownMenus = Reviews.getCurrentSortArray(reviewListType);

    this.state = {
      isOpening: false,
      currentDropDownMenus: currentDropDownMenus,
      selectedDropDownMenuIndex: Reviews.getCurrentSelectedDropMenuIndex(currentDropDownMenus, props)
    }

  }


  renderDropList() {
    const {isOpening, currentDropDownMenus, selectedDropDownMenuIndex} = this.state;
    const dropMenuClass = "dropdown_menu js-dropdown-menu " + (isOpening ? "is-visible" : "");

    return (
      <div className={dropMenuClass}>
        <div className="dropdown_menu-inner">
          <ul className="dropdown_menu-group">

            {currentDropDownMenus.map((menu, index) => {
              const menuClass = "tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown" +
                ((selectedDropDownMenuIndex === index) ? " is-selected" : '');

              const newLocation =
                {
                  pathname: this.props.location.pathname,
                  query: Object.assign(this.props.location.query,
                    {sort_by: Reviews.SORT_TAGS[menu.queryTag]})
                };
              return (
                <li key={index} className="dropdown_item">
                  <Link className={menuClass}
                        onClick={() => {
                          this.props.router.push(newLocation)

                          this.setState({
                            isOpening: false,
                            selectedDropDownMenuIndex: index
                          })
                        }}
                        id="review-sort-menu-item">
                    <span className="tab-link_label" title={menu.title}>{menu.title}</span>
                  </Link>
                </li>
              )
            })}

          </ul>
        </div>
      </
        div>

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
            {this.state.currentDropDownMenus[this.state.selectedDropDownMenuIndex].title}
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

export default withRouter(onClickOutside(ReviewsHeaderRightSortView));
