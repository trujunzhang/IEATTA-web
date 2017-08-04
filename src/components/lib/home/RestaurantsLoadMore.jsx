import React from 'react';

const RestaurantsLoadMore = ({loadMore, className = "posts-load-more"}) => {
    return (
        <a className={className} onClick={loadMore}>Show More</a>
    )
};


export default RestaurantsLoadMore;
