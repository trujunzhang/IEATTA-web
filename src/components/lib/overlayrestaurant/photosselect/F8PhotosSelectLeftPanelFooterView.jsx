import React, {Component} from 'react';

class F8PhotosSelectLeftPanelFooterView extends Component {
  render() {
    const {photos} = this.props;

    return (
      <div className="media-footer photo-box-overlay">
        <ul className="media-footer_inner">
          <li>
            <a href="/biz_photos/roma-antica-san-francisco-3"
               className="media-nav_link--browse-all">
            <span
              id="icon_18X18"
              className="icon icon--18-grid icon--size-18 icon--inverse icon--fallback-inverted u-space-r-half">
    <svg className="icon_svg">
    <path d="M10 15v-5h5v5h-5zm0-12h5v5h-5V3zm-7 7h5v5H3v-5zm0-7h5v5H3V3z"/>
    </svg>
</span>Browse all
            </a>

          </li>
          <li className="media-footer_count">
                      <span className="media-count js-media-count"><span
                        className="media-count_current">2</span> of <span
                        className="media-count_total">21</span></span>

          </li>
          <li className="media-footer_actions">
            <ul className="media-actions">

              <li>
                <a className="photo-box_action-link send-to-friend"
                   data-pop-uri="/send_to_friend/biz_photo/fNoqHpp82jyhATSelcwgGA" href="javascript:;">
                    <span
                      id="icon_18X18"
                      className="icon icon--18-share icon--size-18 icon--currentColor u-space-r1">
    <svg className="icon_svg">

    <path
      d="M17.714 6.43L13 10.356v-3.03c-1 0-5.097 1.47-6.286 3.62.274-3.08 4.286-5.5 6.286-5.5V2.5l4.714 3.93zM3 4v10h11v-2.5l1-1V15H2V3h8.5l-1 1H3z"/>
    </svg>
</span>Share
                </a>
              </li>

              <li>
                <a className="photo-box_action-link send-compliment js-analytics-click"
                   data-analytics-label="compliment-send"
                   href="/thanx?complimentable_id=fNoqHpp82jyhATSelcwgGA&amp;complimentable_type=BIZ_PHOTO&amp;page_origin=biz_photos_new_flow&amp;previous_url=%2Fbiz_photos%2Froma-antica-san-francisco-3%3Fselect%3DfNoqHpp82jyhATSelcwgGA&amp;type=photos&amp;user_id=WALNtcSZlONK4Yj-o3pzKA">
                    <span
                      id="icon_18X18"
                      className="icon icon--18-compliment icon--size-18 icon--currentColor u-space-r1">
    <svg className="icon_svg">
    <path
      d="M14.5 6.75a5.5 5.5 0 0 0-11 0 5.495 5.495 0 0 0 2.993 4.892L5.5 16.75l3.505-2 3.495 2-.993-5.108A5.495 5.495 0 0 0 14.5 6.75zm-5.5 4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
    </svg>
</span>Compliment
                </a>
              </li>

              <li>
                <a className="photo-box_action-link js-flag-button test-flag-action-link show-tooltip"
                   data-pop-uri="/flag_content?flag_id=fNoqHpp82jyhATSelcwgGA&amp;flag_type=business_photo&amp;previous_url=%2Fbiz_photos%2Froma-antica-san-francisco-3%3Fselect%3DfNoqHpp82jyhATSelcwgGA"
                   href="/flag_content?flag_id=fNoqHpp82jyhATSelcwgGA&amp;flag_type=business_photo&amp;previous_url=%2Fbiz_photos%2Froma-antica-san-francisco-3%3Fselect%3DfNoqHpp82jyhATSelcwgGA">
        <span
          id="icon_18X18"
          className="icon icon--18-flag icon--size-18 icon--inverse icon--fallback-inverted">
    <svg className="icon_svg">
    <path d="M6 10V3c4.976 1.098 4.024-1 8 0v7c-4.024-.976-3.024 1.024-8 0zM4 2h1v14H4V2z"/>
    </svg>
</span>
                  <span className="tooltip-wrapper tooltip-wrapper--right">
            <span className="tooltip">
                    Report Photo
            </span>
        </span>
                </a>

              </li>
            </ul>
          </li>
        </ul>
      </div>

    );
  }
}


export default F8PhotosSelectLeftPanelFooterView;
