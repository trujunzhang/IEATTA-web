import Telescope from '../index'
import React, {Component} from 'react'

class RestaurantsHomeList extends Component {

  render() {
    const {results, hasMore, ready, title, showHeader, showClose, dismissBanner, loadMore, listId} = this.props
    return (

      <ul className="ylist ylist-bordered search-results">

        {results.map((item, index) =>
          <Telescope.components.RestaurantsItem
            listId={listId}
            key={item.id}
            index={index}
            restaurant={item}
            type="save"
            canEdit={false}/>
        )}

      </ul>
    )
  }

}

export default RestaurantsHomeList

