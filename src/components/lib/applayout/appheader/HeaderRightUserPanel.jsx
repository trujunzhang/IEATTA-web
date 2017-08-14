import Telescope from '../../index'
import React, {Component} from 'react'
import {Link} from 'react-router'

import Photos from '../../../../lib/photos'
import onClickOutside from 'react-onclickoutside'

class HeaderRightUserPanel extends Component {

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isOpen: false
    };
  }

  onHandleClickOutsidePress() {
    this.setState({isOpen: false})
  }

  renderRightNormalUserSection() {
    const {currentUser} = this.props;
    const {isOpen} = this.state,
      extension = isOpen ? ' drop-menu-highlighted' : '',
      currentClass = `ybtn ybtn--primary drop-menu-link user-account_button ${extension}`

    return (
      <a className={currentClass} id="topbar-account-link" onClick={(e) => {
        this.setState({isOpen: !this.state.isOpen})
      }}>
                <span className="user-account_avatar responsive-visible-large-block">
                    <Telescope.components.F8PlaceHolderImage
                      alt={currentUser.username}
                      className="photo-box-img"
                      height="90"
                      width="90"
                      placeholderSource={"/default/user_30_square.png"}
                      source={Photos.getListThumbnailUrl(currentUser)}
                    />
                </span>
        <span id="icon_14X14"
              className="icon icon--14-triangle-down icon--size-14 icon--inverse icon--fallback-inverted u-triangle-direction-down user-account_button-arrow responsive-visible-large-inline-block">
                    <svg className="icon_svg">
                        <path d="M7 9L3.5 5h7L7 9z"/>
                    </svg>
                </span>
        <span id="icon_24X24"
              className="icon icon--24-hamburger icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_open">
                    <svg className="icon_svg">
                        <path d="M3 18v-2h18v2H3zm0-7h18v2H3v-2zm0-5h18v2H3V6z"/>
                    </svg>
                </span>
        <span id="icon_24X24"
              className="icon icon--24-close icon--size-24 icon--inverse icon--fallback-inverted drop-menu-link_close">
                    <svg className="icon_svg">
                        <path
                          d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"/>
                    </svg>
                </span>
      </a>
    )
  }

  render() {
    return (

      <div className="arrange_unit main-header--full_arrange_unit">
        <div className="arrange arrange--6">
          <div
            className="arrange_unit u-nowrap hidden-non-responsive-table-cell responsive-visible-medium-only-table-cell">

            <a className="ybtn ybtn--primary main-header_button" href="/writeareview">
              Write a Review
            </a>
          </div>
          <div className="arrange_unit u-nowrap">
            <div className="main-header_account webview-hidden">

              <div id="topbar-account-item" className="user-account clearfix drop-menu-origin">
                {this.renderRightNormalUserSection()}

                <Telescope.components.HeaderRightUserPopOverlay
                  {...this.props}
                  {...this.state}
                  onHandleClickOutsidePress={this.onHandleClickOutsidePress.bind(this)}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderRightUserPanel;
