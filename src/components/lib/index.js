import Telescope from './config'


// extensions
Telescope.registerComponent('AvatarBlurryImage',                require('./extensions/AvatarBlurryImage.jsx').default)
Telescope.registerComponent('BlurryImage',                      require('./extensions/BlurryImage.jsx').default)
Telescope.registerComponent('MailTo',                           require('./extensions/MailTo.jsx').default)
Telescope.registerComponent('UsersBlurryImageAvatar',           require('./extensions/UsersBlurryImageAvatar.jsx').default)

// common
Telescope.registerComponent('Layout',                                 require('./applayout/Layout.jsx').default)
Telescope.registerComponent('AppFooter',                              require('./applayout/AppFooter.jsx').default)
Telescope.registerComponent('F8StarIcon',                             require('./common/F8StarIcon.jsx').default)
Telescope.registerComponent('F8SingleHeaderRightPhotos',              require('./common/F8SingleHeaderRightPhotos.jsx').default)
Telescope.registerComponent('F8SingleHeaderRightPhotosSingleModel',   require('./common/F8SingleHeaderRightPhotosSingleModel.jsx').default)
Telescope.registerComponent('F8SingleHeaderRightPhotosScrollModel',   require('./common/F8SingleHeaderRightPhotosScrollModel.jsx').default)
Telescope.registerComponent('F8SingleHeaderRightPhotoItem',           require('./common/F8SingleHeaderRightPhotoItem.jsx').default)
Telescope.registerComponent('F8RestaurantMapSection',                 require('./common/F8RestaurantMapSection.jsx').default)
Telescope.registerComponent('F8UserAvatorSection',                    require('./common/F8UserAvatorSection.jsx').default)
Telescope.registerComponent('F8LoadingView',                          require('./common/F8LoadingView.jsx').default)
Telescope.registerComponent('F8EmptySection',                         require('./common/F8EmptySection.jsx').default)
Telescope.registerComponent('F8CalenderView',                         require('./common/F8CalenderView.jsx').default)
Telescope.registerComponent('F8AppAlertSection',                      require('./common/F8AppAlertSection.jsx').default)
Telescope.registerComponent('F8PlaceHolderImage',                     require('./common/F8PlaceHolderImage.jsx').default)
Telescope.registerComponent('F8SectionHeaderTitle',                   require('./common/F8SectionHeaderTitle.jsx').default)
Telescope.registerComponent('F8SinglePageTopHeader',                  require('./common/F8SinglePageTopHeader.jsx').default)
Telescope.registerComponent('F8SinglePageHeaderTopLeftPanel',         require('./common/F8SinglePageHeaderTopLeftPanel.jsx').default)
Telescope.registerComponent('F8SinglePageHeaderButtonsSection',       require('./common/F8SinglePageHeaderButtonsSection.jsx').default)
Telescope.registerComponent('Error404',                               require('./common/Error404.jsx').default)

