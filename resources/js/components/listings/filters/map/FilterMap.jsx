import { Grid } from "@mui/material";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import MapContainerComponent from "../../../utils/MapContainerComponent";
import MapLoading from "../../../utils/listing-components/MapLoading";
import MapMarker from "./MapMarker";

function FilterMap({ ...styles }) {
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState({
        lat: 43.23612008391963,
        lng: -79.82683054799662,
    });
    const [listings, setListings] = useState([]);

    const map_uri = useSelector((root) => root.uri.map_filter_uri);

    useEffect(() => {
        axios
            .get(map_uri)
            .then((res) => {
                setListings(res.data.data.listings);
                setLoading(false);
            })
            .catch((_) => undefined);
    }, [map_uri]);

    return (
        <>
            {loading ? (
                <MapLoading {...styles} />
            ) : (
                <Grid {...styles}>
                    <MapContainerComponent
                        center={center}
                        children={
                            <MapMarker
                                listings={listings}
                                setCenter={setCenter}
                            />
                        }
                    />
                </Grid>
            )}
        </>
    );
}

export default FilterMap;

// useEffect(() => {
//   axios.get(map_uri)
//     .then(res => {
//         console.log('🌎 ' + res.data.url + ' 🌎')
//         setListings(res.data.data.listings);
//         setCenter({lat: res.data.data.listings[0].map.latitude, lng: res.data.data.listings[0].map.longitude});
//     })
// }, [map_uri])
