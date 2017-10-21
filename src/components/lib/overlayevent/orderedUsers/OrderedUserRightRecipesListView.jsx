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
                {`Ordered Recipes`}
              </h3>
            </div>
          </div>

        </div>
      </div>
    )
  }


  renderRows() {
    const {leftUsersListTask, peopleInEventListDict} = this.props;

    const {
      results,
      ready
    } = leftUsersListTask;


    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    }

    return (
      <div className="ysection">

        <div className="titled-nav js-titled-nav">
          <div className="titled-nav_menus">
            <div className="titled-nav_menu">
              {this.renderLeftMenuTitle()}

              <ul className="titled-nav_items">
                {results.map((user, index) => {
                  const isActive = index === 0; //Users.isLeftMenuActive(row, this.props);
                  const rowClass = "titled-nav_link" + (isActive ? " is-active" : "")

                  const orderedRecipesCount = PeopleInEvent.getOrderedRecipeCount(user, peopleInEventListDict)
                  const recipesCountView = (
                    <span className="left-ordered-user-recipes-count">{` (${orderedRecipesCount})`}</span>)
                  return (
                    <li key={index} className="titled-nav_item">
                      <a className={rowClass}>
                        <div className="titled-nav_link-content arrange arrange--middle arrange--6">

                          <div className="arrange_unit">

                            <Telescope.components.F8PlaceHolderImage
                              alt={user.username}
                              width="30"
                              height="30"
                              placeholderSource={"/default/user_30_square.png"}
                              source={Photos.getListThumbnailUrl(user)}/>

                          </div>

                          <div className="arrange_unit arrange_unit--fill">
                            <span className="titled-nav_link-label">{user.username}</span>
                            {orderedRecipesCount > 0 && recipesCountView}
                          </div>

                        </div>
                      </a>

                    </li>

                  )
                })}
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
          title={`No Users Found`}
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