// header(app)
Telescope.registerComponent('HeaderContent',                    require('./applayout/appheader/HeaderContent.jsx').default)
Telescope.registerComponent('HeaderContentSearchBar',           require('./applayout/appheader/HeaderContentSearchBar.jsx').default)
Telescope.registerComponent('HeaderRightLoginPanel',            require('./applayout/appheader/HeaderRightLoginPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserIconsPanel',        require('./applayout/appheader/HeaderRightUserIconsPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserPanel',             require('./applayout/appheader/HeaderRightUserPanel.jsx').default)
Telescope.registerComponent('HeaderRightUserPopOverlay',        require('./applayout/appheader/HeaderRightUserPopOverlay.jsx').default)

// header(login)
Telescope.registerComponent('LoginHeaderContent',               require('./applayout/loginheader/LoginHeaderContent.jsx').default)

// reviews
Telescope.registerComponent('ReviewsList',                         require('./reviews/page/ReviewsList.jsx').default)
Telescope.registerComponent('ReviewsHeaderView',                   require('./reviews/page/ReviewsHeaderView.jsx').default)
Telescope.registerComponent('ReviewsHeaderSearchBar',              require('./reviews/page/ReviewsHeaderSearchBar.jsx').default)
Telescope.registerComponent('ReviewsHeaderRightSortView',          require('./reviews/page/ReviewsHeaderRightSortView.jsx').default)
Telescope.registerComponent('ReviewsItem',                         require('./reviews/page/ReviewsItem.jsx').default)
Telescope.registerComponent('ReviewsItemForUserProfile',           require('./reviews/page/ReviewsItemForUserProfile.jsx').default)
Telescope.registerComponent('ReviewsItemButtonsPanel',             require('./reviews/page/ReviewsItemButtonsPanel.jsx').default)
Telescope.registerComponent('EditReviewForm',                      require('./reviews/page/EditReviewForm.jsx').default)
Telescope.registerComponent('EditReviewTopRestaurant',             require('./reviews/page/EditReviewTopRestaurant.jsx').default)
Telescope.registerComponent('EditReviewTopRecipe',                 require('./reviews/page/EditReviewTopRecipe.jsx').default)
Telescope.registerComponent('EditReviewTopEvent',                  require('./reviews/page/EditReviewTopEvent.jsx').default)

// reviews edit
Telescope.registerComponent('DetailedReview',                          require('./reviews/DetailedReview.jsx').default)
Telescope.registerComponent('IEAEditReviewLayout',                     require('./reviews/IEAEditReviewLayout.jsx').default)

// reviews list
Telescope.registerComponent('IEAReviewsListLayout',                          require('./reviews/IEAReviewsListLayout.jsx').default)

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
Telescope.registerComponent('RestaurantsFixMapMarker',                require('./overlayrestaurant/page/RestaurantsFixMapMarker.jsx').default)


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
Telescope.registerComponent('OrderedUsersLeftPanel',                     require('./overlayordereduser/page/OrderedUsersLeftPanel.jsx').default)
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
Telescope.registerComponent('EditRecipeForm',                              require('./overlayorderedrecipe/page/EditRecipeForm.jsx').default)

// profile
Telescope.registerComponent('IEAUserProfileAboutLayout',           require('./profile/IEAUserProfileAboutLayout.jsx').default)
Telescope.registerComponent('UsersSingle',                         require('./profile/UsersSingle.jsx').default)

// profile(page)
Telescope.registerComponent('UserProfileSingleHeader',             require('./profile/page/UserProfileSingleHeader.jsx').default)
Telescope.registerComponent('UserProfileLeftMenusPanel',           require('./profile/page/UserProfileLeftMenusPanel.jsx').default)
Telescope.registerComponent('UserProfileAboutRightPanel',          require('./profile/page/UserProfileAboutRightPanel.jsx').default)
Telescope.registerComponent('EditUserForm',                        require('./profile/edit/EditUserForm.jsx').default)
Telescope.registerComponent('EditUserProfilePhoto',                require('./profile/edit/EditUserProfilePhoto.jsx').default)

// profile(menus)
Telescope.registerComponent('IEAUserProfilePhotosLayout',           require('./profile/IEAUserProfilePhotosLayout.jsx').default)
Telescope.registerComponent('IEAUserProfileEventsLayout',           require('./profile/IEAUserProfileEventsLayout.jsx').default)

// Logged user edit form
Telescope.registerComponent('IEAEditUserLayout',                  require('./profile/IEAEditUserLayout.jsx').default)

// app login
Telescope.registerComponent('UserLogOut',                     require('./login/UserLogOut.jsx').default)
Telescope.registerComponent('UserEmailSignIn',                require('./login/UserEmailSignIn.jsx').default)
Telescope.registerComponent('UserEmailSignUp',                require('./login/UserEmailSignUp.jsx').default)
Telescope.registerComponent('UserLoginMain',                  require('./login/UserLoginMain.jsx').default)
Telescope.registerComponent('UsersRemovedAccount',            require('./login/UsersRemovedAccount.jsx').default)
Telescope.registerComponent('UsersResetPassword',             require('./login/UsersResetPassword.jsx').default)
Telescope.registerComponent('UsersVerifyEmail',               require('./login/UsersVerifyEmail.jsx').default)

Telescope.registerComponent('LoginForm',                      require('./login/LoginForm.jsx').default)
Telescope.registerComponent('LoginRender',                    require('./login/LoginRender.jsx').default)

// playground
Telescope.registerComponent('TcombCommonExample',               require('./playground/tcomb/TcombCommonExample.jsx').default)

// Photos layout
Telescope.registerComponent('IEAPhotosSelectionLayout',               require('./photos/IEAPhotosSelectionLayout.jsx').default)
Telescope.registerComponent('IEAPhotosBrowserLayout',                 require('./photos/IEAPhotosBrowserLayout.jsx').default)
Telescope.registerComponent('IEAPhotosSingleLayout',                  require('./photos/IEAPhotosSingleLayout.jsx').default)

// Add Photo
Telescope.registerComponent('AddPhotoForModel',                       require('./photos/AddPhotoForModel.jsx').default)
Telescope.registerComponent('IEAAddPhotosLayout',                     require('./photos/IEAAddPhotosLayout.jsx').default)
Telescope.registerComponent('IEAAddPhotosForm',                       require('./photos/add/IEAAddPhotosForm.jsx').default)
Telescope.registerComponent('IEAAddPhotosTop',                        require('./photos/add/IEAAddPhotosTop.jsx').default)


// Photos Browser
Telescope.registerComponent('F8PhotosCollectionView',                 require('./photos/photosbrowser/F8PhotosCollectionView.jsx').default)
Telescope.registerComponent('F8PhotosTitleHeader',                    require('./photos/photosbrowser/F8PhotosTitleHeader.jsx').default)
Telescope.registerComponent('F8PhotosLoggedUserTitleHeader',          require('./photos/photosbrowser/F8PhotosLoggedUserTitleHeader.jsx').default)

// Photos Select
Telescope.registerComponent('F8PhotosSelectPage',                       require('./photos/photosselect/F8PhotosSelectPage.jsx').default)

Telescope.registerComponent('F8PhotosSelectLeftPanel',                    require('./photos/photosselect/F8PhotosSelectLeftPanel.jsx').default)
Telescope.registerComponent('F8PhotosSelectLeftPanelFooterView',          require('./photos/photosselect/F8PhotosSelectLeftPanelFooterView.jsx').default)
Telescope.registerComponent('F8PhotosSelectRightPanel',                   require('./photos/photosselect/F8PhotosSelectRightPanel.jsx').default)
Telescope.registerComponent('F8PhotosContentWithNavBar',                  require('./photos/photosselect/F8PhotosContentWithNavBar.jsx').default)

// Photos Single
Telescope.registerComponent('F8PhotosSingleTop',                      require('./photos/photossingle/F8PhotosSingleTop.jsx').default)

// leaflet
Telescope.registerComponent('MarkerClusterGroup',                      require('./react-leaflet-markercluster/react-leaflet-markercluster.jsx').default)
Telescope.registerComponent('ExtendedMarker',                          require('./react-leaflet-markercluster/ExtendedMarker.jsx').default)


export default Telescope
