import keyMirror from 'key-mirror'

export default keyMirror({
  // Photos Terms parameters type
  PHOTOS_TERMS_PARAM_NORMAL: null,
  PHOTOS_TERMS_PARAM_FOR_EDIT_RECIPE: null,

  // Users ordered in event
  PAGE_ORDERED_USERS_IN_EVENT: null,

  // Review List Type
  RECIPES_LIST_FOR_RESTAURANT_PAGE: null,
  RECIPES_LIST_FOR_EVENT_PAGE: null,
  RECIPES_LIST_FOR_LOGGED_USER_PAGE: null,

  // Right Buttons Group Type
  RIGHT_BUTTON_GROUP_ADD_EVENT: null,
  RIGHT_BUTTON_GROUP_MANAGER_ORDERED_USERS: null,
  RIGHT_BUTTON_GROUP_ADD_RECIPE: null,

  // Parse Object Model Status
  PARSE_OBJECT_FLAG_NORMAL: null,
  PARSE_OBJECT_FLAG_REMOVED: null,

  // Photos Browser Type
  PHOTOS_BROWSER_PAGE_NORMAL: null,
  PHOTOS_BROWSER_PAGE_FOR_USER_PROFILE: null,

  //Alert Type
  ALERT_TYPE_SUCCESS: null,
  ALERT_TYPE_ERROR: null,
  ALERT_TYPE_INFO: null,

  // Events List type
  EVENTS_LIST_FOR_RESTAURANT: null,
  EVENTS_LIST_FOR_USER: null,

  // Photo browser title
  PHOTO_BROWSER_NORMAL_TITLE: null,
  PHOTO_BROWSER_LOGGED_USER_TITLE: null,
  PHOTO_BROWSER_ORGANIZATION_TITLE: null,

  // Upload Image
  UPLOAD_IMAGE_FILE_DROP: null,
  UPLOAD_IMAGE_FILE_PREVIEW: null,

  // invoke parse cloud.
  CLOUD_STATISTIC_FOR_USER_STATE: null,
  CLOUD_STATISTIC_FOR_REVIEWS: null,
  CLOUD_RESTAURANT_ADDRESS: null,

  // Google Address
  RESTAURANT_CLOUD_ADDRESS_MODEL: null,

  // Review sort tags
  REVIEW_SORT_NORMAL: null,
  REVIEW_SORT_NEWEST: null,
  REVIEW_SORT_OLDEST: null,
  REVIEW_SORT_HIGHEST: null,
  REVIEW_SORT_LOWEST: null,

  // Review List Type
  REVIEW_LIST_TYPE_NORMAL: null,
  REVIEW_LIST_TYPE_USER_PROFILE_ABOUT: null,
  REVIEW_LIST_TYPE_USER_PROFILE_REVIEWS: null,

  // UserSingle Form Type
  // 1.1 LOGGED user left menus.
  LOGGED_USER_MENU_ABOUT: null,
  LOGGED_USER_MENU_REVIEWS: null,
  LOGGED_USER_MENU_BROWSER_PHOTOS: null,
  LOGGED_USER_MENU_EVENTS: null,
  LOGGED_USER_MENU_RECIPES: null,

  // 1.2 Edit User.
  LOGGED_USER_EDIT_FORM: null,

  // App alert
  SHOW_ALERT_MESSAGE: null,
  DISMISS_ALERT_MESSAGE: null,

  // Page form types
  PAGE_MAIN_FORM: null,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY: null,
  PAGE_PHOTOS_BROWSER_FORM: null,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY: null,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM: null,
  PAGE_SINGLE_SELECTED_PHOTO_FORM: null,
  PAGE_RECIPES_LIST_BROWSER_FORM: null,

  // Home More Menus
  MENU_ITEM_ADD_OR_EDIT_RESTAURANT: null,
  MENU_ITEM_ADD_OR_EDIT_EVENT: null,
  MENU_ITEM_ADD_OR_EDIT_RECIPE: null,
  MENU_ITEM_ADD_OR_EDIT_USER: null,
  MENU_ITEM_ADD_OR_EDIT_REVIEW: null,
  MENU_ITEM_SEARCH_RESTAURANTS: null,
  MENU_ITEM_MANAGE_FRIENDS: null,
  MENU_ITEM_READ_REVIEWS: null,

  // Model Form Mode
  MODEL_FORM_TYPE_NEW: null,
  MODEL_FORM_TYPE_EDIT: null,
  MODEL_FORM_TYPE_FOR_PEOPLE_IN_EVENT: null,

  // Edit Model
  EDIT_MODEL_TOGGLE_TYPE: null,
  ON_EDIT_MODEL_FORM_FIELD_CHANGE: null,
  ON_RESTAURANT_MODEL_FORM_ADDRESS_FIELD_CHANGE: null,
  SAVE_MODEL_REQUEST: null,
  UPDATE_MODEL_REQUEST: null,
  UPDATE_MODEL_SUCCESS: null,
  UPDATE_MODEL_FAILURE: null,

  WRITE_MODEL_DONE: null,

  // Parse Object
  PARSE_CONFIGURE: null,
  PARSE_RECORDS: null,
  PARSE_RESTAURANTS: null,
  PARSE_EVENTS: null,
  PARSE_PEOPLE_IN_EVENTS: null,
  PARSE_USERS: null,
  PARSE_PHOTOS: null,
  PARSE_RECIPES: null,
  PARSE_REVIEWS: null,

  // Login UI
  LOGIN_FORM_TYPE_MAIN: null,
  LOGIN_FORM_TYPE_LOGIN: null,
  LOGIN_FORM_TYPE_REGISTER: null,
  LOGIN_FORM_TYPE_LOG_OUT: null,
  LOGIN_FORM_TYPE_FORGOTPASSWORD: null,
  LOGIN_FORM_TYPE_RESET_PASSWD: null,


  // User Profile Type
  USERPROFILE_TYPE_UPVOTE: null,
  USERPROFILE_TYPE_DOWNVOTE: null,
  USERPROFILE_TYPE_SUBMITTED_POSTS: null,
  USERPROFILE_TYPE_FOLDER_LIST: null,

  // IEAUserProfileAboutLayout Event Type
  USERPROFILE_RESET: null,
  USERPROFILE_LOADED: null,

  // Voting button types
  VOTE_BUTTON_LIST_UPVOTE: null,
  VOTE_BUTTON_LIST_DOWNVOTE: null,
  VOTE_BUTTON_ARTICLE_UPVOTE: null,
  VOTE_BUTTON_ARTICLE_DOWNVOTE: null,
  VOTE_BUTTON_RELATED_UPVOTE: null,
  VOTE_BUTTON_RELATED_DOWNVOTE: null,


  // Voting
  POSTS_UPVOTE: null,
  POSTS_DOWNVOTE: null,
  POSTS_UPVOTE_CACEL: null,
  POSTS_DOWNVOTE_CACEL: null,

  POSTS_VOTING_DONE: null,

  // Users
  LOGGED_IN: null,
  LOGGED_OUT: null,
  SET_SHARING: null,
  RESET_NUXES: null,


  // For dashboard
  DASHBOARD_EDIT_ALL_ROWS: null,
  DASHBOARD_EDIT_SINGLE_ROW: null,
  DASHBOARD_EDIT_SINGLE_ROW_CANCEL: null,

  TOGGLE_TABLE_ROW_CHECKBOX: null,
  TOGGLE_TABLE_ROW_ALL_CHECKBOXS: null,

  DASHBOARD_LOADED_PAGINATION: null,
  DASHBOARD_LOADED_TOPICS: null,
  DASHBOARD_RESET: null,

  // PostHome, PostDaily
  LIST_VIEW_LOADED_BY_TYPE: null,

  // Detailed Page(Restaurants,Events)
  OVERLAY_LOADED_MODEL_PAGE: null,
  OVERLAY_LOADED_MODEL_RESET: null,
  STATISTIC_CLOUD_MODEL: null,

  SET_PLATFORM: null,
  SET_VERSION: null,

  LOGIN_VIA_SOCIAL: null,

  ON_LOGIN_STATE_CHANGE: null,
  LOGOUT: null,

  ON_AUTH_FORM_FIELD_CHANGE: null,
  REQUEST_API: null,
  RESET_ERROR: null,
  SIGNUP_REQUEST: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  SET_SESSION_TOKEN: null,

  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,

  GET_PROFILE_REQUEST: null,
  GET_PROFILE_SUCCESS: null,
  GET_PROFILE_FAILURE: null,

  ON_PROFILE_FORM_FIELD_CHANGE: null,

  PROFILE_UPDATE_REQUEST: null,
  PROFILE_UPDATE_SUCCESS: null,
  PROFILE_UPDATE_FAILURE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,

  FORGOT_PASSWORD: null,
  LOGIN: null,
  REGISTER: null,

  ON_SHIPMENT_FORM_FIELD_CHANGE: null,
  NEW_SHIPMENT: null,
  NEW_SHIPMENT_REQUEST: null,
  NEW_SHIPMENT_SUCCESS: null,
  NEW_SHIPMENT_FAILURE: null,

  GET_SHIPMENTS_REQUEST: null,
  GET_SHIPMENTS_SUCCESS: null,
  GET_SHIPMENTS_FAILURE: null,

  ON_SHIPMENT_SAVED: null

})
