import Telescope from '../../lib'
import React, {Component} from 'react'

const {resetLoadPage, loadOrderedRecipePage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class OrderedRecipes extends Component {
  constructor(props, context) {
    super(props)

    props.dispatch(resetLoadPage())

    this.state = this.initialState = {
      oid: props.params.oid,
      oslug: props.params.oslug,
      recipe: null,
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipe: getModelByObjectId(nextProps, this.state.oid, this.state.recipe),
      ready: true
    })
  }

  componentDidMount() {
    this.props.dispatch(loadOrderedRecipePage(this.state.oid))
  }

  render() {
    const {ready, recipe} = this.state;

    if (!ready) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.IEAOrderedRecipesLayout {...this.state} />)
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay
  }
}

export default connect(select)(OrderedRecipes)

