import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadRecipesList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')

class RecipesList extends Component {

  constructor(props) {
    super(props)

    const {forEvent, forRestaurant, orderedUser} = props;

    const terms = {

      listId: `ordered-recipes-list-view-for-${orderedUser.id}-e-${forEvent.id}-r-${forRestaurant.id}`,
      limit: 10,
      orderedUserId: orderedUser.id,
      eventId: forEvent.id,
      restaurantId: forRestaurant.id
    };
    this.state = {
      terms: terms,
      listTask: byListId(props.listContainerTasks, terms),
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms),
      ready: true
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
    const {listTask, ready} = this.state

    const {
      results
    } = listTask

    return (
      <ul className="ylist ylist-bordered">
        {results.map(recipe =>
          <Telescope.components.RecipesItem key={recipe.id} peopleInEvent={recipe}/>
        )}
      </ul>

    )
  }

  renderEmptySection() {
    const {listTask, ready} = this.state

    const {
      results,
      totalCount,
    } = listTask

    if (ready && results.length === 0) {
      return (
        <div>
          <p>No recipes ordered</p>
        </div>
      )
    }
    return null;
  }

  renderTitle() {
    return (
      <div className="section-header section-header--complex section-header--no-spacing">
        <div className="arrange arrange--middle arrange--12">
          <div className="arrange_unit nowrap">
            <h2 className="section-header_title">Ordered Recipes</h2>
          </div>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className="ysection">

        {this.renderTitle()}

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
