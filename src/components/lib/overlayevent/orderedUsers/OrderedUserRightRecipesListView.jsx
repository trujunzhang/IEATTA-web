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
