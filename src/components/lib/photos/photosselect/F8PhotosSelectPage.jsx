import Telescope from '../../index'
import React, {Component} from 'react';

import {withRouter} from 'react-router'
import onClickOutside from 'react-onclickoutside'

import {getPhotoSelectBackLink} from '../../../../lib/link'

class F8PhotosSelectPage extends Component {

  handleClickOutside(e) {
    const {modelType, forObject, pageForm, location} = this.props;
    const lastUrl = getPhotoSelectBackLink(location, pageForm, modelType, forObject);
    this.props.router.push({pathname: lastUrl})
  }

  render() {
    return (
      <Telescope.components.F8PhotosContentWithNavBar
        {...this.props}
        contentClass="media-details_container media-details_container--embed media-details_container--with-sidebar"
      />
    )
  }

}


export default withRouter(onClickOutside(F8PhotosSelectPage));
