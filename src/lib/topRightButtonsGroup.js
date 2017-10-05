const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS,
  // Parse Object Model Status
  PARSE_OBJECT_FLAG_NORMAL,
  PARSE_OBJECT_FLAG_REMOVED,
  // Right Buttons Group Type
  RIGHT_BUTTON_GROUP_ADD_EVENT,
  RIGHT_BUTTON_GROUP_ADD_RECIPE,
} = require('./constants').default

const TopRightButtonsGroup = {}

TopRightButtonsGroup.generateButtonSVGView = function (buttonType, value, mode) {
  switch (buttonType) {

    case  RIGHT_BUTTON_GROUP_ADD_EVENT:
      return {
        title: "Add Event",
        svg: "M14 2H4v14l5-4 5 4V2zm-3.13 7.957L8.978 8.794 7.148 10 7.5 7.926 6 6.458l2.074-.303L8.977 4l.948 2.155L12 6.458l-1.5 1.468.37 2.03z",
        linkUrl: ''
      }
    case  RIGHT_BUTTON_GROUP_ADD_RECIPE:
      return {
        title: "Add Recipe",
        svg: "M17.714 6.43L13 10.356v-3.03c-1 0-5.097 1.47-6.286 3.62.274-3.08 4.286-5.5 6.286-5.5V2.5l4.714 3.93zM3 4v10h11v-2.5l1-1V15H2V3h8.5l-1 1H3z",
        linkUrl: ''
      }
  }

  return {}
}


export default TopRightButtonsGroup;
