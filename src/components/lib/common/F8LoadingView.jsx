import Telescope from '../index'
import React, {Component} from 'react'

import ReactLoading from 'react-loading'

class F8LoadingView extends Component {

  constructor(props, context) {
    super(props);
    this.state = this.initialState = {};
  }

  /**
   * https://github.com/facebook/react-native/issues/2481
   * @returns {XML}
   */
  render() {
    const loadingType = this.props.loadingType || 'bars',
      loadingClass = this.props.loadingClass || 'results_37tfm';

    return (
      <div className={loadingClass}>
        {/*<ReactLoading type={loadingType} color="#444"/>*/}
        <div className="js-review-examples-throbber"
             id="ieatta-loading-section">
          <div className="throbber-container"/>
        </div>
      </div>
    )
  }
}

export default F8LoadingView;


