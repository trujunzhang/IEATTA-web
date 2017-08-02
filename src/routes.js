let Telescope = require('./components/lib').default

import CoreLayout from './layouts/PageLayout/PageLayout'

import Home from './routes/Home'

export function requireAuth(store) {
  return (nextState, replace) => {

    const state = store.getState()

    if (!state.auth.isLoggedIn) {
      replace({
        pathname: '/login',
        query: {
          next: nextState.location.pathname
        }
      })
    }

  }
}

const createRoutes = (store) => {
  const routes = [
    {
      path: '/',
      component: Telescope.components.Layout,
      // indexRoute: {component: Telescope.components.PopoverPosts},
      indexRoute: {component: Telescope.components.RestaurantsHome},

      childRoutes: [
        {
          // http://localhost:3000/user_details?userid=t3cu9DxXtGyaPIWNvPOXxA
          path: 'user_details',
          component: Telescope.components.UsersSingle
        },
        {
          // http://localhost:3000/biz/xxxxx
          // https://www.yelp.com.sg/biz/my-two-cents-los-angeles-3
          path: 'biz/(:rid)/(:rslug)',
          component: Telescope.components.PopoverPosts
        },
        {
          // http://localhost:3000/login
          path: 'login',
          component: Telescope.components.UserLoginMain
        },
        {
          // http://localhost:3000/signup
          path: 'signup',
          component: Telescope.components.UserLoginMain
        },
        {
          path: 'signup',
          component: Telescope.components.RestaurantsHome
        },
        {
          path: '*',
          component: Telescope.components.Error404
        }
      ]
    }
  ]

  return routes[0]
}

export default createRoutes
