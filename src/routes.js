let Telescope = require('./components/lib').default


export function requireAuth(store) {
  return (nextState, replace) => {

    const state = store.getState()

    if (!state.user.isLoggedIn) {
      replace({
        pathname: '/login',
        query: {
          next: nextState.location.pathname
        }
      })
    }

  }
}

export function alreadyLogin(store) {
  return (nextState, replace) => {

    const state = store.getState()

    if (state.user.isLoggedIn) {
      replace({
        pathname: '/logout',
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
      component: Telescope.components.UserLoginMain,
      onEnter: alreadyLogin(store)
    },
    {
      path: 'signup',
      component: Telescope.components.UserLoginMain,
      onEnter: alreadyLogin(store)
    },
    {
      path: 'logout',
      component: Telescope.components.UserLoginMain
    }
  ];

  const restaurantRoutes = [
    {
      path: 'biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      path: 'edit/biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant,
      onEnter: requireAuth(store)
    },
    {
      path: 'new/biz',
      component: Telescope.components.DetailedRestaurant,
      onEnter: requireAuth(store)
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
      component: Telescope.components.DetailedEvent,
      onEnter: requireAuth(store)
    },
    {
      path: 'new/event/(:rid)/(:rslug)',
      component: Telescope.components.DetailedEvent,
      onEnter: requireAuth(store)
    }
  ];

  const recipeRoutes = [
    {
      path: 'orderedrecipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
    {
      path: 'edit/recipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes,
      onEnter: requireAuth(store)
    },
    {
      path: 'recipe_photos/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
  ];

  const reviewRoutes = [
    {
      path: 'edit/review/(:oid)/(:oslug)',
      component: Telescope.components.DetailedReview,
      onEnter: requireAuth(store)
    },
    {
      path: 'new/review/(:reviewType)/(:forObjectId)',
      component: Telescope.components.DetailedReview,
      onEnter: requireAuth(store)
    },
  ];

  const orderedUserRoutes = [
    {
      path: 'ordereduser/(:pid)',
      component: Telescope.components.OrderedUsers
    },
  ];


  const userProfileRoutes = [
    {
      path: 'user_details/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },
  ];

  const userEditRoutes = [
    {
      path: 'profile',
      component: Telescope.components.UsersSingle
    },
  ];


  const playgroundRoutes = [
    {
      // http://localhost:3000/playground
      path: 'playground',
      component: Telescope.components.TcombCommonExample,
      onEnter: requireAuth(store)
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
        ...orderedUserRoutes,
        ...userProfileRoutes,
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

  return routes[0];
}

export default createRoutes
