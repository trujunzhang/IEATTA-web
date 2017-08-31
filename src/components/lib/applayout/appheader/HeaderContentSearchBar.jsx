import React, {Component} from 'react'
import {withRouter} from 'react-router'


const {loadRestaurantsList} = require('../../../../actions').default
const {delayEvent} = require('../../../../lib/utils')

class HeaderContentSearchBar extends Component {

  constructor(props) {
    super(props);

    let query = props.router.location.query.search;
    this.state = this.initialState = {
      search: query || ''
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if ((!!nextProps.location.query.search)) {
      this.setState({search: nextProps.location.query.search});
    } else {
      this.setState({search: ''});
    }
  }

  search(e) {
    const input = e.target.value;
    this.setState({search: input});

    this.searchQuery(input);
  }

  searchQuery(input) {
    const {dispatch, router} = this.props,
      query = input === '' ? {} : {query: input};

    const self = this;

    delayEvent(function () {
      if (input === "") {
        router.replace({pathname: router.location.pathname})
      } else {
        router.replace({pathname: '/', query: {search: input}})
      }
    }, 700)
  }


  renderLeftSearchbar() {
    return (
      <div className="arrange_unit main-search_search-field-arrange">
        <div className="main-search_suggestions-field search-field-container find-decorator">
          <label className="main-search_pseudo-input main-search_pseudo-input--find pseudo-input">
            <span className="pseudo-input_text">Find</span>
            <span className="pseudo-input_field-holder">
                  <input maxLength="64"
                         id="find_desc"
                         value={this.state.search}
                         onChange={this.search.bind(this)}
                         placeholder="pizza, pub, Mustafa"
                         className="main-search_field pseudo-input_field"
                  />
            </span>
          </label>
        </div>

      </div>
    )
  }

  renderRightSearchbar() {
    return (
      <div
        className="arrange_unit main-search_near-field-arrange  main-search_search-field-arrange arrange_unit--stack-12">
        <div className="main-search_suggestions-field search-field-container near-decorator">
          <label className="main-search_pseudo-input main-search_pseudo-input--near pseudo-input">
            <span className="pseudo-input_text">Near</span>
            <span className="main-search_field-holder pseudo-input_field-holder">
                          <input maxLength="80" id="dropperText_Mast" autoComplete="off" value="Los Angeles, CA"
                                 placeholder="Address, Neighbourhood, or Postcode" data-query="Los Angeles, CA"
                                 className="main-search_field pseudo-input_field" tabIndex="2"/>
                        </span>
          </label>
        </div>

      </div>
    )
  }

  renderSearchIcon() {
    return (
      <div className="arrange_unit main-search_actions arrange_unit--stack-12">
        <div className="arrange arrange--wrap arrange--6">
          <div
            className="arrange_unit hidden-non-responsive-inline-block responsive-visible-small-inline-block main-search_action">
            <a className="ybtn ybtn--primary main-header_button js-search-close main-search_close">
              Cancel
            </a>
          </div>
          <div className="arrange_unit main-search_action arrange_unit--stack-12">
            <button className="ybtn ybtn--primary main-search_submit main-header_button"
                    id="header-search-submit"
                    tabIndex="3"
                    title="Search"
                    type="submit"
                    value="submit">
                            <span className="main-search_action-icon-wrap js-search-icon-wrap">
                                <span id="icon_24X24"
                                      className="icon icon--24-search icon--size-24 icon--inverse icon--fallback-inverted">
                                  <svg className="icon_svg">
                                    <path
                                      d="M20.753 19.34l-4.295-4.297A7.46 7.46 0 0 0 18 10.5a7.5 7.5 0 1 0-7.5 7.5 7.46 7.46 0 0 0 4.543-1.542l4.296 4.295a1 1 0 1 0 1.412-1.414zM10.5 16A5.506 5.506 0 0 1 5 10.5C5 7.467 7.467 5 10.5 5S16 7.467 16 10.5 13.533 16 10.5 16z"/>
                                  </svg>
                                </span>
                                <span className="u-offscreen">Search</span>
                            </span>
            </button>
          </div>
        </div>
      </div>

    )
  }

  render() {
    return (
      <div
        className="arrange_unit arrange_unit--fill align-middle main-header--full_arrange_unit main-header_search-container">
        <div className="main-header_search responsive-hidden-medium-only">

          <form method="get"
                id="header_find_form"
                className="main-search yform u-space-b0"
                role="search">
            <div className="arrange arrange--stack">
              <div className="arrange_unit arrange_unit--fill">
                <div className="arrange arrange--equal arrange--stack">

                  {this.renderLeftSearchbar()}
                </div>
              </div>

              {this.renderSearchIcon()}
            </div>
          </form>

        </div>

      </div>
    )
  }
}

export default withRouter(HeaderContentSearchBar)
