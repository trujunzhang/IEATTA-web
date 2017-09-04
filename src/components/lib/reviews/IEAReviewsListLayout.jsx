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

    const terms = generateTermsForReviewsList({reviewType,forObject, location}, 'page', 2)

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
  const {listTask,forObject} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask;

    return (
      <h3>

  {`${totalCount} reviews for ${forObject.displayName}`}

      </h3>
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
      return (<Telescope.components.F8EmptySection title={`No reviews`} text=""/>)
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


        <Telescope.components.F8PaginationButtonNavigationBar {...this.props} {...this.state}/>

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
