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
    value[field] = props.event[field] || new Date()

    this.state = {field, value}

    props.actions.onEditModelFormFieldChange(field, value[field], true)
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: {
        eventWhat: ''
        // eventWhat: nextProps.editModel.form.fields.eventWhat,
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
    if (value.eventWhat !== '') {
      // this.props.actions.onEditModelFormFieldChange('eventWhat', value.eventWhat)
    }
    this.setState(
      {value}
    )
  }

  onStartChange() {

  }

  render() {

    const calendar = (<Calendar
      style={{zIndex: 1000}}
      dateInputPlaceholder="please input"
      formatter={getFormat(true)}
      timePicker={timePickerElement}
      defaultValue={moment(new Date())}
      showDateInput={false}
      disabledDate={false}
    />);
    return (
      <DatePicker
        animation="slide-up"
        disabled={false}
        calendar={calendar}
        value={moment(new Date())}
        onChange={this.onStartChange.bind(this)}
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
