import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadRecipePage} = require('../../../actions').default

const {getModelByObjectId} = require('../../filter/filterPosts')

class OrderedRecipes extends Component {
  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      oid: props.params.oid,
      oslug: props.params.oslug,
      recipe: null,
      ready: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      restaurant: getModelByObjectId(nextProps, this.state.oid, this.state.recipe),
      ready: true
    })
  }

  componentDidMount() {
    this.props.dispatch(loadRecipePage(this.state.rid))
  }

  render() {
    const {ready, restaurant} = this.state;

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

