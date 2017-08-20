import Telescope from '../../index'
import React, {Component} from 'react';

class F8PhotosContentWithNavBar extends Component {


  render() {
    const {contentClass} = this.props;
    return (
      <div className={contentClass}>

        <div className="media-container js-media-container">

          <div className="media-details-grid">

            <Telescope.components.F8PhotosSelectLeftPanel {...this.props}/>
            {/*{01-left-panel.html}*/}

            <Telescope.components.F8PhotosSelectRightPanel {...this.props}/>
            {/*{02-right-panel.html}*/}

          </div>

        </div>

        <Telescope.components.F8PhotosSelectNavigatorBar {...this.props}/>
        {/*{03-left-right-navigator.html}*/}

      </div>

    )
  }


}


export default F8PhotosContentWithNavBar;
