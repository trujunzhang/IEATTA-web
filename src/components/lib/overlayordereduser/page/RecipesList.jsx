import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadRecipesList} = require('../../../../actions').default

const {
  byListId,
  getDefaultListTask,
} = require('../../../filter/filterPosts')

const {
  generateTermsForRecipesList
} = require('../../../filter/filterRoutes')

class RecipesList extends Component {

  constructor(props) {
    super(props)

    const terms = generateTermsForRecipesList(props)

    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms.listId, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {terms, listTask} = this.state;
    this.props.dispatch(loadRecipesList(listTask, terms))
  }

  renderRows() {
    const {listTask} = this.state;
    const {
      showRightTime = false
    } = this.props;

    const {
      results,
      ready
    } = listTask

    if (!ready) {
      return (<Telescope.components.F8LoadingView/>)
    }

    return (
      <ul className="ylist ylist-bordered">
        {results.map((recipe, index) =>
          <Telescope.components.RecipesItem key={recipe.id}
                                            recipe={recipe}
                                            index={index}
                                            showRightTime={showRightTime}/>
        )}
      </ul>

    )
  }

  renderEmptySection() {
    const {listTask} = this.state;

    const {
      results,
      ready,
      totalCount,
    } = listTask

    if (ready && results.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={''}
          text="No recipes ordered"/>
      )
    }
    return null;
  }


  render() {
    const {showTitle} = this.props;

    return (
      <div className="ysection">

        {
          showTitle &&
          <Telescope.components.F8SectionHeaderTitle title={"Recently Ordered Recipes"}/>
        }

        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          {this.renderEmptySection()}
        </div>

      </div>
    )
  }

}


RecipesList.propTypes = {
  showTitle: React.PropTypes.bool
};

RecipesList.defaultProps = {
  showTitle: false
};


const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(RecipesList)
