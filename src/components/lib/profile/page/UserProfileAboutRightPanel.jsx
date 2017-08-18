import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

class UserProfileAboutRightPanel extends Component {

  renderRating() {

    const rating = {
      5: 232,
      4: 244,
      3: 122,
      2: 80,
      1: 10
    }

    const ratingRows = [
      {tag: 5, width: '95%'},
      {tag: 4, width: '69%'},
      {tag: 3, width: '42%'},
      {tag: 2, width: '20%'},
      {tag: 1, width: '10%'},
    ]

    return (
      <div className="ysection">
        <h4>Rating Distribution</h4>
        <table className="histogram histogram--alternating">
          <tbody>
          {ratingRows.map((row, index) => {
            return (
              <tr key={index} className={`histogram_row histogram_row--${index + 1}`}>
                <th scope="row" className="histogram_label nowrap">
                  {`${row.tag} stars`}
                </th>
                <td>
                  <table>
                    <tbody>
                    <tr>
                      <td style={{width: row.width}}>
                        <div className="histogram_bar"/>
                      </td>
                      <td className="histogram_count">{rating[row.tag]}</td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )
          })}

          </tbody>
        </table>
      </div>
    )
  }

  renderReviewRating() {

    const reviewRating = {
      'Useful': 232,
      'Funny': 244,
      'Cool': 122,
    }

    const reviewRatingRows = [
      {
        tag: 'Useful',
        svg: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"
      },
      {
        tag: 'Funny',
        svg: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12a4.87 4.87 0 0 1-4.787-4h9.574A4.87 4.87 0 0 1 9 14zm2.5-5.625a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75zm-5 0a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75z"
      },
      {
        tag: 'Cool',
        svg: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm6.026 5.335C14.766 8.797 13.5 10 11.986 10h-.003c-1.218 0-2.282-.764-2.767-1.813-.088-.19-.344-.242-.432-.052C8.3 9.185 7.234 10 6.016 10h-.003C4.5 10 3.195 8.83 2.973 7.35l-.093-.84c-.053-.242.192-.51.477-.51h11.286c.294 0 .508.332.477.56l-.094.775zm-2.068 4.154A4.28 4.28 0 0 1 9 14.144a4.28 4.28 0 0 1-3.958-2.657A6.81 6.81 0 0 0 9 12.753a6.81 6.81 0 0 0 3.958-1.265z"
      },
    ]

    return (
      <div className="ysection">
        <h4>Review Votes</h4>
        <ul className="ylist ylist--condensed">
          {reviewRatingRows.map((row, index) => {
            return (
              <li key={index}>
                <span
                  id="icon_18X18"
                  className={`icon icon--18-${row.tag.toLowerCase()}-outline icon--size-18 u-space-r1`}>
    <svg className="icon_svg">
    <path d={row.svg}/>
    </svg>
</span>{row.tag}
                <strong className="margin-left-6">{reviewRating[row.tag]}</strong>
              </li>
            )
          })}
        </ul>

      </div>

    )
  }

  renderUserState() {

    const userState = {
      'Events': 232,
      'Recipes': 244,
      'Reviews': 122,
    }

    const userStateRows = [
      {
        tag: 'Events',
        svg: "M13.6 16H4.4C3.077 16 2 14.88 2 13.5v-9C2 3.12 3.077 2 4.4 2H5a1 1 0 0 1 2 0h4a1 1 0 0 1 2 0h.6C14.923 2 16 3.12 16 4.5v9c0 1.38-1.077 2.5-2.4 2.5zM15 7H3v6.5c0 .828.627 1.5 1.4 1.5h9.2c.773 0 1.4-.672 1.4-1.5V7zm-4.825 5.48l-.425.627L9 14.214l-.75-1.107-.425-.627A2.49 2.49 0 0 1 9 7.786a2.49 2.49 0 0 1 1.175 4.694zM9 9.214a1.07 1.07 0 1 0 0 2.142 1.07 1.07 0 0 0 0-2.142z"
      },
      {
        tag: 'Recipes',
        svg: "M13.61 17h-.007a1.39 1.39 0 0 1-1.376-1.587L13 10l-2-1c0-5.373 1.375-8 3.25-8 .497 0 .75.336.75.75v13.86A1.39 1.39 0 0 1 13.61 17zM6.557 9.912l.35 5.59a1.41 1.41 0 1 1-2.813 0l.35-5.59A1.994 1.994 0 0 1 3 8V1.5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0V8c0 .91-.61 1.67-1.443 1.912z"
      },
      {
        tag: 'Reviews',
        svg: "M16.08 5.63c-1.045-.16-2.05-.215-2.918-.127.797.145 1.63.5 2.504.948a7.144 7.144 0 0 1-.11.19c-1.594-.223-3.12-.284-4.455-.15 1.2.22 2.44.678 3.735 1.258-1.903 2.582-5.284 4.92-10.975 4.526C7.405 8.18 12.16 4.7 15.486 2.606c-4.132 1.178-9.278 4.96-12.202 8.8.47-4.812 3.428-7.27 6.572-8.486-.083.86-.215 1.672-.438 2.42.528-.8 1.007-1.74 1.426-2.765.217-.066.433-.127.65-.184-.03.577-.1 1.117-.245 1.6a10 10 0 0 0 .89-1.754c1.94-.427 3.736-.475 4.82-.415.136.444-.06 2.016-.88 3.81zM3.857 12.273C2.767 13.533 1.785 14.847 1 16.2c.173-1.472 1.023-3.138 2.284-4.794a13.28 13.28 0 0 0-.056.82c.215.02.42.03.63.046z"
      },
    ]


    return (
      <div className="ysection">
        <h4>Stats</h4>
        <ul className="ylist ylist--condensed">

          {userStateRows.map((row, index) => {
            return (
              <li>
                <span id="icon_18X18" className="icon icon--18-light-bulb icon--size-18 u-space-r1">
                   <svg className="icon_svg">
                        <path d={row.svg}/>
                   </svg>
                </span>
                {row.tag}
                <strong className="margin-left-6">{userState[row.tag]}</strong>
              </li>
            )
          })}
        </ul>

      </div>

    )
  }

  render() {
    const {currentUser} = this.props;
    return (
      <div className="user-details-overview_sidebar">

        <h3>{`About ${currentUser.username}`}</h3>
        {this.renderRating()}

        {this.renderReviewRating()}

        {this.renderUserState()}

        <div className="ysection">
          <ul className="ylist">
            <li>
              <h4>Account Since</h4>
              <p>{Users.getCreatedAtFormat(currentUser)}</p>
            </li>

          </ul>

        </div>

      </div>
    )
  }
}

export default UserProfileAboutRightPanel;
