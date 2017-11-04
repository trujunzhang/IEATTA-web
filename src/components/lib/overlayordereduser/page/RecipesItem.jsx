import Telescope from '../../../lib'
import React, {Component} from 'react'
import Recipes from '../../../../lib/recipes'
import Photos from '../../../../lib/photos'

import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Link} from 'react-router'
import {withRouter} from 'react-router'

import {
  getOrderedRecipeLink,
  getLoggedUserMenuLink
} from '../../../../lib/link'

/**
 * The states were interested in
 */
const {
  PARSE_RECIPES,
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  PARSE_EVENTS,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  // Review List Type
  RECIPES_LIST_FOR_RESTAURANT_PAGE,
  RECIPES_LIST_FOR_EVENT_PAGE,
  RECIPES_LIST_FOR_LOGGED_USER_PAGE,
} = require('../../../../lib/constants').default

class RecipesItem extends Component {

  renderLeftAvatar() {
    const {recipe} = this.props;
    return (
      <Telescope.components.F8ImagesSlideShowView
        altValue={recipe.displayName}
        forObject={recipe}
        objectSchemaName={PARSE_RECIPES}
        {...this.props}/>
    )
  }

  renderStory() {
    const {recipe, index} = this.props;

    return (
      <div className="media-story">
        <div className="media-title clearfix">
            <span className="indexed-biz-name">
              {`${index + 1}.`}
              <Link className="biz-name title-font-weight-bold margin-left-4" to={getOrderedRecipeLink(recipe)}>
                    <span>{recipe.displayName}</span>
              </Link>
            </span>
        </div>

        <div className="price-category">
          <span className="category-str-list">{`$. ${recipe.price}`}</span>
        </div>

        <div className="tag-18x18_flame-dd5114">
          <small>
            <FormattedRelative value={recipe.updatedAt}/>
          </small>
        </div>


        {this.props.renderActionButtons && this.props.renderActionButtons(recipe, index)}
      </div>
    )
  }

  renderRightTime() {
    return (
      <div className="arrange_unit nowrap">
        <div className="subtle-text">
          {Recipes.getUpdatedAtFormat(this.props.recipe)}
        </div>
      </div>
    )
  }

  render() {
    const {showRightTime} = this.props;

    return (
      <li className="js-bookmark-row" id="recipe-item">
        <div className="bookmark-listing">

          <div className="arrange">
            <div className="arrange_unit arrange_unit--fill">
              <div className="media-block media-block--12 biz-listing-medium">

                {this.renderLeftAvatar()}
                {this.renderStory()}

              </div>
            </div>

            {showRightTime ? this.renderRightTime() : null}

          </div>
        </div>
      </li>
    )
  }
}


export default withRouter(RecipesItem);
