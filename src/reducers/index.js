import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

// import error from './error'

// import Telescope from '../lib/en_US'
// const messages = Telescope.strings['en'] || {}

const rootReducer = combineReducers({
  // posts: require('./posts').default,
  // topics: require('./topics').default,
  routing: routerReducer,
  popModels: require('./popModels').default,
  detailedPostsOverlay: require('./detailedPostsOverlay').default,
  user: require('./user').default,
  userProfileTask: require('./userProfile').default,
  auth: require('./auth/authReducer').default,
  dashboard: require('./dashboard/dashboardReducer').default,
  listContainerTasks: require('./pagination/paginationReducer').default
})

export default rootReducer
