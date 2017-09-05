'use strict'

import {adjustRouterQuery} from '../lib/link'

export default class PhotoBrowser {
  onPreIconClick() {
    const {selectPhotoIndex} = this.state;

    let preIndex = selectPhotoIndex - 1;
    if (preIndex < 0) preIndex = 0;

    this.setState({selectPhotoIndex: preIndex})

    this._pushNewRouter(preIndex)
  }

  _pushNewRouter(index) {
    const {photosListTask} = this.state;
    const photos = photosListTask.results;

    const pathname = this.props.location.pathname;
    const lastQuery = this.props.location.query;
    const newQuery = {select: photos[index].id};

    this.props.router.push({
      pathname,
      query: Object.assign({}, lastQuery, newQuery)
    })
  }

  onNextIconClick() {
    const {photosListTask, selectPhotoIndex} = this.state;
    const photos = photosListTask.results;
    const totalPhotosLength = photos.length;

    let nextIndex = selectPhotoIndex + 1;
    if (nextIndex >= totalPhotosLength) nextIndex = totalPhotosLength - 1;
    this.setState({selectPhotoIndex: nextIndex})

    this._pushNewRouter(nextIndex)
  }


}
