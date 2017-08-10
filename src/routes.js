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
      // http://localhost:3000/login
      path: 'login',
      component: Telescope.components.UserLoginMain
    },
    {
      // http://localhost:3000/signup
      path: 'signup',
      component: Telescope.components.UserLoginMain
    },
  ];

  const restaurantRoutes = [
    {
      // http://localhost:3000/biz/xxxxx
      // https://www.yelp.com.sg/biz/my-two-cents-los-angeles-3
      path: 'biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      // http://localhost:3000/biz/xxxxx
      // https://www.yelp.com.sg/biz/my-two-cents-los-angeles-3
      path: 'edit/biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      // http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio
      // http://localhost:3000/biz_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud
      // https://www.yelp.com/biz_photos/roma-antica-san-francisco-3
      // https://www.yelp.com/biz_photos/roma-antica-san-francisco-3?select=x57_yoZarQuIn9y1r2jsQw
      path: 'biz_photos/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
  ];


  const recipeRoutes = [
    {
      // http://localhost:3000/orderedrecipe/SMHughBGNh/Jaron%20Lawrence/p25iag5OcM/OnNGSfwoou
      path: 'orderedrecipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
    {
      // http://localhost:3000/biz/xxxxx
      // https://www.yelp.com.sg/biz/my-two-cents-los-angeles-3
      path: 'edit/recipe/(:oid)/(:oslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      // http://localhost:3000/recipe_photos/OnNGSfwoou/Forno%20Vecchio
      // http://localhost:3000/recipe_photos/OnNGSfwoou/Forno%20Vecchio?select=Px63VDvuud
      // https://www.yelp.com/recipe_photos/roma-antica-san-francisco-3
      // https://www.yelp.com/recipe_photos/roma-antica-san-francisco-3?select=x57_yoZarQuIn9y1r2jsQw
      path: 'recipe_photos/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
  ];

  const overlayRoutes = [
    {
      // http://localhost:3000/events/px09dUf7tw/xxx
      // https://www.yelp.com/events/pleasanton-alameda-county-fair-6
      path: 'events/(:eid)/(:eslug)',
      component: Telescope.components.DetailedEvent
    },
    {
      // http://localhost:3000/ordereduser/aGkde8iuL6/Jaron%20Lawrence/p25iag5OcM/OnNGSfwoou
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
