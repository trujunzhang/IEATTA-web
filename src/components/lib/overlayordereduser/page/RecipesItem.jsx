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

class RecipesItem extends Component {

  renderLeftAvatar() {
    const {recipe} = this.props;

    return (
      <div className="media-avatar">

        <div className="photo-box pb-90s">
          <Link to={getOrderedRecipeLink(recipe)}>
            <Telescope.components.F8PlaceHolderImage
              alt={recipe.displayName}
              className="photo-box-img"
              width="90"
              height="90"
              placeholderSource={"/default/blank_biz_small.png"}
              source={Photos.getListThumbnailUrl(recipe)}/>
          </Link>
        </div>
      </div>
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


        {this.props.renderActionButtons && this.renderActionButtons()}
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
      <li className="js-bookmark-row">
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
