import Telescope from './config'

// actions
Telescope.registerComponent('ArticleDownvote',                require('./actions/ArticleDownvote.jsx').default)
Telescope.registerComponent('ArticleUpvote',                  require('./actions/ArticleUpvote.jsx').default)
Telescope.registerComponent('PostItemVoteButton',             require('./actions/PostItemVoteButton.jsx').default)
Telescope.registerComponent('PostsCommenters',                require('./actions/PostsCommenters.jsx').default)
Telescope.registerComponent('PostsReadMore',                  require('./actions/PostsReadMore.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeaderRight',         require('./actions/RestaurantsSingleHeaderRight.jsx').default)
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
Telescope.registerComponent('PostsDaily',                 require('./restaurant/PostsDaily.jsx').default)
Telescope.registerComponent('PostsDay',                   require('./restaurant/PostsDay.jsx').default)
Telescope.registerComponent('PostsDomain',                require('./restaurant/PostsDomain.jsx').default)
Telescope.registerComponent('RestaurantsHome',            require('./restaurant/RestaurantsHome.jsx').default)
Telescope.registerComponent('RestaurantsHomeList',        require('./restaurant/RestaurantsHomeList.jsx').default)
Telescope.registerComponent('RestaurantsItem',            require('./restaurant/RestaurantsItem.jsx').default)
Telescope.registerComponent('PostsListRightMap',          require('./restaurant/PostsListRightMap.jsx').default)
Telescope.registerComponent('PostsList',                  require('./restaurant/PostsList.jsx').default)
Telescope.registerComponent('PostsListTitle',             require('./restaurant/PostsListTitle.jsx').default)
Telescope.registerComponent('PostsLoading',               require('./restaurant/PostsLoading.jsx').default)
Telescope.registerComponent('PostsLoadMore',              require('./restaurant/PostsLoadMore.jsx').default)
Telescope.registerComponent('PostsNoResults',             require('./restaurant/PostsNoResults.jsx').default)
Telescope.registerComponent('PostsPopularThisWeek',       require('./restaurant/PostsPopularThisWeek.jsx').default)

// postsoverlay
Telescope.registerComponent('DetailedRestaurant',                 require('./postsoverlay/DetailedRestaurant.jsx').default)

// postsoverlay(page)
Telescope.registerComponent('RestaurantsDetail',                         require('./postsoverlay/page/RestaurantsDetail.jsx').default)
Telescope.registerComponent('RestaurantsPage',                    require('./postsoverlay/page/RestaurantsPage.jsx').default)
Telescope.registerComponent('RestaurantsPageMap',                 require('./postsoverlay/page/RestaurantsPageMap.jsx').default)
Telescope.registerComponent('PostsRelatedItem',                   require('./postsoverlay/page/PostsRelatedItem.jsx').default)
Telescope.registerComponent('PostsRelatedList',                   require('./postsoverlay/page/PostsRelatedList.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeader',                  require('./postsoverlay/page/RestaurantsSingleHeader.jsx').default)

// profile
Telescope.registerComponent('UserProfileHeader',                   require('./profile/UserProfileHeader.jsx').default)
Telescope.registerComponent('UsersProfile',                        require('./profile/UsersProfile.jsx').default)
Telescope.registerComponent('UsersSingle',                         require('./profile/UsersSingle.jsx').default)

// profile(list)
Telescope.registerComponent('UserProfilePostsList',                require('./profile/list/UserProfilePostsList.jsx').default)

// profile(menus)
Telescope.registerComponent('UsersCollectionFoldersList',          require('./profile/menus/UsersCollectionFoldersList.jsx').default)
Telescope.registerComponent('UsersDownvote',                       require('./profile/menus/UsersDownvote.jsx').default)
Telescope.registerComponent('UsersSubmittedPostsList',             require('./profile/menus/UsersSubmittedPostsList.jsx').default)
Telescope.registerComponent('UsersUpvote',                         require('./profile/menus/UsersUpvote.jsx').default)

// profile(folders)
Telescope.registerComponent('FoldersItem',                       require('./profile/folders/FoldersItem.jsx').default)
Telescope.registerComponent('FoldersList',                       require('./profile/folders/FoldersList.jsx').default)


// Sidebar
Telescope.registerComponent('AppSideBar',           require('./sidebar/AppSideBar.jsx').default)
Telescope.registerComponent('WidgetHeader',         require('./sidebar/WidgetHeader.jsx').default)

Telescope.registerComponent('Week',                 require('./sidebar/widgetscalendar/Week.jsx').default)
Telescope.registerComponent('WidgetCalendar',       require('./sidebar/widgetscalendar/WidgetCalendar.jsx').default)

Telescope.registerComponent('WidgetTopics',         require('./sidebar/widgettopics/WidgetTopics.jsx').default)

Telescope.registerComponent('TwitterTimeline',      require('./sidebar/widgettwitter/TwitterTimeline.jsx').default)
Telescope.registerComponent('WidgetTwitter',        require('./sidebar/widgettwitter/WidgetTwitter.jsx').default)

Telescope.registerComponent('AppAbout',            require('./sidebar/widgetapps/AppAbout.jsx').default)
Telescope.registerComponent('AppCareers',          require('./sidebar/widgetapps/AppCareers.jsx').default)
Telescope.registerComponent('AppContact',          require('./sidebar/widgetapps/AppContact.jsx').default)
Telescope.registerComponent('AppFooter',           require('./sidebar/widgetapps/AppFooter.jsx').default)
Telescope.registerComponent('AppPrivacy',          require('./sidebar/widgetapps/AppPrivacy.jsx').default)
Telescope.registerComponent('AppTermsOfService',   require('./sidebar/widgetapps/AppTermsOfService.jsx').default)
Telescope.registerComponent('WidgetAppFollower',   require('./sidebar/widgetapps/WidgetAppFollower.jsx').default)
Telescope.registerComponent('WidgetAppFooter',     require('./sidebar/widgetapps/WidgetAppFooter.jsx').default)
Telescope.registerComponent('WidgetMobileApps',    require('./sidebar/widgetapps/WidgetMobileApps.jsx').default)

// overlay
Telescope.registerComponent('AppOverlay',                    require('./overlay/AppOverlay.jsx').default)
Telescope.registerComponent('MoreTagsPopoverMenu',           require('./overlay/MoreTagsPopoverMenu.jsx').default)
Telescope.registerComponent('SubmitFlagPopover',             require('./overlay/SubmitFlagPopover.jsx').default)
Telescope.registerComponent('UsersPopoverMenu',              require('./overlay/UsersPopoverMenu.jsx').default)

Telescope.registerComponent('CollectionsResult',              require('./overlay/collections/CollectionsResult.jsx').default)
Telescope.registerComponent('UserCollectionsPopover',         require('./overlay/collections/UserCollectionsPopover.jsx').default)

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

// dashboard
Telescope.registerComponent('AppAdminFooter',                require('./dashboard/AppAdminFooter.jsx').default)
Telescope.registerComponent('AppAdminHeader',                require('./dashboard/AppAdminHeader.jsx').default)
Telescope.registerComponent('AppAdminLayout',                require('./dashboard/AppAdminLayout.jsx').default)
Telescope.registerComponent('AppAdminSidebar',               require('./dashboard/AppAdminSidebar.jsx').default)
Telescope.registerComponent('AppSearchTitle',                require('./dashboard/AppSearchTitle').default)

// dashboard(default)
Telescope.registerComponent('AppAdminDashboard',               require('./dashboard/default/AppAdminDashboard.jsx').default)

// dashboard(tables)
Telescope.registerComponent('AdminTables',                        require('./dashboard/tables/AdminTables.jsx').default)
Telescope.registerComponent('AdminTablesCommentsColumn',          require('./dashboard/tables/AdminTablesCommentsColumn.jsx').default)
Telescope.registerComponent('AdminTablesCommonColumn',            require('./dashboard/tables/AdminTablesCommonColumn.jsx').default)
Telescope.registerComponent('AdminTablesRow',                     require('./dashboard/tables/AdminTablesRow.jsx').default)
Telescope.registerComponent('AdminTablesTH',                      require('./dashboard/tables/AdminTablesTH.jsx').default)
Telescope.registerComponent('AdminTablesTopicsColumn',            require('./dashboard/tables/AdminTablesTopicsColumn.jsx').default)
Telescope.registerComponent('PaginationContainer',                require('./dashboard/tables/PaginationContainer.jsx').default)

// dashboard(posts)
Telescope.registerComponent('AppAdminPostDateTime',                require('./dashboard/posts/AppAdminPostDateTime.jsx').default)
Telescope.registerComponent('AppAdminPostItemAction',              require('./dashboard/posts/AppAdminPostItemAction.jsx').default)
Telescope.registerComponent('AppAdminPostsAction',                 require('./dashboard/posts/AppAdminPostsAction.jsx').default)
Telescope.registerComponent('AppAdminPostsEditAll',                require('./dashboard/posts/AppAdminPostsEditAll.jsx').default)
Telescope.registerComponent('AppAdminPostsEditSingle',             require('./dashboard/posts/AppAdminPostsEditSingle.jsx').default)
Telescope.registerComponent('AppAdminPostsList',                   require('./dashboard/posts/AppAdminPostsList.jsx').default)
Telescope.registerComponent('AppAdminPostsTopAction',              require('./dashboard/posts/AppAdminPostsTopAction.jsx').default)


export default Telescope
