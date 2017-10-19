import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

import {Link} from 'react-router'
import {
  getRestaurantLink,
  calculateTotalCount
} from '../../../lib/link'

const {loadRecipesListForRestaurant} = require('../../../actions').default
const {byListId, getDefaultListTask} = require('../../filter/filterPosts')

import PaginationTerms from "../../../lib/paginationTerms";

class IEARecipesListForRestaurantLayout extends Component {

  constructor(props, context) {
    super(props)

    const recipesListTerms = PaginationTerms.generateTermsForRecipesListOnRestaurant(props)

    this.state = {
      // Common
      recipesListTerms: recipesListTerms,
      listTask: getDefaultListTask(recipesListTerms)
    }
  }

  componentWillReceiveProps(nextProps) {
    const newListTask = byListId(nextProps,  this.state.recipesListTerms, this.state.listTask);

    this.setState({
      listTask: newListTask
    })
  }

  componentDidMount() {
    const {listTask, recipesListTerms} = this.state;
    this.loadMore(listTask, recipesListTerms)
  }

  loadMore(listTask, recipesListTerms) {
    this.props.dispatch(loadRecipesListForRestaurant(listTask, recipesListTerms))
  }

  renderRecipeListHeader() {
    const {listTask} = this.state;
    const {forObject} = this.props;

    return (<h3>{`${calculateTotalCount(listTask)} recipes for ${forObject.displayName}`}</h3>)
  }

  renderRows() {
    const {listTask} = this.state;

    const {
      results,
      ready
    } = listTask;

    if (!ready) {
      return (<Telescope.components.F8LoadingView/>)
    } else if (!!results && results.length) {
      return (
        <ul className="ylist ylist-bordered reviews">
          {results.map((recipe, index) => {
              return (<Telescope.components.RecipesItem key={recipe.id}
                                                        recipe={recipe}
                                                        index={index}
                                                        showRightTime={true}/>)
            }
          )}
        </ul>
      )
    } else {
      return (<Telescope.components.F8EmptySection title={`No reviews`} text=""/>)
    }
  }


  renderRecipesList() {
    return (
      <div className="clearfix layout-block layout-full ysection">
        <div className="column column-alpha main-section">
          <div className="ysection not-recommended-reviews review-list-wide">

            {this.renderRecipeListHeader()}

            <div className="review-list" id="position-relative">
              {this.renderRows()}
            </div>


            <Telescope.components.F8PaginationButtonNavigationBar
              {...this.props}
              {...this.state}/>

          </div>
        </div>
      </div>
    )
  }

  render() {
    const {forObject} = this.props;

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <div className="container filtered-reviews-content not-recommended-reviews-page">
            <div className="clearfix layout-block layout-full">
              <div className="column column-alpha ">
                <div className="top-return-links">

                  <Link to={getRestaurantLink(forObject)}>
                    {`« Back to ${forObject.displayName}`}
                  </Link>
                </div>

                {this.renderRecipesList()}

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

export default withRouter(connect(select)(IEARecipesListForRestaurantLayout));
