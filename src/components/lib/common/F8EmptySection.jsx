'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'

class F8EmptySection extends React.Component {

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default F8EmptySection;
