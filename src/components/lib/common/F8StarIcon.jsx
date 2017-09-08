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
    const rate = this.props.rate || 0,
      iconType = this.props.iconType || 'large',
      iconExtension = this.props.iconExtension || 'rating-large',
      iconWidth = this.props.width || 84,
      iconHeight = this.props.height || 303;

    const rateClass =
      // "i-stars i-stars--" + iconType + "-" + rate + " rating-large";
      `i-stars i-stars--${iconType}-${rate} ${iconExtension}`;
    const rateTitle = rate + ".0 star rating";

    return (
      <div className={rateClass} title={rateTitle}>
        <img className="offscreen"
             width="84"
             height="303"
             src="/images/stars/stars.png"
             alt={rateTitle}/>


      </div>
    )
  }
}

export default F8StarIcon;


