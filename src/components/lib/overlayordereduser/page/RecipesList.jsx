import Telescope from '../../../lib'
import React, {Component} from 'react'

const {loadRecipesList} = require('../../../../actions').default

const {byListId} = require('../../../filter/filterPosts')

class RecipesList extends Component {

  constructor(props) {
    super(props)

    const terms = {
      listId: 'ordered-recipes-list-view-for-' + props.orderedUsers.id,
      limit: 10,
      eventId: props.event.id,
      restaurantId: props.event.restaurant.id
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
      <ul className="ylist">
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

  render() {


    return (
      <div className="ysection">

        <div className="arrange arrange--12 arrange--baseline">

          <div className="arrange_unit nowrap">
            <h3 className="subscribe-list_title">Who's in?</h3>
          </div>

          <div className="arrange_unit arrange_unit--fill">
            <span>90 responses</span>
          </div>

        </div>

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
