import Telescope from './config'

// actions
Telescope.registerComponent('ArticleDownvote',                require('./actions/ArticleDownvote.jsx').default)
Telescope.registerComponent('ArticleUpvote',                  require('./actions/ArticleUpvote.jsx').default)
Telescope.registerComponent('PostItemVoteButton',             require('./actions/PostItemVoteButton.jsx').default)
Telescope.registerComponent('PostsCommenters',                require('./actions/PostsCommenters.jsx').default)
Telescope.registerComponent('PostsReadMore',                  require('./actions/PostsReadMore.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeaderRight',   require('./actions/RestaurantsSingleHeaderRight.jsx').default)
Telescope.registerComponent('RelatedPostDownvote',            require('./actions/RelatedPostDownvote.jsx').default)
Telescope.registerComponent('RelatedPostUpvote',              require('./actions/RelatedPostUpvote.jsx').default)
Telescope.registerComponent('TopicItem',                      require('./actions/TopicItem.jsx').default)


// extensions
Telescope.registerComponent('AvatarBlurryImage',                require('./extensions/AvatarBlurryImage.jsx').default)
Telescope.registerComponent('BlurryImage',                      require('./extensions/BlurryImage.jsx').default)
Telescope.registerComponent('MailTo',                           require('./extensions/MailTo.jsx').default)
Telescope.registerComponent('UsersBlurryImageAvatar',           require('./extensions/UsersBlurryImageAvatar.jsx').default)

// common
Telescope.registerComponent('Layout',                           require('./common/Layout.jsx').default)
Telescope.registerComponent('Error404',                         require('./common/Error404.jsx').default)
Telescope.registerComponent('App',                              require('./common/App.js').default)

// header
Telescope.registerComponent('HeaderContent',                    require('./header/HeaderContent.jsx').default)
Telescope.registerComponent('HeaderContentSearchBar',           require('./header/HeaderContentSearchBar.jsx').default)
Telescope.registerComponent('HeaderRightLoginPanel',            require('./header/HeaderRightLoginPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserIconsPanel',        require('./header/HeaderRightUserIconsPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserPanel',             require('./header/HeaderRightUserPanel.jsx').default)


// restaurant
Telescope.registerComponent('IEARestaurantsHome',         require('./restaurant/IEARestaurantsHome.jsx').default)
Telescope.registerComponent('RestaurantsHomeList',        require('./restaurant/RestaurantsHomeList.jsx').default)
Telescope.registerComponent('RestaurantsItem',            require('./restaurant/RestaurantsItem.jsx').default)
Telescope.registerComponent('RestaurantsListRightMap',    require('./restaurant/RestaurantsListRightMap.jsx').default)
Telescope.registerComponent('IEARestaurantsList',         require('./restaurant/IEARestaurantsList.jsx').default)
Telescope.registerComponent('RestaurantsLoading',         require('./restaurant/RestaurantsLoading.jsx').default)
Telescope.registerComponent('RestaurantsLoadMore',        require('./restaurant/RestaurantsLoadMore.jsx').default)
Telescope.registerComponent('RestaurantsNoResults',       require('./restaurant/RestaurantsNoResults.jsx').default)

// restaurantsoverlay
Telescope.registerComponent('DetailedRestaurant',                 require('./postsoverlay/DetailedRestaurant.jsx').default)

// restaurantsoverlay(page)
Telescope.registerComponent('RestaurantsDetail',                  require('./postsoverlay/page/RestaurantsDetail.jsx').default)
Telescope.registerComponent('IEARestaurantsPage',                 require('./postsoverlay/page/IEARestaurantsPage.jsx').default)
Telescope.registerComponent('RestaurantsPageMap',                 require('./postsoverlay/page/RestaurantsPageMap.jsx').default)
Telescope.registerComponent('EventsItem',                         require('./postsoverlay/page/EventsItem.jsx').default)
Telescope.registerComponent('EventsList',                         require('./postsoverlay/page/EventsList.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeader',            require('./postsoverlay/page/RestaurantsSingleHeader.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeaderPhotos',      require('./postsoverlay/page/RestaurantsSingleHeaderPhotos.jsx').default)

// profile
Telescope.registerComponent('UserProfileHeader',                   require('./profile/UserProfileHeader.jsx').default)
Telescope.registerComponent('UsersProfile',                        require('./profile/UsersProfile.jsx').default)
Telescope.registerComponent('UsersSingle',                         require('./profile/UsersSingle.jsx').default)

// profile(menus)
Telescope.registerComponent('UsersCollectionFoldersList',          require('./profile/menus/UsersCollectionFoldersList.jsx').default)
Telescope.registerComponent('UsersDownvote',                       require('./profile/menus/UsersDownvote.jsx').default)
Telescope.registerComponent('UsersSubmittedPostsList',             require('./profile/menus/UsersSubmittedPostsList.jsx').default)
Telescope.registerComponent('UsersUpvote',                         require('./profile/menus/UsersUpvote.jsx').default)

// overlay
Telescope.registerComponent('AppOverlay',                    require('./overlay/AppOverlay.jsx').default)
Telescope.registerComponent('MoreTagsPopoverMenu',           require('./overlay/MoreTagsPopoverMenu.jsx').default)
Telescope.registerComponent('SubmitFlagPopover',             require('./overlay/SubmitFlagPopover.jsx').default)
Telescope.registerComponent('UsersPopoverMenu',              require('./overlay/UsersPopoverMenu.jsx').default)


Telescope.registerComponent('UserEmailSignIn',                require('./overlay/login/UserEmailSignIn.jsx').default)
Telescope.registerComponent('UserEmailSignUp',                require('./overlay/login/UserEmailSignUp.jsx').default)
Telescope.registerComponent('UserLoginMain',                  require('./overlay/login/UserLoginMain.jsx').default)
Telescope.registerComponent('UsersRemovedAccount',            require('./overlay/login/UsersRemovedAccount.jsx').default)
Telescope.registerComponent('UsersResetPassword',             require('./overlay/login/UsersResetPassword.jsx').default)
Telescope.registerComponent('UsersVerifyEmail',               require('./overlay/login/UsersVerifyEmail.jsx').default)

// article
Telescope.registerComponent('ArticleFeatureImage',               require('./article/ArticleFeatureImage.jsx').default)
Telescope.registerComponent('ArticleTopics',                     require('./article/ArticleTopics.jsx').default)
Telescope.registerComponent('FirstTypeLink',                     require('./article/FirstTypeLink.jsx').default)
Telescope.registerComponent('HintInfo',                          require('./article/HintInfo.jsx').default)
Telescope.registerComponent('SecondInfo',                        require('./article/SecondInfo.jsx').default)
Telescope.registerComponent('SubmitAnArticle',                   require('./article/SubmitAnArticle.jsx').default)

// users
Telescope.registerComponent('UsersMenu',               require('./users/UsersMenu.jsx').default)



export default Telescope
