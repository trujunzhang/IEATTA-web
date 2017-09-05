import Telescope from '../../index'
import React, {Component} from 'react';

class F8PhotosContentWithNavBar extends Component {


  renderPreIcon() {
    const {selectPhotoIndex} = this.props;
    const havePreIcon = (selectPhotoIndex > 0)
    const preClass = 'media-nav_link media-nav_link--prev js-media-nav_link--prev ' + (havePreIcon ? "" : " is-disabled")
    const linkProps = (havePreIcon) ? {onClick: this.props.onPreIconClick} : {};

    return (
      <a {...linkProps} className={preClass} title="Prev">
            <span id="icon_48X48"
                  className="icon icon--48-chevron-left icon--size-48 icon--inverse icon--fallback-inverted">
             <svg className="icon_svg">
                  <path
                    d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"/>
           </svg>
          </span>
      </a>

    )
  }

  renderNextIcon() {
    const {photosListTask, selectPhotoIndex} = this.props;
    const photos = photosListTask.results;
    const haveNextIcon = (selectPhotoIndex < photos.length - 1)
    const nextClass = 'media-nav_link media-nav_link--next js-media-nav_link--next ' + (haveNextIcon ? "" : " is-disabled")
    const linkProps = (haveNextIcon) ? {onClick: this.props.onNextIconClick} : {};

    return (
      <a {...linkProps} className={nextClass} title="Next">
            <span id="icon_48X48"
                  className="icon icon--48-chevron-right icon--size-48 icon--inverse icon--fallback-inverted">
            <svg className="icon_svg">
                <path
                  d="M18.586 42.008a2.518 2.518 0 0 1-1.614-.588c-1.115-.925-1.296-2.613-.404-3.77L27.098 24l-10.53-13.65c-.892-1.156-.71-2.844.404-3.77 1.116-.924 2.743-.737 3.635.42L32.43 22.325a2.76 2.76 0 0 1 0 3.35L20.606 41.002a2.548 2.548 0 0 1-2.02 1.008z"/>
            </svg>
            </span>
      </a>

    )
  }


  render() {
    const {contentClass} = this.props;
    return (
      <div className={contentClass}>

        <div className="media-container js-media-container">

          <div className="media-details-grid">

            <Telescope.components.F8PhotosSelectLeftPanel {...this.props}/>
            {/*{01-left-panel.html}*/}

            <Telescope.components.F8PhotosSelectRightPanel {...this.props}/>
            {/*{02-right-panel.html}*/}

          </div>

        </div>


        <div className="media-nav js-media-nav">
          {this.renderPreIcon()}
          {this.renderNextIcon()}
        </div>
        {/*{03-left-right-navigator.html}*/}

      </div>
    )
  }

}

export default F8PhotosContentWithNavBar;
