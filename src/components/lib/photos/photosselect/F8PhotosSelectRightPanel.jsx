import Telescope from '../../index'
import React, {Component} from 'react';

const _ = require('underscore')

import {Link} from 'react-router'
import PaginationTerms from "../../../../lib/paginationTerms";

const {
  byListId,
  getDefaultListTask,
} = require('../../../filter/filterPosts')


const {
  loadUsersWithoutAnonymousList,
  ownAnotherPhotoUser,
  loadPhotosBrowser,
  showAlertMessage,
  timeout,
} = require('../../../../actions').default

class F8PhotosSelectRightPanel extends Component {

  constructor(props) {
    super(props)

    const terms = PaginationTerms.generateTermsForUsersWithoutAnonymousList(props)
    const usersListTask = getDefaultListTask(terms);
    this.state = {
      //
      isShowReselectUser: false,
      isButtonSaving: false,
      //
      selectedUserId: null,
      terms: terms,
      listTask: usersListTask
    }

    props.dispatch(loadUsersWithoutAnonymousList(usersListTask, terms))
  }

  componentWillReceiveProps(nextProps) {
    const newListTask = byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask);

    const {selectedUserIndex, selectedUserId} = Users.getSelectedUserIndex(newListTask, nextProps);

    this.setState({
      listTask: newListTask,
      selectedUserIndex,
      selectedUserId
    })
  }

  render() {
    return (
      <div className="media-details-grid_side">
        <div className="media-details-grid_side-inner">
          <div className="media-info">

            {this.renderTopUserInfo()}
            {this.renderModifyPhotoOwner()}
          </div>

          <div className="media-info_footer">
            <div className="js-media_ad-container media_ad-container yloca--small">
            </div>
          </div>

        </div>

      </div>
    )
  }

  renderModifyPhotoOwner() {
    return (
      <div className="media-info_container section-reselect-owner">

        <div className="media-info_item voting-feedback clearfix">
          <div className="media-info_vote margin-top-8">
            <p className="voting-intro voting-prompt">
              Reselect this photo's owner?
            </p>

            <ul className="voting-buttons exclusive u-space-b2">
              {this.renderReselect()}
            </ul>

            {/*<p className="voting-intro voting-prompt">*/}
            {/*{"selected User Id: " + this.state.selectedUserId}*/}
            {/*</p>*/}

            {this.state.isShowReselectUser && this.renderUsersList()}

          </div>

        </div>
      </div>

    )
  }

  renderReselect() {
    return (
      <li className="voting-stat inline-block">
        <a
          onClick={() => {
            this.setState({isShowReselectUser: !this.state.isShowReselectUser})
          }}
          className="ybtn ybtn--small helpful">
            <span id="icon_18X18" className="icon icon--18-arrow-up icon--size-18 icon--currentColor button-content">
                <svg className="icon_svg">
                    <path
                      d="M2.002 16h13.996a9.87 9.87 0 0 0-5.66-2.786V12.08c.898-.655 1.733-1.75 1.79-2.46 1.016-.495 1.228-1.723.506-1.994l-.017.024c.326-.458.527-1.04.527-1.706 0-.863-.156-1.66-.79-2.182C11.914 2.72 10.998 2 9.934 2c-.625 0-1.198.25-1.656.664a.955.955 0 0 0-.612-.23c-.4 0-.747.268-.934.662-1.005.37-1.738 1.505-1.738 2.848 0 .615.154 1.186.417 1.66-.78.307-.52 1.477.463 2.015.057.71.89 1.804 1.79 2.46v1.133A9.87 9.87 0 0 0 2.003 16z"/>
                </svg>
            </span>
          <span className="vote-type">Select another owner</span>
        </a>
      </li>

    )
  }

  renderTopUserInfo() {
    const {selectedPhotoInfo} = this.props;

    return (
      <div className="media-info_item media-info_user">
        <div className="photo-user-passport">
          <div className="ypassport ypassport-slim media-block">

            <div className="media-avatar">

              <div className="photo-box pb-30s">
                <Link to={selectedPhotoInfo.userProfileUrl} className="js-analytics-click">

                  <Telescope.components.F8PlaceHolderImage
                    key={selectedPhotoInfo.username}
                    alt={selectedPhotoInfo.username}
                    className="photo-box-img"
                    width="30"
                    height="30"
                    placeholderSource={"/default/user_30_square.png"}
                    source={selectedPhotoInfo.imageUrl}/>

                </Link>

              </div>
            </div>

            <div className="media-story">
              <ul className="user-passport-info">
                <li className="user-name">
                  <Link className="user-display-name js-analytics-click"
                        to={selectedPhotoInfo.userProfileUrl}
                        id="dropdown_user-name">
                    {selectedPhotoInfo.username}
                  </Link>
                </li>
                <li>
                  <span className="selected-photo-upload-date time-stamp">
                     {selectedPhotoInfo.photoCreatedAtFormat}
                  </span>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>

    )
  }

  renderUsersList() {
    const {listTask, selectedUserIndex, selectedUserId} = this.state;
    const {results} = listTask;

    return (
      <div className='yform'>
        <div className="u-inline-block u-align-bottom">
          <div className="yselect">
            <select className="event-start-time-picker u-inline-block"
                    onChange={(object) => {
                      const selectId = object.target.value;
                      this.setState({selectedUserId: selectId})
                    }}
                    name="starts_time"
                    id="starts_time">
              {results.map((item, index) => {
                const isSelected = (selectedUserIndex === index);
                return (
                  <option key={item.id} selected={isSelected} value={item.id}>{item.username}</option>
                )
              })}
            </select>
            <span id='icon_14X14'
                  className="icon icon--14-triangle-down icon--size-14 icon--currentColor u-triangle-direction-down yselect_arrow">
              <svg className="icon_svg"><path d="M7 9L3.5 5h7L7 9z"/></svg>
          </span>
          </div>

          <button id="create-event" name="action_submit" value="Submit"
                  disabled={!this.state.selectedUserId || this.state.isButtonSaving}
                  onClick={this.onOwnSelectedUserPress.bind(this)}
                  className="ybtn ybtn--primary disable-on-submit js-submit-event">
            <span>Own Selected User</span>
          </button>
        </div>
      </div>
    )
  }

  async onOwnSelectedUserPress() {
    const {selectedUserId} = this.state;
    const {selectedPhotoInfo, photosTerms} = this.props;
    const {photoId} = selectedPhotoInfo;

    const {dispatch} = this.props;

    this.setState({isButtonSaving: true})
    let errorMessage = null
    try {
      await Promise.race([
        dispatch(ownAnotherPhotoUser(photoId, selectedUserId)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        this.props.dispatch(showAlertMessage({type: ALERT_TYPE_ERROR, text: errorMessage}))
      }
    } finally {
      this.setState({isButtonSaving: false})
      if (!!errorMessage) {
      } else {
        dispatch(loadPhotosBrowser(photosTerms))
      }
    }
  }
}


import {connect} from 'react-redux'
import Users from "../../../../lib/users";

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(F8PhotosSelectRightPanel);
