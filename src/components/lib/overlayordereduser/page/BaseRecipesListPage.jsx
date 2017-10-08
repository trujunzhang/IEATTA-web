import Telescope from '../../../lib'
import React, {Component} from 'react'

class BaseRecipesListPage extends Component {
  renderRows() {
    const {recipes, showRightTime} = this.props;

    return (
      <ul className="ylist ylist-bordered">
        {recipes.map((recipe, index) =>
          <Telescope.components.RecipesItem key={recipe.id}
                                            recipe={recipe}
                                            index={index}
                                            showRightTime={showRightTime}/>
        )}
      </ul>
    )
  }

  renderEmptySection() {
    const {recipes} = this.props;

    if (recipes.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={''}
          text="No recipes ordered"/>
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


BaseRecipesListPage.propTypes = {
  showRightTime: React.PropTypes.bool
};

BaseRecipesListPage.defaultProps = {
  showRightTime: false,
};


export default BaseRecipesListPage;
