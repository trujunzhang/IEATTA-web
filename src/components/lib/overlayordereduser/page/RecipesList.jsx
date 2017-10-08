import Telescope from '../../../lib'
import React, {Component} from 'react'

const {
  loadRecipesListForRestaurant,
  loadRecipesListForEvent
} = require('../../../../actions').default

const {
  byListId,
  getDefaultListTask,
} = require('../../../filter/filterPosts')

import PaginationTerms from "../../../../lib/paginationTerms";

/**
 * The states were interested in
 */
const {
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  PARSE_EVENTS,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  // Review List Type
  REVIEWS_LIST_FOR_RESTAURANT_PAGE,
  REVIEWS_LIST_FOR_EVENT_PAGE,
} = require('../../../../lib/constants').default

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
    const {reviewListType} = this.props;
    const {terms, listTask} = this.state;

    switch (reviewListType) {
      case REVIEWS_LIST_FOR_RESTAURANT_PAGE:
        this.props.dispatch(loadRecipesListForRestaurant(listTask, terms))
        break;
      case REVIEWS_LIST_FOR_EVENT_PAGE:
        this.props.dispatch(loadRecipesListForEvent(listTask, terms))
        break;
    }
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
        <Telescope.components.BaseRecipesListPage
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
