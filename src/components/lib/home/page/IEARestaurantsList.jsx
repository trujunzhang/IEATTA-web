import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/restaurants'

class IEARestaurantsList extends Component {

  render() {
    const {listTask} = this.props;

    const {
      id,
      results,
      ready,
      totalCount,
      limit,
      firstPagination,
    } = listTask;

    let hasMore = !ready && totalCount !== results.length

    const showReady = Posts.showReady(results, hasMore, ready, totalCount, limit, firstPagination)

    if (showReady) {
      return (
        <section className='restaurants-list-loading-panel'>
          <Telescope.components.F8LoadingView/>
        </section>
      )
    } else if (!!results && !!results.length) {

      return (

        <ul className="ylist ylist-bordered search-results">
          {results.map((item, index) =>
            <Telescope.components.RestaurantsItem
              listId={id}
              key={item.id}
              index={index}
              restaurant={item}
              onRestaurantItemHover={this.props.onRestaurantItemHover}
              canEdit={false}/>
          )}

        </ul>
      )
    } else {
      return (
        <section className="results_37tfm">
          <Telescope.components.F8EmptySection
            title={`No restaurants now`}
            text="You can add new restaurants on your mobile phones."/>
        </section>
      )
    }
  }

}

export default IEARestaurantsList;

