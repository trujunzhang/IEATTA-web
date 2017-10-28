const Telescope = require('./components/lib').default

import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history3/redirect'
import {routerActions} from 'react-router-redux'


const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => {
    return state.user.isLoggedIn !== false
  },
  authenticatingSelector: state => {
    return state.user.isLoggedIn === true
  },
  AuthenticatingComponent: Telescope.components.Error404,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/foo',
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => state.user.isLoggedIn === false,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
