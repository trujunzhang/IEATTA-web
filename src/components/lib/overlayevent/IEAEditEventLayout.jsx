import Telescope from '../../lib'
import React, {Component} from 'react'


const {
  writeOnlineParseObject,
  showAlertMessage,
  timeout
} = require('../../../actions').default


/**
 * The states were interested in
 */
const {
  // Model Form Mode
  MODEL_FORM_TYPE_NEW,
  PARSE_EVENTS,
  MENU_ITEM_ADD_OR_EDIT_EVENT,
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
} = require('../../../lib/constants').default


class IEAEditEventLayout extends Component {

  constructor(props, context) {
    super(props)

    this.state = {
      pageForm: props.pageForm,
      value: {
        displayName: props.editModel.form.fields.displayName,
        eventWhat: props.editModel.form.fields.eventWhat,
      }
    }

    props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_EVENT, props.forObject, props.pageForm);
    props.actions.onEditModelFormFieldChange('displayName', props.forObject.displayName || '', true)
    props.actions.onEditModelFormFieldChange('eventWhat', props.forObject.want || '', true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        displayName: nextProps.editModel.form.fields.displayName,
        eventWhat: nextProps.editModel.form.fields.eventWhat,
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.displayName !== '') {
      this.props.actions.onEditModelFormFieldChange('displayName', value.displayName)
    }
    if (value.eventWhat !== '') {
      this.props.actions.onEditModelFormFieldChange('eventWhat', value.eventWhat)
    }

    this.setState(
      {value}
    )
  }

  renderLeft() {
    return (
      <Telescope.components.EditEventForm
        form={this.props.editModel.form}
        value={this.state.value}
        onChange={this.onChange.bind(this)}/>
    )
  }


  async onButtonPress() {
    const {writeOnlineParseObjectAction, showAlertMessageAction, forObject, forRelationObject} = this.props;

    const editModelType = this.props.editModel.form.editModelType;

    const originalModel = this.props.editModel.form.originModel;
    const {id, uniqueId} = originalModel;
    const parseId = id;

    const displayName = this.props.editModel.form.fields.displayName;
    const want = this.props.editModel.form.fields.eventWhat;
    const start = this.props.editModel.form.fields.start;
    const end = this.props.editModel.form.fields.end;

    this.props.actions.updateModelRequest();

    let errorMessage = null
    const _object = {
      editModelType,
      objectSchemaName: PARSE_EVENTS,
      model: {
        parseId,
        uniqueId,
        displayName, want, start, end,
        restaurant: forRelationObject
      }
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
        showAlertMessageAction({type: ALERT_TYPE_SUCCESS, text: 'Saved the event successfully!'})
      }
    }
  }


  renderLeftButton() {
    const {editModel} = this.props;
    const isDisabled = (!editModel.form.isValid || editModel.form.isFetching);

    const editModelType = this.props.editModel.form.editModelType;
    const buttonTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Create an Event" : "Update the Event";

    return (
      <div className="form-footer">
        <button
          onClick={this.onButtonPress.bind(this)}
          disabled={isDisabled}
          id="submit-biz-details-changes"
          name="action_submit"
          type="submit"
          value="Submit Changes"
          className="ybtn ybtn--primary">
          <span>{buttonTitle}</span>
        </button>
        <a onClick={this.props.goBack}>
          {'Cancel'}
        </a>
      </div>
    )
  }

  renderContent() {
    return (
      <div
        className="yform create-event-container js-event-create-form"
        id="create_event"
        name="create_event">

        {this.renderLeft()}

        <label>When</label>

        <div className="js-event-set-date event-calendar-fields">
          <div className="js-event-start-date-container date-container">
            <Telescope.components.F8CalenderView field="start"  {...this.props}/>
          </div>
          <div className="js-event-end-date-container date-container">
            <strong className="create-event-date-middle-link">to</strong>
            <Telescope.components.F8CalenderView field="end"  {...this.props}/>
          </div>
        </div>

        {this.renderLeftButton()}

      </div>

    )
  }


  renderTitle() {
    const editModelType = this.props.editModel.form.editModelType;
    const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Submit an Event" : "Update the Event";

    return (
      <div className="section-header">
        <h2>{formTitle}</h2>
      </div>
    )
  }

  render() {

    return (
      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">

          <Telescope.components.F8AppAlertSection/>

          <div className="container create-event-page">

            {this.renderTitle()}

            <div className="clearfix layout-block layout-a">

              <div className="column column-alpha ">
                {this.renderContent()}
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default IEAEditEventLayout;
