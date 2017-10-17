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
      // onEnter: requireAuth(store)
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
    {
      path: 'biz_recipes/(:rid)/(:rslug)',
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
      // onEnter: requireAuth(store)
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
      // onEnter: requireAuth(store)
    },
    {
      path: 'recipe_photos/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
  ];

  const reviewRoutes = [
    {
      path: 'edit/review/(:reviewType)/(:forObjectId)/(:reviewId)',
      component: Telescope.components.DetailedReview,
      // onEnter: requireAuth(store)
    },
    {
      path: 'new/review/(:reviewType)/(:forObjectId)',
      component: Telescope.components.DetailedReview,
      // onEnter: requireAuth(store)
    },
    {
      path: 'reviews/(:modelType)/(:forObjectId)/(:forObjectDisplayName)',
      component: Telescope.components.IEAReviewsListLayout,
    },
  ];

  const orderedUserRoutes = [
    {
      path: 'ordereduser/(:peopleInEventId)',
      component: Telescope.components.OrderedUsers
    },
  ];


  const userProfileRoutes = [
    {
      path: 'user_details/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },
    {
      path: 'user_details_reviews_self/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },
    {
      path: 'user_local_photos/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },
    {
      path: 'user_details_events/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },

    {
      path: 'user_details_recipes/(:uid)/(:uslug)',
      component: Telescope.components.UsersSingle
    },
  ];

  const userEditRoutes = [
    {
      path: 'profile',
      component: Telescope.components.UsersSingle
    },
  ];


  const photosRoutes = [
    {
      path: 'photos/add/(:modelType)/(:forObjectId)',
      component: Telescope.components.AddPhotoForModel
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

  const organizationRoutes = [
    //for event
    {
      path: 'organization/event/new/(:modelType)/(:forObjectId)',
      component: Telescope.components.OrganizationForNewEvent
    },
    {
      path: 'organization/event/users/(:modelType)/(:forObjectId)',
      component: Telescope.components.OrganizationForNewEvent
    },
    //for recipe
    {
      path: 'organization/recipe/new/(:modelType)/(:forObjectId)',
      component: Telescope.components.OrganizationForRecipe
    },
    {
      path: 'organization/recipe/edit/(:modelType)/(:forObjectId)/(:recipeId)',
      component: Telescope.components.OrganizationForRecipe
    },


    // return `/organization/recipe/edit/restaurant/${recipe.restaurant.id}/${recipe.id}`
  ];
  const routes = [
    {
      path: '/',
      component: Telescope.components.Layout,
      indexRoute: {component: Telescope.components.IEARestaurantsHome},

      childRoutes: [
        ...loginRoutes,
        ...restaurantRoutes,
        ...recipeRoutes,
        ...eventRoutes,
        ...reviewRoutes,
        ...orderedUserRoutes,
        ...userProfileRoutes,
        ...userEditRoutes,
        ...photosRoutes,
        ...organizationRoutes,
        ...playgroundRoutes,
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
