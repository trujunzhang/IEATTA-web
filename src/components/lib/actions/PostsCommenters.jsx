import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

import {withRouter} from 'react-router'

let {showDetailedPagePath} = require('../../../lib/link')
const {pushOverlayDetailedPost} = require('../../../actions').default

class PostsCommenters extends Component {
  render() {
    const {post} = this.props
    return (
      <span
        className="button_2I1re smallSize_1da-r secondaryText_PM80d subtleVariant_tlhj3 simpleVariant_1Nl54 button_2n20W"
        onClick={this.onPopupDetailPress.bind(this)}>
          <div className="buttonContainer_wTYxi">
            <span >
              <svg width="12" height="11" viewBox="0 0 12 11">
                <path
                  d="M10.0124802,16.8320558 C9.21033653,16.0515289 8.72727273,15.044941 8.72727273,13.9462121 C8.72727273,11.4655331 11.1897066,9.45454545 14.2272727,9.45454545 C17.2648389,9.45454545 19.7272727,11.4655331 19.7272727,13.9462121 C19.7272727,16.4268911 17.2648389,18.4378788 14.2272727,18.4378788 C13.4722764,18.4378788 12.752811,18.3136428 12.0978565,18.0888377 C11.026169,18.7087928 8.93104025,19.527919 8.93104025,19.527919 C8.93104025,19.527919 9.63175021,17.8427438 10.0124802,16.8320558 Z"
                  transform="translate(-8 -9)" fill="#FFF"/>
              </svg>
            </span>
            { (post.commenters || []).length}
          </div>
      </span>
    )
  }

  onPopupDetailPress(e) {
    e.preventDefault()

    let {router, post} = this.props
    showDetailedPagePath(router, post)
    this.props.dispatch(pushOverlayDetailedPost(post))

    e.stopPropagation()
  }
}


/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

export default withRouter(connect()(PostsCommenters))

