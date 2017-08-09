import Telescope from '../../../lib'
import React, {Component} from 'react';

class F8PhotosSelectNavigatorBar extends Component {
  render() {
    const {photos} = this.props;

    return (
      <div className="media-nav js-media-nav" data-component-bound="true">
        <a
          className="media-nav_link media-nav_link--prev js-media-nav_link--prev is-hovered"
          href="/biz_photos/roma-antica-san-francisco-3?select=x57_yoZarQuIn9y1r2jsQw" title="Prev">
            <span
              id="icon_48X48"
              className="icon icon--48-chevron-left icon--size-48 icon--inverse icon--fallback-inverted">
    <svg className="icon_svg">
    <path
      d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"/>
    </svg>
</span>
        </a>


        <a className="media-nav_link media-nav_link--next js-media-nav_link--next"
           href="/biz_photos/roma-antica-san-francisco-3?select=k_pkaj9TkIRUQTGyPCrS4A" title="Next">
            <span
              id="icon_48X48"
              className="icon icon--48-chevron-right icon--size-48 icon--inverse icon--fallback-inverted">
    <svg className="icon_svg">
    <path
      d="M18.586 42.008a2.518 2.518 0 0 1-1.614-.588c-1.115-.925-1.296-2.613-.404-3.77L27.098 24l-10.53-13.65c-.892-1.156-.71-2.844.404-3.77 1.116-.924 2.743-.737 3.635.42L32.43 22.325a2.76 2.76 0 0 1 0 3.35L20.606 41.002a2.548 2.548 0 0 1-2.02 1.008z"/>
    </svg>
</span>
        </a>

      </div>



    );
  }
}


export default F8PhotosSelectNavigatorBar;
