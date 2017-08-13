import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

// import error from './error'

// import Telescope from '../lib/en_US'
// const messages = Telescope.strings['en'] || {}

import {loadTranslations, setLocale, syncTranslationWithStore, i18nReducer} from 'react-redux-i18n';
import Translations from '../lib/Translations'

const rootReducer = combineReducers({
  i18n: i18nReducer,
  routing: routerReducer,
  detailedModelsOverlay: require('./detailedModelsOverlay').default,
  user: require('./user').default,
  editModel: require('./editModel/editModelReducer').default,
  userProfileTask: require('./userProfile').default,
  auth: require('./auth/authReducer').default,
  listContainerTasks: require('./listContainerReducer').default,
  appAlert: require('./alert').default,
})

export default rootReducer
