import Telescope from '../index'
import React, {Component} from 'react'

class IEAOrderedRecipesLayout extends Component {

  render() {
    return (
      <div className="biz-country-us">

        <div className="main-content-wrap main-content-wrap--full">
          <div className="top-shelf">
            <Telescope.components.OrderedRecipesSingleHeader {...this.props}/>
          </div>

          <div id="super-container" className="content-container">
            <Telescope.components.OrderedRecipesDetail {...this.props}/>
          </div>

        </div>
      </div>
    )
  }
}

export default IEAOrderedRecipesLayout;
