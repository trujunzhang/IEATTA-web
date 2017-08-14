const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Reviews = {
  config: {
    // 6/11/2017
    dateFormat: 'DD/MM/YYYY'
  }
}

Reviews.getHtmlBody = function (review) {
  let html = review.body;
  if (html) {
    html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '</p>';
  }
  const htmlBody = {__html: html};

  return htmlBody;
}

Reviews.toDateString = function (date) {
  return moment(date).format(Reviews.config.dateFormat)
}

export default Reviews;
