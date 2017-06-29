import Telescope from '../../lib'
import React, {Component} from 'react'

const {loadPostPage} = require('../../../actions').default

class PopoverPosts extends Component {
  constructor(props, context) {
    super(props)
  }

  componentDidMount() {
    // this.props.dispatch(loadPostPage('cDJao7Bw3P'))
  }

  render() {
    const {detailedPostsOverlay} = this.props,
      {isFetching, currentModel} = detailedPostsOverlay

    if (isFetching && false) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm"/>
        </div>
      )
    }

    return (<Telescope.components.PostsPage post={currentModel.model}/>)
  }


}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

function select(store) {
  return {
    detailedPostsOverlay: store.detailedPostsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(PopoverPosts)

