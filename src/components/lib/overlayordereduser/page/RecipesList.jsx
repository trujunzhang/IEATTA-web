import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadRecipesList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')

class RecipesList extends Component {

  constructor(props) {
    super(props)

    const forEvent = props.forEvent || {};
    const forRestaurant = props.forRestaurant || {};
    const orderedUser = props.orderedUser || {};

    const orderedUserId = orderedUser.id || '';
    const eventId = forEvent.id || '';
    const restaurantId = forRestaurant.id || '';

    const terms = {
      listId: `ordered-recipes-list-view-for-${orderedUserId}-e-${eventId}-r-${restaurantId}`,
      limit: 10,
      orderedUserId: orderedUserId,
      eventId: eventId,
      restaurantId: restaurantId
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms)
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
    const terms = this.state.terms;
    const nextListTask = this.state.listTask
    nextListTask['ready'] = false
    this.setState({listTask: nextListTask})
    this.props.dispatch(loadRecipesList(nextListTask, terms))
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
    const {
      showTitle = false,
    } = this.props;

    return (
      <div className="ysection">


        {showTitle ? (
          <Telescope.components.F8SectionHeaderTitle title={"Ordered Recipes Recently"}/>
        ) : null}

        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          {this.renderEmptySection()}
        </div>

      </div>
    )
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(RecipesList)
