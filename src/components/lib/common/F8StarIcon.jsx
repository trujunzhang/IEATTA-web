import Telescope from '../index'
import React, {Component} from 'react'

class F8StarIcon extends Component {

  constructor(props, context) {
    super(props);
    this.state = this.initialState = {};
  }

  /**
   * https://github.com/facebook/react-native/issues/2481
   * @returns {XML}
   */
  render() {
    return (
      <img className="offscreen"
           width="84"
           height="303"
           src="/images/stars/stars.png"
           alt="1.0 star rating"/>
    )
  }
}

export default F8StarIcon;


