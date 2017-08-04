const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Recipes = {
  config: {
    dateFormat: 'dddd, DD MMM, h:mm a'
  }
}

Recipes.getUpdatedAtFormat = function (recipe) {
  const start = recipe.updatedAt;

  //for example: "Saturday, 1 Jul, 12:00 am"
  const day = moment(start).format('MM/DD/YYYY')

  debugger

  return day;
}


export default Recipes;
