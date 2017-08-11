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
Telescope.registerComponent('F8StarIcon',                       require('./common/F8StarIcon.jsx').default)
Telescope.registerComponent('F8SingleHeaderRightPhotos',        require('./common/F8SingleHeaderRightPhotos.jsx').default)
Telescope.registerComponent('F8RestaurantMapSection',           require('./common/F8RestaurantMapSection.jsx').default)
Telescope.registerComponent('F8UserAvatorSection',              require('./common/F8UserAvatorSection.jsx').default)
Telescope.registerComponent('F8LoadingView',                    require('./common/F8LoadingView.jsx').default)
Telescope.registerComponent('F8EmptySection',                   require('./common/F8EmptySection.jsx').default)
Telescope.registerComponent('F8CalenderView',                   require('./common/F8CalenderView.jsx').default)
Telescope.registerComponent('F8SectionHeaderTitle',             require('./common/F8SectionHeaderTitle.jsx').default)
Telescope.registerComponent('F8PageHeaderButtonsSection',       require('./common/F8PageHeaderButtonsSection.jsx').default)
Telescope.registerComponent('Error404',                         require('./common/Error404.jsx').default)
Telescope.registerComponent('App',                              require('./common/App.js').default)

// header
Telescope.registerComponent('HeaderContent',                    require('./header/HeaderContent.jsx').default)
Telescope.registerComponent('HeaderContentSearchBar',           require('./header/HeaderContentSearchBar.jsx').default)
Telescope.registerComponent('HeaderRightLoginPanel',            require('./header/HeaderRightLoginPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserIconsPanel',        require('./header/HeaderRightUserIconsPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserPanel',             require('./header/HeaderRightUserPanel.jsx').default)

// reviews
Telescope.registerComponent('ReviewsList',                         require('./reviews/page/ReviewsList.jsx').default)
Telescope.registerComponent('ReviewsHeaderView',                   require('./reviews/page/ReviewsHeaderView.jsx').default)
Telescope.registerComponent('ReviewsHeaderSearchBar',              require('./reviews/page/ReviewsHeaderSearchBar.jsx').default)
Telescope.registerComponent('ReviewsHeaderRightSortView',          require('./reviews/page/ReviewsHeaderRightSortView.jsx').default)
Telescope.registerComponent('ReviewsItem',                         require('./reviews/page/ReviewsItem.jsx').default)
Telescope.registerComponent('ReviewsItemButtonsPanel',             require('./reviews/page/ReviewsItemButtonsPanel.jsx').default)

// reviews edit
Telescope.registerComponent('DetailedReview',                          require('./reviews/DetailedReview.jsx').default)
Telescope.registerComponent('IEAEditReviewLayout',                     require('./reviews/IEAEditReviewLayout.jsx').default)

Telescope.registerComponent('EditReviewForm',                          require('./reviews/page/EditReviewForm.jsx').default)

// restaurant
Telescope.registerComponent('IEARestaurantsHome',         require('./home/IEARestaurantsHome.jsx').default)
Telescope.registerComponent('RestaurantsItem',            require('./home/page/RestaurantsItem.jsx').default)
Telescope.registerComponent('RestaurantsListRightMap',    require('./home/page/RestaurantsListRightMap.jsx').default)
Telescope.registerComponent('IEARestaurantsList',         require('./home/page/IEARestaurantsList.jsx').default)
Telescope.registerComponent('RestaurantsLoadMore',        require('./home/page/RestaurantsLoadMore.jsx').default)
Telescope.registerComponent('RestaurantsNoResults',       require('./home/page/RestaurantsNoResults.jsx').default)

// overlayRestaurant
Telescope.registerComponent('DetailedRestaurant',                 require('./overlayrestaurant/DetailedRestaurant.jsx').default)
Telescope.registerComponent('IEARestaurantsLayout',               require('./overlayrestaurant/IEARestaurantsLayout.jsx').default)
Telescope.registerComponent('IEAEditRestaurantLayout',            require('./overlayrestaurant/IEAEditRestaurantLayout.jsx').default)

// overlayRestaurant(page)
Telescope.registerComponent('RestaurantsDetail',                      require('./overlayrestaurant/page/RestaurantsDetail.jsx').default)
Telescope.registerComponent('EditRestaurantForm',                     require('./overlayrestaurant/page/EditRestaurantForm.jsx').default)
Telescope.registerComponent('EventsItem',                             require('./overlayrestaurant/page/EventsItem.jsx').default)
Telescope.registerComponent('EventsList',                             require('./overlayrestaurant/page/EventsList.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeader',                require('./overlayrestaurant/page/RestaurantsSingleHeader.jsx').default)
Telescope.registerComponent('RestaurantsSingleHeaderTopLeftPanel',    require('./overlayrestaurant/page/RestaurantsSingleHeaderTopLeftPanel.jsx').default)


// overlayEvent
Telescope.registerComponent('DetailedEvent',                 require('./overlayevent/DetailedEvent.jsx').default)
Telescope.registerComponent('IEAEventsLayout',               require('./overlayevent/IEAEventsLayout.jsx').default)
Telescope.registerComponent('IEAEditEventLayout',            require('./overlayevent/IEAEditEventLayout.jsx').default)

// overlayEvent(page)
Telescope.registerComponent('EventsDetail',                  require('./overlayevent/page/EventsDetail.jsx').default)
Telescope.registerComponent('EditEventForm',                 require('./overlayevent/page/EditEventForm.jsx').default)
Telescope.registerComponent('EventsSingleHeaderLeftPanel',   require('./overlayevent/page/EventsSingleHeaderLeftPanel.jsx').default)
Telescope.registerComponent('OrderedUserItem',               require('./overlayevent/page/OrderedUserItem.jsx').default)
Telescope.registerComponent('OrderedUserList',               require('./overlayevent/page/OrderedUserList.jsx').default)
Telescope.registerComponent('EventsSingleHeader',            require('./overlayevent/page/EventsSingleHeader.jsx').default)
Telescope.registerComponent('EventsSingleHeaderRightMap',    require('./overlayevent/page/EventsSingleHeaderRightMap.jsx').default)

// overlayOrderedUser
Telescope.registerComponent('OrderedUsers',                              require('./overlayordereduser/OrderedUsers.jsx').default)
Telescope.registerComponent('IEAOrderedUsersLayout',                     require('./overlayordereduser/IEAOrderedUsersLayout.jsx').default)

// overlayOrderedUser(page)
Telescope.registerComponent('OrderedUsersDetail',                        require('./overlayordereduser/page/OrderedUsersDetail.jsx').default)
Telescope.registerComponent('OrderedUsersSingleHeaderLeftPanel',         require('./overlayordereduser/page/OrderedUsersSingleHeaderLeftPanel.jsx').default)
Telescope.registerComponent('OrderedUsersSingleHeader',                  require('./overlayordereduser/page/OrderedUsersSingleHeader.jsx').default)
Telescope.registerComponent('RecipesItem',                               require('./overlayordereduser/page/RecipesItem.jsx').default)
Telescope.registerComponent('RecipesList',                               require('./overlayordereduser/page/RecipesList.jsx').default)

// overlayOrderedRecipe
Telescope.registerComponent('OrderedRecipes',                              require('./overlayorderedrecipe/OrderedRecipes.jsx').default)
Telescope.registerComponent('IEAOrderedRecipesLayout',                     require('./overlayorderedrecipe/IEAOrderedRecipesLayout.jsx').default)
Telescope.registerComponent('IEAEditRecipeLayout',                         require('./overlayorderedrecipe/IEAEditRecipeLayout.jsx').default)

// overlayOrderedRecipe(page)
Telescope.registerComponent('OrderedRecipesDetail',                        require('./overlayorderedrecipe/page/OrderedRecipesDetail.jsx').default)
Telescope.registerComponent('OrderedRecipesSingleHeader',                  require('./overlayorderedrecipe/page/OrderedRecipesSingleHeader.jsx').default)
Telescope.registerComponent('OrderedRecipesSingleHeaderRightPhotos',       require('./overlayorderedrecipe/page/OrderedRecipesSingleHeaderRightPhotos.jsx').default)
Telescope.registerComponent('RecipesSingleHeaderTopLeftPanel',             require('./overlayorderedrecipe/page/RecipesSingleHeaderTopLeftPanel.jsx').default)
Telescope.registerComponent('EditRecipeForm',                              require('./overlayorderedrecipe/page/EditRecipeForm.jsx').default)

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

// playground
Telescope.registerComponent('TcombCommonExample',               require('./playground/tcomb/TcombCommonExample.jsx').default)

// Photos layout
Telescope.registerComponent('IEAPhotosSelectionLayout',               require('./photos/IEAPhotosSelectionLayout.jsx').default)
Telescope.registerComponent('IEAPhotosBrowserLayout',                 require('./photos/IEAPhotosBrowserLayout.jsx').default)
Telescope.registerComponent('IEAPhotosSingleLayout',                  require('./photos/IEAPhotosSingleLayout.jsx').default)

// Photos Browser
Telescope.registerComponent('F8PhotosCollectionView',                 require('./photos/photosbrowser/F8PhotosCollectionView.jsx').default)
Telescope.registerComponent('F8PhotosTitleHeader',                    require('./photos/photosbrowser/F8PhotosTitleHeader.jsx').default)

// Photos Select
Telescope.registerComponent('F8PhotosSelectPage',                       require('./photos/photosselect/F8PhotosSelectPage.jsx').default)

Telescope.registerComponent('F8PhotosSelectLeftPanel',                    require('./photos/photosselect/F8PhotosSelectLeftPanel.jsx').default)
Telescope.registerComponent('F8PhotosSelectLeftPanelFooterView',          require('./photos/photosselect/F8PhotosSelectLeftPanelFooterView.jsx').default)
Telescope.registerComponent('F8PhotosSelectRightPanel',                   require('./photos/photosselect/F8PhotosSelectRightPanel.jsx').default)
Telescope.registerComponent('F8PhotosSelectNavigatorBar',                 require('./photos/photosselect/F8PhotosSelectNavigatorBar.jsx').default)

// Photos Single
Telescope.registerComponent('F8PhotosSingleTop',                      require('./photos/photossingle/F8PhotosSingleTop.jsx').default)

export default Telescope
