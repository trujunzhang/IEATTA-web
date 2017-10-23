import Telescope from '../../../lib'
import React, {Component} from 'react'

import Photos from '../../../../lib/photos'
import PeopleInEvent from '../../../../lib/peopleInEvent'

const {
  timeout
} = require('../../../../actions').default

/**
 * The states were interested in
 */
const {
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_FOR_PEOPLE_IN_EVENT,
  PARSE_PEOPLE_IN_EVENTS,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
} = require('../../../../lib/constants').default

class OrderedUserRightRecipesListView extends Component {

  constructor(props, context) {
    super(props)

    this.state = this.initialState = {
      orderedRecipeIds: PeopleInEvent.getOrderedRecipeIds(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderedRecipeIds: PeopleInEvent.getOrderedRecipeIds(nextProps)
    })
  }

  renderLeftMenuTitle() {
    return (
      <div className="titled-nav-header">
        <div className="arrange arrange--top">

          <div className="arrange_unit arrange_unit--fill">
            <div className="titled-nav-header_content">
              <h3>
                {`Recipes List`}
              </h3>
            </div>
          </div>

        </div>
      </div>
    )
  }

  async onAddRemoveRecipePress(hasOrdered, recipe) {
    const {writeOnlineParseObjectAction, showAlertMessageAction, peopleInEventListTask, peopleInEventTerms} = this.props;
    const {orderedRecipeIds} = this.state;

    const updatedModel = PeopleInEvent.updatePeopleInEventParseInstance(this.props, orderedRecipeIds, hasOrdered, recipe)

    this.props.actions.updateModelRequest();

    let errorMessage = null
    const _object = {
      editModelType: MODEL_FORM_TYPE_FOR_PEOPLE_IN_EVENT,
      objectSchemaName: PARSE_PEOPLE_IN_EVENTS,
      model: updatedModel
    }
    try {
      await Promise.race([writeOnlineParseObjectAction(_object), timeout(15000)]);
    } catch (e) {
      this.props.actions.updateModelFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message;
        showAlertMessageAction({type: ALERT_TYPE_ERROR, text: errorMessage})
      }
    } finally {
      if (!!errorMessage) {
      } else {
        this.props.actions.updateModelSuccess();
        showAlertMessageAction({type: ALERT_TYPE_SUCCESS, text: 'Saved the ordered recipes successfully!'})

        this.props.loadPeopleInEventListAction(peopleInEventListTask, peopleInEventTerms);
      }
    }

  }

  renderRecipeActionButtons = (recipe, index) => {
    const hasOrdered = (this.state.orderedRecipeIds.indexOf(recipe.id) !== -1)

    return (
      <ul className="recipe-event-buttons">
        <li className="vote-item inline-block">

          <a className="ybtn ybtn--small useful js-analytics-click"
             onClick={() => {
               this.onAddRemoveRecipePress(hasOrdered, recipe)
             }}
             id={hasOrdered ? "remove" : "add"}>
            <span id="review_item_footer_buttons_panel_span "
                  className="icon icon--18-useful-outline icon--size-18 icon--active-inverse button-content u-space-r-half">
            <svg className="icon_svg">
            <path
              d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"/>
          </svg>
          </span>
            <span className="vote-type">{hasOrdered ? "Remove" : "Add"}</span>
          </a>
        </li>

      </ul>
    )
  }


  renderRows() {
    const {recipesInRestaurantTask} = this.props;
    const {
      ready,
      results
    } = recipesInRestaurantTask;

    return (
      <div className="ysection">

        <div className="titled-nav js-titled-nav">
          <div className="titled-nav_menus">
            <div className="titled-nav_menu">
              {this.renderLeftMenuTitle()}


              <ul className="ylist ylist-bordered">
                {results.map((recipe, index) =>
                  <Telescope.components.RecipesItem key={recipe.id}
                                                    recipe={recipe}
                                                    index={index}
                                                    renderActionButtons={this.renderRecipeActionButtons}
                                                    showRightTime={true}/>
                )}
              </ul>

            </div>

          </div>
        </div>

      </div>
    )
  }

  renderEmptySection() {
    const {leftUsersListTask} = this.props;

    const {
      results,
      ready,
      totalCount,
    } = leftUsersListTask

    if (ready && results.length === 0) {
      return (
        <Telescope.components.F8EmptySection
          title={`No Recipes in the restaurant!`}
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

export default OrderedUserRightRecipesListView;
