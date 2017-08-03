const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Events = {
  config: {
    dateFormat: 'dddd, DD MMM, h:mm a'
  }
}

Events.toDateString = function (date) {
  return moment(date).format(Events.config.dateFormat)
}

/**
 * format is "Saturday, 1 Jul, 12:00 am – Monday, 31 Jul, 12:00 am"
 * @param item
 */
Events.getDateInfo = function (item) {
  const start = item.start;
  const end = item.end;

  //for example: "Saturday, 1 Jul, 12:00 am"
  const day = moment(start).format('dddd, DD MMM, h:mm a')
  // debugger

  return {
    "startFormat": Events.toDateString(start),
    "endFormat": Events.toDateString(end)
  }
}

Events.updateDate = function (oldValue, value, mode) {
  let mDate = moment(oldValue)

  if (mode === 'time') {
    mDate.hour(value.hour)
    mDate.minute(value.minute)
  } else {
    mDate.year(value.year)
    mDate.month(value.month)
    mDate.date(value.day)
  }

  // const x = mDate.toISOString()

  return mDate.toDate()
}

Events.getWantBody = function (event) {
  let html = event.want;
  if (html) {
    html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '</p>';
  }
  const htmlBody = {__html: html};

  return htmlBody;
}


export default Events;
