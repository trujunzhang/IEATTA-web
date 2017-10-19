import Telescope from '../../../lib'
import React, {Component} from 'react'

import Photos from '../../../../lib/photos'

const {loadUsersWithoutAnonymousList} = require('../../../../actions').default

import PaginationTerms from "../../../../lib/paginationTerms";

const {byListId, getDefaultListTask} = require('../../../filter/filterPosts')

class OrderedUserLeftMenusPanel extends Component {

  constructor(props) {
    super(props)

    const terms = PaginationTerms.generateTermsForOrderedUsersList(props)
    this.state = {
      terms: terms,
      listTask: getDefaultListTask(terms),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listTask: byListId(nextProps.listContainerTasks, this.state.terms, this.state.listTask)
    })
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {terms, listTask} = this.state;
    this.props.dispatch(loadUsersWithoutAnonymousList(listTask, terms))
  }


  renderLeftMenuTitle() {
    return (
      <div className="titled-nav-header">
        <div className="arrange arrange--top">

          <div className="arrange_unit arrange_unit--fill">
            <div className="titled-nav-header_content">
              <h3>
                {`Users List`}
              </h3>
            </div>
          </div>

        </div>
      </div>
    )
  }


  renderRows() {
    const {listTask} = this.state

    const {
      results,
      ready
    } = listTask

    if (!ready) {
      return (
        <Telescope.components.F8LoadingView/>
      )
    }

    return (
      <div className="ysection">

        <div className="titled-nav js-titled-nav">
          <div className="titled-nav_menus">
            <div className="titled-nav_menu">
              {this.renderLeftMenuTitle()}

              <ul className="titled-nav_items">
                {results.map((user, index) => {
                  const isActive = index === 0; //Users.isLeftMenuActive(row, this.props);
                  const rowClass = "titled-nav_link" + (isActive ? " is-active" : "")
                  return (
                    <li key={index} className="titled-nav_item">
                      <a className={rowClass}>
                        <div className="titled-nav_link-content arrange arrange--middle arrange--6">

                          <div className="arrange_unit">
                            <img alt={user.username}
                                 className="photo-box-img"
                                 width={30}
                                 height={30}
                                 src={Photos.getListThumbnailUrl(user)}/>
                          </div>

                          <div className="arrange_unit arrange_unit--fill">
                            <span className="titled-nav_link-label">{user.username}</span>
                          </div>

                        </div>
                      </a>

                    </li>

                  )
                })}
              </ul>
            </div>

          </div>
        </div>

      </div>
    )
  }

  renderEmptySection() {
    const {listTask} = this.state

    const {
      results,
      ready,
      totalCount,
    } = listTask

    if (ready && results.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={`No Users Found`}
          text=""/>
      )
    }
    return null;
  }

  render() {

    return (
      <div className="ysection">
        {this.renderRows()}

        <div className="u-space-t2 u-space-b2">
          {this.renderEmptySection()}
        </div>

      </div>
    )
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    listContainerTasks: store.listContainerTasks
  }
}

export default connect(select)(OrderedUserLeftMenusPanel)
