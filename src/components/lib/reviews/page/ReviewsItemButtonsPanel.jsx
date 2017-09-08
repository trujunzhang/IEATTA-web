import Telescope from '../../index'
import React, {Component} from 'react';
import {withRouter} from 'react-router'

export class ReviewsItemButtonsPanel extends Component {
  render() {
    return (
      <div className="review-footer clearfix">
        <div className="rateReview voting-feedback">
          <p className="voting-intro voting-prompt">
            {"Was this review …?"}
          </p>
          <ul className="voting-buttons">

            <li className="vote-item inline-block">

              <a className="ybtn ybtn--small useful js-analytics-click"
                 rel="useful">
            <span
              id="review_item_footer_buttons_panel_span"
              className="icon icon--18-useful-outline icon--size-18 icon--active-inverse button-content u-space-r-half">
               <svg className="icon_svg">
                   <path
                     d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"/>
               </svg>
             </span>
                <span className="vote-type">Useful</span>
                <span className="count">1</span>
              </a>
            </li>


            <li className="vote-item inline-block">

              <a className="ybtn ybtn--small funny js-analytics-click"
                 rel="funny">
            <span
              id="review_item_footer_buttons_panel_span"
              className="icon icon--18-funny-outline icon--size-18 icon--active-inverse button-content u-space-r-half">
                <svg className="icon_svg">
                  <path
                    d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12a4.87 4.87 0 0 1-4.787-4h9.574A4.87 4.87 0 0 1 9 14zm2.5-5.625a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75zm-5 0a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75z"/>
                </svg>
               </span>
                <span className="vote-type">Funny</span>
                <span className="count"></span>
              </a>
            </li>


            <li className="vote-item inline-block">

              <a className="ybtn ybtn--small cool js-analytics-click"
                 rel="cool">
            <span
              id="review_item_footer_buttons_panel_span"
              className="icon icon--18-cool-outline icon--size-18 icon--active-inverse button-content u-space-r-half">
                <svg className="icon_svg">
                  <path
                     d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm6.026 5.335C14.766 8.797 13.5 10 11.986 10h-.003c-1.218 0-2.282-.764-2.767-1.813-.088-.19-.344-.242-.432-.052C8.3 9.185 7.234 10 6.016 10h-.003C4.5 10 3.195 8.83 2.973 7.35l-.093-.84c-.053-.242.192-.51.477-.51h11.286c.294 0 .508.332.477.56l-.094.775zm-2.068 4.154A4.28 4.28 0 0 1 9 14.144a4.28 4.28 0 0 1-3.958-2.657A6.81 6.81 0 0 0 9 12.753a6.81 6.81 0 0 0 3.958-1.265z"/>
                </svg>
              </span>
                <span className="vote-type">Cool</span>
                <span className="count"></span>
              </a>
            </li>

          </ul>

        </div>

      </div>


    )
  }
}


export default ReviewsItemButtonsPanel;
