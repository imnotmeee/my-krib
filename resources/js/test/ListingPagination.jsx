import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ListingsLoading from '../components/utils/listing-components/ListingsLoading'

const ListingPagination = () => {
    const items = Array.from(Array(100).keys(), x => x + 1);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchNextPage = () => {
        setData(prev => [...prev, ...items.slice(prev.length, prev.length + 10)])
        setHasMore(data.length !== items.length)
    }

    return (
        <div>
            {(data) && 
                    <InfiniteScroll
                        hasMore={hasMore}
                        loadMore={fetchNextPage}
                        loader={<ListingsLoading key={0}/>}
                        children={data.map(val => (
                             <h3 key={val}>{val}</h3>
                        ))}
                    />
                }
        </div>
    )
}

export default ListingPagination