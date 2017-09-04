import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import {Link} from 'react-router'
import {
  geDetailedModelLink,
  getAddPhotoLink
} from '../../../lib/link'

const {loadReviewsList} = require('../../../actions').default
const {byListId, getDefaultListTask} = require('../../filter/filterPosts')
const {generateTermsForReviewsList} = require('../../filter/filterRoutes')

class IEAReviewsListLayout extends Component {

  constructor(props, context) {
    super(props)

      const {params,location}= props;
      const {modelType,forObjectId,forObjectDisplayName} = params;
      const reviewType = modelType;

      const forObject = {
        id: forObjectId,
        modelType:modelType,
        displayName:forObjectDisplayName
      };

    const terms = generateTermsForReviewsList({reviewType,forObject, location})

    this.state = {
      // Common
      terms: terms,
      listTask: getDefaultListTask(terms),
      modelType: modelType,
      // Detailed object
      forObject: forObject,
      forObjectId: forObjectId,
    }
  }

  componentWillReceiveProps(nextProps) {
    const newListTask = byListId(nextProps.listContainerTasks, this.state.terms.listId, this.state.listTask);

    this.setState({
      listTask: newListTask
    })
  }

  componentDidMount() {
    const {terms, listTask} = this.state;
    this.loadMore(terms, listTask)
  }

  loadMore(terms, listTask) {
    this.props.dispatch(loadReviewsList(listTask, terms))
  }


  renderReviewListHeader() {
    return (
      <h3>
        52 reviews for Mourad Restaurant that are not currently recommended
      </h3>
    )
  }

  renderReviewsListFooter() {
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


  renderRows() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask;

    if (!ready) {
      return (<Telescope.components.F8LoadingView/>)
    } else if (!!results && results.length) {
      return (
        <ul className="ylist ylist-bordered reviews">
          {results.map((review, index) => {
                return (<Telescope.components.ReviewsItem key={review.id} review={review}/>)
            }
          )}
        </ul>
      )
    } else {
      return (
        <Telescope.components.F8EmptySection
          title={`No reviews`}
          text=""/>
      )
    }
  }


  renderReviewsList() {
    return (
      <div className="clearfix layout-block layout-full ysection">
        <div className="column column-alpha main-section">
          <div className="ysection not-recommended-reviews review-list-wide">

            {this.renderReviewListHeader()}



        <div className="review-list" id="position-relative">
          {this.renderRows()}
        </div>

            {this.renderReviewsListFooter()}

          </div>
        </div>
      </div>
    )
  }

  render() {
      const {forObject} = this.state;

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container filtered-reviews-content not-recommended-reviews-page">
            <div className="clearfix layout-block layout-full">
              <div className="column column-alpha ">
                <div className="top-return-links">

                  <Link to={geDetailedModelLink(forObject.modelType, forObject)}>
                    {`« Back to ${forObject.displayName}`}
                  </Link>
                </div>

                {this.renderReviewsList()}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


import {connect} from 'react-redux'

function select(store, ownProps) {
  return {
    currentUserId: store.user.id,
    editModel: store.editModel,
    goBack: ownProps.router.goBack,
    listContainerTasks: store.listContainerTasks
  };
}

export default withRouter(connect(select)(IEAReviewsListLayout));
