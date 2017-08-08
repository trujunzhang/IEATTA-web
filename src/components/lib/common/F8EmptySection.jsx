'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'

class F8EmptySection extends React.Component {

  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default F8EmptySection;
