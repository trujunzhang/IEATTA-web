import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

// import error from './error'

// import Telescope from '../lib/en_US'
// const messages = Telescope.strings['en'] || {}

import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import Translations from '../lib/Translations'

const rootReducer = combineReducers({
  // posts: require('./posts').default,
  // topics: require('./topics').default,
  routing: routerReducer,
  popModels: require('./popModels').default,
  detailedModelsOverlay: require('./detailedModelsOverlay').default,
  user: require('./user').default,
  editModel: require('./editModel/editModelReducer').default,
  userProfileTask: require('./userProfile').default,
  auth: require('./auth/authReducer').default,
  dashboard: require('./dashboard/dashboardReducer').default,
  listContainerTasks: require('./pagination/paginationReducer').default,
  i18n: i18nReducer
})

export default rootReducer
