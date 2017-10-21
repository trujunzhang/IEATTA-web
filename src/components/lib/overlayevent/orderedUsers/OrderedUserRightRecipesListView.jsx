import Telescope from '../../../lib'
import React, {Component} from 'react'

import Photos from '../../../../lib/photos'
import PeopleInEvent from '../../../../lib/peopleInEvent'


class OrderedUserRightRecipesListView extends Component {

  renderLeftMenuTitle() {
    return (
      <div className="titled-nav-header">
        <div className="arrange arrange--top">

          <div className="arrange_unit arrange_unit--fill">
            <div className="titled-nav-header_content">
              <h3>
                {`Recipes List`}
              </h3>
            </div>
          </div>

        </div>
      </div>
    )
  }


  renderRecipeActionButtons = () => {

    return (
      <ul className="voting-buttons">

        <li className="vote-item inline-block">

          <a className="ybtn ybtn--small useful js-analytics-click">
            <span id="review_item_footer_buttons_panel_span "
                  className="icon icon--18-useful-outline icon--size-18 icon--active-inverse button-content u-space-r-half">
            <svg className="icon_svg">
            <path
              d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"/>
          </svg>
          </span>
            <span className="vote-type">Useful</span>
          </a>
        </li>

      </ul>
    )
  }


  renderRows() {
    const {recipesInRestaurantTask} = this.props;
    const {
      ready,
      results
    } = recipesInRestaurantTask;

    return (
      <div className="ysection">

        <div className="titled-nav js-titled-nav">
          <div className="titled-nav_menus">
            <div className="titled-nav_menu">
              {this.renderLeftMenuTitle()}


              <ul className="ylist ylist-bordered">
                {results.map((recipe, index) =>
                  <Telescope.components.RecipesItem key={recipe.id}
                                                    recipe={recipe}
                                                    index={index}
                                                    renderActionButtons={this.renderRecipeActionButtons}
                                                    showRightTime={true}/>
                )}
              </ul>

            </div>

          </div>
        </div>

      </div>
    )
  }

  renderEmptySection() {
    const {leftUsersListTask} = this.props;

    const {
      results,
      ready,
      totalCount,
    } = leftUsersListTask

    if (ready && results.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={`No Recipes in the restaurant!`}
          text=""/>
      )
    }
    return null;
  }

  render() {

    return (
      <div className="ysection">
        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          {this.renderEmptySection()}
        </div>

      </div>
    )
  }

}

export default OrderedUserRightRecipesListView;
