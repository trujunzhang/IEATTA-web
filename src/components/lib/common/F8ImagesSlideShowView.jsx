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


class F8ImagesSlideShowView extends Component {

  constructor(props, context) {
    super(props)


    this.state = {field, value}
  }

  render() {

    return (
      <div></div>
    )
  }
}


export default F8ImagesSlideShowView;
