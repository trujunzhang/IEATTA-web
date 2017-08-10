import Telescope from '../../index'
import React, {Component} from 'react';
import Photos from '../../../../lib/photos'

import {withRouter} from 'react-router'
import onClickOutside from 'react-onclickoutside'

import {getPhotoSelectBackLink} from '../../../../lib/link'

class F8PhotosSelectPage extends Component {

  handleClickOutside(e) {
    debugger

    const {photoType, forObject, pageForm} = this.props;
    const lastUrl = getPhotoSelectBackLink(pageForm, photoType, forObject);
    this.props.router.push({pathname: lastUrl})
  }


  render() {
    return (
      <div className="media-details_container media-details_container--embed media-details_container--with-sidebar">

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

    );
  }
}


export default F8PhotosSelectPage;
