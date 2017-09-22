'use strict'


function _pushNewRouter(index, {location, router}, {photosListTask}) {
  const photos = photosListTask.results;

  const {pathname} = location;
  const lastQuery = location.query;
  const newQuery = {select: photos[index].id};

  router.push({
    pathname,
    query: Object.assign({}, lastQuery, newQuery)
  })
}

export default class PhotoBrowser {
  onPreIconClick() {
    const {selectPhotoIndex} = this.state;

    let preIndex = selectPhotoIndex - 1;
    if (preIndex < 0) preIndex = 0;

    this.setState({selectPhotoIndex: preIndex})

    _pushNewRouter(preIndex, this.props, this.state)
  }


  onNextIconClick() {
    const {photosListTask, selectPhotoIndex} = this.state;
    const photos = photosListTask.results;
    const totalPhotosLength = photos.length;

    let nextIndex = selectPhotoIndex + 1;
    if (nextIndex >= totalPhotosLength) nextIndex = totalPhotosLength - 1;
    this.setState({selectPhotoIndex: nextIndex})

    _pushNewRouter(nextIndex, this.props, this.state)
  }


}
