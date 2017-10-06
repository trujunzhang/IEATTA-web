import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadRecipesList} = require('../../../../actions').default

const {
  byListId,
  getDefaultListTask,
} = require('../../../filter/filterPosts')

import PaginationTerms from "../../../../lib/paginationTerms";

class RecipesList extends Component {

  constructor(props) {
    super(props)

    const terms = PaginationTerms.generateTermsForRecipesList(props)

    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {terms, listTask} = this.state;
    this.props.dispatch(loadRecipesList(listTask, terms))
  }

  renderRecipesList() {
    const {listTask} = this.state;
    const {
      results,
      ready,
      totalCount,
    } = listTask;

    if (ready) {
      return (
        <Telescope.components.RecipesListPage
          recipes={results}
        />
      )
    }

    return (<Telescope.components.F8LoadingView/>)
  }

  render() {
    const {showTitle} = this.props;

    return (
      <div className="ysection">
        {
          showTitle &&
          <Telescope.components.F8SectionHeaderTitle title={"Recently Ordered Recipes"}/>
        }

        {this.renderRecipesList()}

      </div>
    )
  }

}


RecipesList.propTypes = {
  showTitle: React.PropTypes.bool,
  showRightTime: React.PropTypes.bool
};

RecipesList.defaultProps = {
  showTitle: false,
  showRightTime: false,
};


const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(RecipesList)
