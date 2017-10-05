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

TopRightButtonsGroup.generateButtonSVGView = function (buttonType, modelType, forObject) {
  switch (buttonType) {

    case  RIGHT_BUTTON_GROUP_ADD_EVENT:
      return {
        title: "Add Event",
        svg: "M13.6 16H4.4C3.077 16 2 14.88 2 13.5v-9C2 3.12 3.077 2 4.4 2H5a1 1 0 0 1 2 0h4a1 1 0 0 1 2 0h.6C14.923 2 16 3.12 16 4.5v9c0 1.38-1.077 2.5-2.4 2.5zM15 7H3v6.5c0 .828.627 1.5 1.4 1.5h9.2c.773 0 1.4-.672 1.4-1.5V7zm-4.825 5.48l-.425.627L9 14.214l-.75-1.107-.425-.627A2.49 2.49 0 0 1 9 7.786a2.49 2.49 0 0 1 1.175 4.694zM9 9.214a1.07 1.07 0 1 0 0 2.142 1.07 1.07 0 0 0 0-2.142z",
        linkUrl: `/organization/event/new/${modelType}/${forObject.id}`
      }
    case  RIGHT_BUTTON_GROUP_ADD_RECIPE:
      return {
        title: "Add Recipe",
        svg: "M13.61 17h-.007a1.39 1.39 0 0 1-1.376-1.587L13 10l-2-1c0-5.373 1.375-8 3.25-8 .497 0 .75.336.75.75v13.86A1.39 1.39 0 0 1 13.61 17zM6.557 9.912l.35 5.59a1.41 1.41 0 1 1-2.813 0l.35-5.59A1.994 1.994 0 0 1 3 8V1.5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0V8c0 .91-.61 1.67-1.443 1.912z",
        linkUrl: `/organization/recipe/new/${modelType}/${forObject.id}`
      }
  }

  return {}
}


export default TopRightButtonsGroup;
