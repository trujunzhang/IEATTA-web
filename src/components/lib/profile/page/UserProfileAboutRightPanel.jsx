import Telescope from '../../../lib'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Events from '../../../../lib/events'

class UserProfileAboutRightPanel extends Component {

  render() {
    return (
      <div className="user-details-overview_sidebar">

        <h3>About Judy L.</h3>

        <div className="ysection">
          <h4>Rating Distribution</h4>
          <table className="histogram histogram--alternating">

            <tbody>
            <tr className="histogram_row histogram_row--1">
              <th scope="row" className="histogram_label nowrap">
                5 stars
              </th>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td style={{width: '95%'}}>
                      <div className="histogram_bar"></div>
                    </td>
                    <td className="histogram_count">232</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="histogram_row histogram_row--2">
              <th scope="row" className="histogram_label nowrap">
                4 stars
              </th>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td style={{width: '100%'}}>
                      <div className="histogram_bar"></div>
                    </td>
                    <td className="histogram_count">244</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="histogram_row histogram_row--3">
              <th scope="row" className="histogram_label nowrap">
                3 stars
              </th>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td style={{width: '42%'}}>
                      <div className="histogram_bar"></div>
                    </td>
                    <td className="histogram_count">102</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="histogram_row histogram_row--4">
              <th scope="row" className="histogram_label nowrap">
                2 stars
              </th>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td style={{width: '20%'}}>
                      <div className="histogram_bar"></div>
                    </td>
                    <td className="histogram_count">49</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="histogram_row histogram_row--5">
              <th scope="row" className="histogram_label nowrap">
                1 star
              </th>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td style={{width: '10%'}}>
                      <div className="histogram_bar"></div>
                    </td>
                    <td className="histogram_count">24</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>

          <a className="js-more-graphs-link">
            View more graphs
          </a>


        </div>

        <div className="ysection">
          <h4>Review Votes</h4>
          <ul className="ylist ylist--condensed">
            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-useful-outline icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"/>
    </svg>
</span>Useful
              <strong>1561</strong>
            </li>
            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-funny-outline icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12a4.87 4.87 0 0 1-4.787-4h9.574A4.87 4.87 0 0 1 9 14zm2.5-5.625a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75zm-5 0a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75z"/>
    </svg>
</span>Funny
              <strong>961</strong>
            </li>
            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-cool-outline icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm6.026 5.335C14.766 8.797 13.5 10 11.986 10h-.003c-1.218 0-2.282-.764-2.767-1.813-.088-.19-.344-.242-.432-.052C8.3 9.185 7.234 10 6.016 10h-.003C4.5 10 3.195 8.83 2.973 7.35l-.093-.84c-.053-.242.192-.51.477-.51h11.286c.294 0 .508.332.477.56l-.094.775zm-2.068 4.154A4.28 4.28 0 0 1 9 14.144a4.28 4.28 0 0 1-3.958-2.657A6.81 6.81 0 0 0 9 12.753a6.81 6.81 0 0 0 3.958-1.265z"/>
    </svg>
</span>Cool
              <strong>1137</strong>
            </li>
          </ul>

        </div>

        <div className="ysection">
          <h4>Stats</h4>
          <ul className="ylist ylist--condensed">

            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-light-bulb icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M11 11.62V14H7v-2.38A5.498 5.498 0 0 1 9 1a5.498 5.498 0 0 1 2 10.62zM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 11.07A1.93 1.93 0 0 1 9.07 17h-.14A1.93 1.93 0 0 1 7 15.07V15h4v.07z"/>
    </svg>
</span>Tips
              <strong>178</strong>
            </li>

            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-drafts icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M16.08 5.63c-1.045-.16-2.05-.215-2.918-.127.797.145 1.63.5 2.504.948a7.144 7.144 0 0 1-.11.19c-1.594-.223-3.12-.284-4.455-.15 1.2.22 2.44.678 3.735 1.258-1.903 2.582-5.284 4.92-10.975 4.526C7.405 8.18 12.16 4.7 15.486 2.606c-4.132 1.178-9.278 4.96-12.202 8.8.47-4.812 3.428-7.27 6.572-8.486-.083.86-.215 1.672-.438 2.42.528-.8 1.007-1.74 1.426-2.765.217-.066.433-.127.65-.184-.03.577-.1 1.117-.245 1.6a10 10 0 0 0 .89-1.754c1.94-.427 3.736-.475 4.82-.415.136.444-.06 2.016-.88 3.81zM3.857 12.273C2.767 13.533 1.785 14.847 1 16.2c.173-1.472 1.023-3.138 2.284-4.794a13.28 13.28 0 0 0-.056.82c.215.02.42.03.63.046z"/>
    </svg>
</span>Review Updates
              <strong>12</strong>
            </li>

            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-first icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M18 9l-2.136-1.84.932-2.66-2.772-.525-.524-2.77-2.66.93L8.997 0 7.163 2.136 4.5 1.206l-.525 2.77-2.77.524.932 2.66L0 9l2.137 1.84-.932 2.66 2.77.525.526 2.77 2.664-.932L8.998 18l1.84-2.137 2.662.932.524-2.77 2.772-.524-.932-2.66L18 9zm-7 4H7v-1h1V6.667L7 7V6l3-1v7h1v1z"/>
    </svg>
</span>Firsts
              <strong>13</strong>
            </li>

            <li>
                <span
                  id="icon_18X18"
                  className="icon icon--18-followers icon--size-18 u-space-r1">
    <svg className="icon_svg">
    <path
      d="M15 14h-2v2l-4-3 4-3v2h3l-1 2zm-7.925 1.383c-.443.817-1.707.817-2.15 0L2.128 9.605C1.728 8.868 2.31 8 3.203 8h5.594c.893 0 1.474.868 1.075 1.605l-2.797 5.778zM6 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
</span>Followers
              <strong>86</strong>
            </li>
          </ul>

        </div>


        <div className="ysection">
          <ul className="ylist">
            <li>
              <h4>Location</h4>
              <p>Dublin, CA</p>
            </li>

            <li>
              <h4>Yelping Since</h4>
              <p>December 2009</p>
            </li>

            <li>
              <h4>Things I Love</h4>
              <p>cooking, yoga, dancing like nobody's watching, science/medicine, smoothie bowls, blueberries,
                mushrooms, game meat, real estate, bbq/smoking, hiking, opera, ballet, traveling, singing in the car,
                singing in the shower, feeding people, farmer's markets, juicing, reading, exploring new cuisines,
                gardening, white nectarines, noodles, blankets, scarves, compressed air, brussels sprouts, nerdy
                conversations.</p>
            </li>

            <li>
              <h4>Find Me In</h4>
              <p>a sweater... year round.</p>
            </li>
            <li>
              <h4>My Hometown</h4>
              <p>dublin. california, not ireland.</p>
            </li>
            <li>
              <h4>My Favorite Movie</h4>
              <p>the gladiator</p>
            </li>
            <li>
              <h4>Don’t Tell Anyone Else But...</h4>
              <p>i'm deathly afraid of spiders and scary movies.</p>
            </li>
            <li>
              <h4>Current Crush</h4>
              <p>smoothie bowls and plant based proteins.</p>
            </li>
          </ul>

        </div>

        <p className="vanity-url">
          <a className="vanity-url_link" href="https://judyclee.yelp.com">
            https://judyclee.yelp.com
          </a>
        </p>

      </div>
    )
  }
}

export default UserProfileAboutRightPanel;
