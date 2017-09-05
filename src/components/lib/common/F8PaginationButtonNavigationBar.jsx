import React, {Component} from 'react';

import {withRouter} from 'react-router'
import {getCurrentPageIndex} from '../../../lib/link'

class F8PaginationButtonNavigationBar extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      currentPageIndex: getCurrentPageIndex(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPageIndex: getCurrentPageIndex(nextProps)
    })
  }

  onPaginationButtonPress(page) {
    const pageQuery = {page}
    const newLocation =
      {
        pathname: this.props.location.pathname,
        query: Object.assign(this.props.location.query, pageQuery)
      };
    this.props.router.push(newLocation);
  }

  render() {
    const {currentPageIndex} = this.state;
    const {listTask, forObject} = this.props;

    const {
      limit,
      results,
      ready,
      totalCount,
    } = listTask;

    const totalPage = totalCount / limit;

    const arrangeUnits = [];

    for (let x = 0; x < totalPage; x++) {
      let row = (
        <div key={x} className="arrange_unit page-option">
          <a className="available-number pagination-links_anchor"
             onClick={(e) => this.onPaginationButtonPress(x + 1)}>{x + 1}</a>
        </div>
      )

      if (`${x + 1}` === currentPageIndex) {
        row = (
          <div key={x} className="arrange_unit page-option current">
            <span className="pagination-links_anchor">{x + 1}</span>
          </div>
        )
      }
      arrangeUnits.push(row)
    }

    return (
      <div className="pagination-block">
        <div className="arrange arrange--stack arrange--baseline arrange--6">
          <div className="page-of-pages arrange_unit arrange_unit--fill">
            {`Page ${currentPageIndex} of ${totalPage}`}
          </div>

          <div className="pagination-links arrange_unit">
            <div className="arrange arrange--baseline">

              {
                currentPageIndex !== "1" &&
                this.renderPreviousIcon()}

              {arrangeUnits}

              {
                currentPageIndex !== `${totalPage}` &&
                this.renderNextIcon()}

            </div>

          </div>

        </div>
      </div>
    )
  }

  onPreviousIconPress() {
    const {currentPageIndex} = this.state;
    const currentIndex = parseInt(currentPageIndex)
    if (currentIndex > 1) {
      this.onPaginationButtonPress(currentIndex - 1)
    }
  }

  onNextIconPress() {
    const {listTask, forObject} = this.props;

    const {
      limit,
      results,
      ready,
      totalCount,
    } = listTask;

    const totalPage = totalCount / limit;

    const {currentPageIndex} = this.state;
    const currentIndex = parseInt(currentPageIndex)
    if (currentIndex < totalPage) {
      this.onPaginationButtonPress(currentIndex + 1)
    }

  }

  renderPreviousIcon() {
    return (
      <div className="arrange_unit">
        <a
          onClick={this.onPreviousIconPress.bind(this)}
          className="u-decoration-none block prev pagination-links_anchor">
                    <span id="icon_24X24" className="icon icon--24-chevron-left icon--size-24 icon--currentColor">
                        <svg className="icon_svg">
                            <path d="M14.475 18.364l1.414-1.414L10.94 12l4.95-4.95-1.415-1.414L8.11 12l6.365 6.364z"/>
                        </svg>
                    </span>
          <span className="pagination-label responsive-hidden-small">Previous</span>
        </a>
      </div>
    )
  }

  renderNextIcon() {
    return (
      <div className="arrange_unit">
        <a
          onClick={this.onNextIconPress.bind(this)}
          className="u-decoration-none next pagination-links_anchor">
                    <span className="pagination-label responsive-hidden-small pagination-links_anchor">
                        {"Next"}
                    </span>
          <span id="icon_24X24" className="icon icon--24-chevron-right icon--size-24 icon--currentColor">
                       <svg className="icon_svg">
                            <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"/>
                       </svg>
                 </span>
        </a>
      </div>
    )
  }

}


export default withRouter(F8PaginationButtonNavigationBar);
