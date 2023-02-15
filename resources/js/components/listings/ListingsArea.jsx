import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ListingsLoading from "../utils/listing-components/ListingsLoading";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import PaginationCount from './filters/PaginationCount'
import InfiniteScroll from "react-infinite-scroller";
import ListingEach from "./ListingEach";
// import { setListingUri } from '../../store/reducers/uri_slice';

const ListingsArea = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const uri = useSelector((root) => root.uri.filter_uri);

    const [pageNum, setPageNum] = useState(1);

    // FOR PAGINATION
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    // const dispatch = useDispatch();
    // const dispatchUri = (uri) => dispatch(setListingUri(uri))
    // const [numPages, setNumPages] = useState(0);
    // const items = Array.from(Array(numPages).keys(), x => x + 1);
    // const handlePageClick = (event) => dispatchUri('pageNum=' + (event.selected + 1) + '&')
    useEffect(() => {
        setHasMore(true);
        setLoading(true);
        setListings([]);

        axios
            .get(uri)
            .then((res) => {
                setCount(res.data.data.count);
                setPageSize(res.data.data.pageSize);

                // setNumPages(res.data.data?.numPages);
                setListings(res.data.data.listings);
                setLoading(false);
            })
            .catch((_) => undefined);
    }, [uri]);
    const fetchNextPage = () => {
        if (pageSize >= count) setHasMore(false);

        axios.get(`${uri}pageNum=${pageNum}&`).then((res) => {
            setCount(res.data.data.count);
            setPageSize((prev) => prev + res.data.data.pageSize);

            setListings((prev) => [...prev, ...res.data.data.listings]);
            // console.log([pageSize, count]);
            setPageNum(pageNum + 1);
        });
    };

    return (
        <Grid
            width="63%"
            position="fixed"
            left={0}
            sx={{ overflowX: "scroll", height: "100vh" }}
            className="listing_container"
        >
            <Grid sx={{ mx: 2 }}>
                <ListingsMessage />
                {loading ? (
                    <ListingsLoading />
                ) : (
                    <Grid
                        display={"flex"}
                        flexWrap={"wrap"}
                        justifyContent="space-between"
                    >
                        <div
                            style={{ height: "700px", overflow: "auto" }}
                            className="listing_container"
                        >
                            <InfiniteScroll
                                useWindow={false}
                                hasMore={hasMore}
                                loadMore={fetchNextPage}
                                threshold={10000}
                                loader={<ListingsLoading key={0} />}
                                children={
                                    <Grid
                                        display={"flex"}
                                        flexWrap={"wrap"}
                                        justifyContent="space-between"
                                    >
                                        {listings.map((listing) => (
                                            <ListingEach
                                                listing={listing}
                                                key={listing.mlsNumber}
                                            />
                                        ))}
                                    </Grid>
                                }
                            />
                        </div>
                    </Grid>
                )}
            </Grid>

            {/* <PaginationCount handlePageClick={handlePageClick} items={items}/> */}
        </Grid>
    );
};

export default ListingsArea;

const ListingsMessage = () => {
    return (
        <Typography sx={{ fontSize: "11px", my: 1, fontWeight: "bold" }}>
            Condos & Houses For Sale in Caledonia-Fairbanks, York, Toronto{" "}
            <span style={{ color: "#c1c1c1" }}>
                ・13 homes available on Krib
            </span>
        </Typography>
    );
};
