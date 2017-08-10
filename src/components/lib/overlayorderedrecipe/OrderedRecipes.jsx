import Telescope from '../../lib'
import React, {Component} from 'react'

import {withRouter} from 'react-router'

const {
  loadOrderedRecipePage,
  loadPhotosBrowser
} = require('../../../actions').default

const {
  PAGE_MAIN_FORM,
  PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY,
  PAGE_PHOTOS_BROWSER_FORM,
  PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY,
  PAGE_EDIT_FORM,
  PAGE_OVERLAY_SELECTED_PHOTO_FORM,
  PAGE_SINGLE_SELECTED_PHOTO_FORM,
} = require('../../../lib/constants').default


const {
  getModelByObjectId,
  getDefaultListTask,
  byListId
} = require('../../filter/filterPosts')

const {
  getPageFormType,
  getSelectPhoto,
  checkEdit,
  checkPhotosBrowser,
  checkPhotosBrowserSelection
} = require('../../filter/filterRoutes')


class OrderedRecipes extends Component {
  constructor(props, context) {
    super(props)


    const photoTerms = {
      listId: 'photos-list-view-for-restaurants-' + props.params.oid,
      forObjectId: props.params.oid,
      photoType: 'recipe',
      allItems: true
    }


    this.state = this.initialState = {
      oid: props.params.oid,
      oslug: props.params.oslug,
      // Detailed object
      recipe: null,
      forObject: null,
      // photos
      photosListTask: getDefaultListTask(photoTerms),
      photos: null,
      pageForm: getPageFormType('recipe',props, null),
      photosTerms: photoTerms,
      photoType: 'recipe',
      onPreIconClick: this.onPreIconClick.bind(this),
      onNextIconClick: this.onNextIconClick.bind(this),
      selectPhotoIndex: -1
    }
  }

  componentWillReceiveProps(nextProps) {
    const photosListTask = byListId(nextProps.listContainerTasks, this.state.photosTerms, this.state.photosListTask);

    this.setState({
      // Detailed object
      recipe: getModelByObjectId(nextProps, this.state.oid, this.state.recipe),
      forObject: getModelByObjectId(nextProps, this.state.oid, this.state.forObject),
      // photos
      photosListTask: photosListTask,
      photos: photosListTask.results,
      pageForm: getPageFormType('recipe',nextProps, this.state.pageForm),
      selectPhotoIndex: getSelectPhoto(nextProps, photosListTask, this.state.selectPhotoIndex)
    })

    const currentOID = nextProps.params.oid;
    if (currentOID !== this.state.oid) {

      this.setState({
        oid: nextProps.params.oid,
        oslug: nextProps.params.oslug,
      })

      nextProps.dispatch(loadOrderedRecipePage(currentOID))
    }

  }

  componentDidMount() {
    this.props.dispatch(loadOrderedRecipePage(this.state.oid))
    this.props.dispatch(loadPhotosBrowser(this.state.photosTerms))
  }

  render() {
    const {photos, recipe, pageForm, selectPhotoIndex} = this.state;

    if (!!recipe && !!photos) {

      debugger

      switch (pageForm) {
        case PAGE_SINGLE_SELECTED_PHOTO_FORM:
          return (<Telescope.components.IEAPhotosSingleLayout {...this.state}/>)
        case PAGE_MAIN_FORM:
          return (
            (<Telescope.components.IEAOrderedRecipesLayout {...this.state} />)
          )
        case PAGE_MAIN_FORM_WITH_PHOTO_OVERLAY:
          return (<div>
              <Telescope.components.IEAOrderedRecipesLayout {...this.state}/>
              <Telescope.components.IEAPhotosSelectionLayout
                {...this.state}/>
            </div>
          )
        case PAGE_PHOTOS_BROWSER_FORM:
          return (<Telescope.components.IEAPhotosBrowserLayout {...this.state}/>)
        case PAGE_PHOTOS_BROWSER_FORM_WITH_PHOTO_OVERLAY:
          return (<div>
              <Telescope.components.IEAPhotosBrowserLayout {...this.state}/>
              <Telescope.components.IEAPhotosSelectionLayout {...this.state}/>
            </div>
          )
      }
    }

    return (
      <div className="placeholder_1WOC3">
        <div className="loader_54XfI animationRotate loader_OEQVm"/>
      </div>
    )
  }

  onPreIconClick() {
    const {photos, restaurant, pageForm, selectPhotoIndex} = this.state;
    const totalPhotosLength = photos.length;

    let preIndex = selectPhotoIndex - 1;
    if (preIndex < 0) preIndex = 0;
    this.setState({selectPhotoIndex: preIndex})

    this.props.router.push({pathname: this.porps.location.pathname, query: {select: photos[preIndex].id}})
  }

  onNextIconClick() {
    const {photos, selectPhotoIndex} = this.state;
    const totalPhotosLength = photos.length;

    let nextIndex = selectPhotoIndex + 1;
    if (nextIndex >= totalPhotosLength) nextIndex = totalPhotosLength - 1;
    this.setState({selectPhotoIndex: nextIndex})

    this.props.router.push({pathname: this.props.location.pathname, query: {select: photos[nextIndex].id}})
  }

}

const {connect} = require('react-redux')

function select(store) {
  return {
    detailedModelsOverlay: store.detailedModelsOverlay,
    listContainerTasks: store.listContainerTasks
  }
}

export default withRouter(connect(select)(OrderedRecipes));

