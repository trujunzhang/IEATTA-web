import Telescope from '../../../lib'
import React, {Component} from 'react'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

/**
 * User's recent activity:
 * 1. created recipes.
 * 2. created events.
 * 3. created restaurant.
 *
 */
class UserProfileRecentActivityPanel extends Component {

  renderRating() {
    const {userStatistic} = this.props;

    const ratingRows = [
      {tag: 5, width: '95%', value: userStatistic.fiveStars},
      {tag: 4, width: '69%', value: userStatistic.fourStars},
      {tag: 3, width: '42%', value: userStatistic.threeStars},
      {tag: 2, width: '20%', value: userStatistic.twoStars},
      {tag: 1, width: '10%', value: userStatistic.oneStars},
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
                      <td className="histogram_count">{row.value}</td>
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

  renderUserState() {
    const {userStatistic} = this.props;

    const userStateRows = [
      {
        tag: 'Events',
        svg: "M13.6 16H4.4C3.077 16 2 14.88 2 13.5v-9C2 3.12 3.077 2 4.4 2H5a1 1 0 0 1 2 0h4a1 1 0 0 1 2 0h.6C14.923 2 16 3.12 16 4.5v9c0 1.38-1.077 2.5-2.4 2.5zM15 7H3v6.5c0 .828.627 1.5 1.4 1.5h9.2c.773 0 1.4-.672 1.4-1.5V7zm-4.825 5.48l-.425.627L9 14.214l-.75-1.107-.425-.627A2.49 2.49 0 0 1 9 7.786a2.49 2.49 0 0 1 1.175 4.694zM9 9.214a1.07 1.07 0 1 0 0 2.142 1.07 1.07 0 0 0 0-2.142z",
        value: userStatistic.events
      },
      {
        tag: 'Recipes',
        svg: "M13.61 17h-.007a1.39 1.39 0 0 1-1.376-1.587L13 10l-2-1c0-5.373 1.375-8 3.25-8 .497 0 .75.336.75.75v13.86A1.39 1.39 0 0 1 13.61 17zM6.557 9.912l.35 5.59a1.41 1.41 0 1 1-2.813 0l.35-5.59A1.994 1.994 0 0 1 3 8V1.5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0V8c0 .91-.61 1.67-1.443 1.912z",
        value: userStatistic.recipes
      },
      {
        tag: 'Reviews',
        svg: "M16.08 5.63c-1.045-.16-2.05-.215-2.918-.127.797.145 1.63.5 2.504.948a7.144 7.144 0 0 1-.11.19c-1.594-.223-3.12-.284-4.455-.15 1.2.22 2.44.678 3.735 1.258-1.903 2.582-5.284 4.92-10.975 4.526C7.405 8.18 12.16 4.7 15.486 2.606c-4.132 1.178-9.278 4.96-12.202 8.8.47-4.812 3.428-7.27 6.572-8.486-.083.86-.215 1.672-.438 2.42.528-.8 1.007-1.74 1.426-2.765.217-.066.433-.127.65-.184-.03.577-.1 1.117-.245 1.6a10 10 0 0 0 .89-1.754c1.94-.427 3.736-.475 4.82-.415.136.444-.06 2.016-.88 3.81zM3.857 12.273C2.767 13.533 1.785 14.847 1 16.2c.173-1.472 1.023-3.138 2.284-4.794a13.28 13.28 0 0 0-.056.82c.215.02.42.03.63.046z",
        value: userStatistic.reviews
      },
    ]


    return (
      <div className="ysection">
        <h4>Stats</h4>
        <ul className="ylist ylist--condensed">

          {userStateRows.map((row, index) => {
            return (
              <li key={index}>
                <span id="icon_18X18" className="icon icon--18-light-bulb icon--size-18 u-space-r1">
                   <svg className="icon_svg">
                        <path d={row.svg}/>
                   </svg>
                </span>
                {row.tag}
                <strong className="margin-left-6">{row.value}</strong>
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

export default UserProfileRecentActivityPanel;