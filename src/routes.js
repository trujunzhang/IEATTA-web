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
  const loginRoutes = [
    {
      path: 'login',
      component: Telescope.components.UserLoginMain
    },
    {
      path: 'signup',
      component: Telescope.components.UserLoginMain
    },
  ];

  const restaurantRoutes = [
    {
      path: 'biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      path: 'edit/biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      path: 'new/biz',
      component: Telescope.components.DetailedRestaurant
    },
    {
      path: 'biz_photos/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
  ];

  const eventRoutes = [
    {
      path: 'events/(:eid)/(:eslug)',
      component: Telescope.components.DetailedEvent
    },
    {
      path: 'edit/event/(:eid)/(:eslug)',
      component: Telescope.components.DetailedEvent
    },
    {
      path: 'new/event/(:rid)/(:rslug)',
      component: Telescope.components.DetailedEvent
    }
  ];

  const recipeRoutes = [
    {
      path: 'orderedrecipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
    {
      path: 'edit/recipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
    {
      path: 'recipe_photos/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
  ];

  const reviewRoutes = [
    {
      path: 'edit/review/(:oid)/(:oslug)',
      component: Telescope.components.DetailedReview
    },
    {
      path: 'new/review/(:reviewType)/(:forObjectId)',
      component: Telescope.components.DetailedReview
    },
  ];

  const overlayRoutes = [
    {
      path: 'ordereduser/(:uid)/(:uslug)/(:eid)/(:rid)',
      component: Telescope.components.OrderedUsers
    },
  ];

  const playgroundRoutes = [
    {
      // http://localhost:3000/playground
      path: 'playground',
      component: Telescope.components.TcombCommonExample
    }
  ];

  const routes = [
    {
      path: '/',
      component: Telescope.components.Layout,
      // indexRoute: {component: Telescope.components.DetailedRestaurant},
      indexRoute: {component: Telescope.components.IEARestaurantsHome},

      childRoutes: [
        ...loginRoutes,
        ...restaurantRoutes,
        ...recipeRoutes,
        ...eventRoutes,
        ...reviewRoutes,
        ...overlayRoutes,
        ...playgroundRoutes,
        {
          // http://localhost:3000/user_details?userid=t3cu9DxXtGyaPIWNvPOXxA
          path: 'user_details',
          component: Telescope.components.UsersSingle
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
