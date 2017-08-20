import Telescope from '../../lib'
import React, {Component} from 'react'


import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';

const format = 'YYYY-MM-DD HH:mm:ss';

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')}/>;

/**
 * The states were interested in
 */
const {
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
  // Sections
  SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
  // Model Form Type
  MODEL_FORM_TYPE_NEW,
  MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class F8CalenderView extends Component {

  constructor(props, context) {
    super(props)

    const field = props.field;
    const value = {};
    value[field] = props.forObject[field] || new Date()

    this.state = {field, value}

    props.actions.onEditModelFormFieldChange(field, value[field], true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    const newValue = {};
    newValue[this.state.field] = nextProps.editModel.form.fields[this.state.field];
    this.setState({value: newValue})
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
    const newValue = {};
    newValue[this.state.field] = value.toDate()

    this.props.actions.onEditModelFormFieldChange(this.state.field, value.toDate(), true)

    this.setState({value: newValue})
  }

  render() {
    const currentDate = moment(this.state.value[this.state.field]);

    const calendar = (<Calendar
      style={{zIndex: 1000}}
      dateInputPlaceholder="please input"
      formatter={getFormat(true)}
      timePicker={timePickerElement}
      defaultValue={currentDate}
      showDateInput={false}
    />);
    return (
      <DatePicker
        animation="slide-up"
        disabled={false}
        calendar={calendar}
        value={currentDate}
        onChange={this.onChange.bind(this)}
      >
        {
          ({value}) => {
            return (
              <div className="nested-icon-label date-picker">
                <input
                  id="starts_month_day_year"
                  name="starts_month_day_year"
                  type="text"
                  title="mm/dd/yyyy"
                  style={{width: 250}}
                  disabled={false}
                  readOnly
                  tabIndex="-1"
                  className="date-input js-event-start-date"
                  value={value && value.format(getFormat(true)) || ''}
                />
              </div>
            );
          }
        }
      </DatePicker>
    )
  }
}


export default F8CalenderView;
