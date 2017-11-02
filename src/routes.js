const Telescope = require('./components/lib').default

import {userIsAuthenticated, userIsNotAuthenticated} from './auth'


const createRoutes = (store) => {
  const loginRoutes = [
    {
      path: 'login',
      component: userIsNotAuthenticated(Telescope.components.UserLoginMain),
    },
    {
      path: 'signup',
      component: userIsNotAuthenticated(Telescope.components.UserLoginMain),
    },
    {
      path: 'logout',
      component: Telescope.components.UserLoginMain,
    }
  ];

  const restaurantRoutes = [
    {
      path: 'biz/(:rid)/(:rslug)',
      component: Telescope.components.DetailedRestaurant
    },
    {
      path: 'edit/biz/(:rid)/(:rslug)',
      component: userIsAuthenticated(Telescope.components.DetailedRestaurant),
    },
    {
      path: 'new/biz',
      component: userIsAuthenticated(Telescope.components.DetailedRestaurant),
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
      component: userIsAuthenticated(Telescope.components.DetailedEvent),
    }
  ];

  const recipeRoutes = [
    {
      path: 'orderedrecipe/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
    {
      path: 'edit/recipe/(:oid)/(:oslug)',
      component: userIsAuthenticated(Telescope.components.OrderedRecipes),
    },
    {
      path: 'recipe_photos/(:oid)/(:oslug)',
      component: Telescope.components.OrderedRecipes
    },
  ];

  const reviewRoutes = [
    {
      path: 'edit/review/(:reviewType)/(:forObjectId)/(:reviewId)',
      component: userIsAuthenticated(Telescope.components.DetailedReview),
    },
    {
      path: 'new/review/(:reviewType)/(:forObjectId)',
      component: userIsAuthenticated(Telescope.components.DetailedReview),
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
    {
      path: 'invite',
      component: userIsAuthenticated(Telescope.components.IEALoggedUserInviteLayout)
    },
  ];

  const userEditRoutes = [
    {
      path: 'profile',
      component: userIsAuthenticated(Telescope.components.UsersSingle)
    },
  ];


  const photosRoutes = [
    {
      path: 'photos/add/(:modelType)/(:forObjectId)',
      component: userIsAuthenticated(Telescope.components.AddPhotoForModel)
    },
  ];


  const playgroundRoutes = [
    {
      // http://localhost:3000/playground
      path: 'playground',
      component: Telescope.components.TcombCommonExample
    }
  ];

  const organizationRoutes = [
    //for event
    {
      path: 'organization/event/new/(:modelType)/(:forObjectId)',
      component: userIsAuthenticated(Telescope.components.OrganizationForNewEvent)
    },
    {
      path: 'organization/event/users/(:eid)',
      component: userIsAuthenticated(Telescope.components.DetailedEvent)
    },
    //for recipe
    {
      path: 'organization/recipe/new/(:modelType)/(:forObjectId)',
      component: userIsAuthenticated(Telescope.components.OrganizationForRecipe)
    },
    {
      path: 'organization/recipe/edit/(:modelType)/(:forObjectId)/(:recipeId)',
      component: userIsAuthenticated(Telescope.components.OrganizationForRecipe)
    },
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
