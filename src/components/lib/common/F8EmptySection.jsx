'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'

class F8EmptySection extends React.Component {

  render() {
    return (
      <div className="empty-section">
        <h4 className="no-section-title">
          {this.props.title}
        </h4>
        <p className="no-recent-activity nobtm">
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default F8EmptySection;
