const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Reviews = {}

Reviews.getHtmlBody = function (review) {
  let html = review.body;
  if (html) {
    html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '</p>';
  }
  const htmlBody = {__html: html};

  return htmlBody;
}


export default Reviews;
