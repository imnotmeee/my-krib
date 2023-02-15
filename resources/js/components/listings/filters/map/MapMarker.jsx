import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import useSupercluster from "use-supercluster";
import { setListingUri, setMapUri } from "../../../../store/reducers/uri_slice";
import ListingEach from "../../ListingEach";
import { fetchIcon, markerIcon, showMarkerWhenHover } from "./utils";

const MapMarker = ({ listings, setCenter }) => {
    const { hovered_listing } = useSelector((root) => root.listing);
    const dispatch = useDispatch();

    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);
    const map = useMap();

    function updateMap() {
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }

    function updateListings(lat, long) {
        let radius = Math.round(getRadius());
        if (radius == 0) {
            radius = 1;
        }
        setCenter({ lat, lng: long });
        dispatch(
            setListingUri(
                `lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(
                    long
                )}&radius=${radius}&pageNum=1&`
            )
        );
        dispatch(
            setMapUri(
                `lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(
                    long
                )}&radius=${radius}&`
            )
        );
    }

    function getRadius() {
        var mapBoundNorthEast = map.getBounds().getNorthEast();
        var mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
        return mapDistance / 1000;
    }

    // TRIGGER WHENEVER THE MAP MOVES
    const onMove = useCallback(
        (e) => {
            updateMap();
            const b = e.target.getBounds();
            const lat = b.getCenter().lat;
            const long = b.getCenter().lng;
            updateListings(lat, long);
        },
        [map]
    );

    useEffect(() => {
        updateMap();
    }, [map]);
    useEffect(() => {
        map.on("moveend", onMove);
        return () => map.off("moveend", onMove);
    }, [map, onMove]);

    const points = listings.map((listing) => ({
        type: "Feature",
        properties: {
            cluster: false,
            listingId: listing.mlsNumber,
            price: listing.listPrice,
            listing,
        },
        geometry: {
            type: "Point",
            coordinates: [listing.map.longitude, listing.map.latitude],
        },
    }));

    const { clusters } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: {
            radius: 95,
            maxZoom: 17,
        },
    });

    return (
        <>
            {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =
                    cluster.properties;
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            position={[latitude, longitude]}
                            icon={fetchIcon(
                                pointCount,
                                10 + (pointCount / points.length) * 40
                            )}
                            eventHandlers={{
                                click: () => {
                                    map.flyTo(
                                        [latitude, longitude],
                                        map.getZoom() >= 16
                                            ? 18
                                            : map.getZoom() + 1
                                    );
                                    updateListings(latitude, longitude);
                                },
                            }}
                        />
                    );
                }

                return (
                    <Marker
                        key={`listing-${cluster.properties.listingId}`}
                        position={[latitude, longitude]}
                        icon={markerIcon(
                            cluster.properties.price,
                            hovered_listing?.mlsNumber ===
                                cluster.properties.listingId
                        )}
                    >
                        <Popup className="my-popup">
                            <ListingEach
                                isInMap
                                width="100%"
                                listing={cluster.properties.listing}
                            />
                        </Popup>
                    </Marker>
                );
            })}

            {/* THIS IS HIDDEN, ONLY SHOW WHEN THE LISTING IS HOVERING */}
            {listings.map((listing) => {
                if (listing.mlsNumber === hovered_listing.mlsNumber) {
                    return (
                        <Marker
                            key={`listing-${listing.mlsNumber}`}
                            position={[
                                listing.map.latitude,
                                listing.map.longitude,
                            ]}
                            icon={showMarkerWhenHover(
                                listing.listPrice,
                                hovered_listing.mlsNumber === listing.mlsNumber
                            )}
                        >
                            <Popup className="my-popup">
                                <ListingEach
                                    isInMap
                                    width="100%"
                                    listing={listing}
                                />
                            </Popup>
                        </Marker>
                    );
                } else return undefined;
            })}
        </>
    );
};

export default MapMarker;

// OLD CODE
// import "leaflet/dist/leaflet.css";
// import React, { useCallback, useEffect, useState } from "react";
// import { Marker, Popup, useMap } from "react-leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import useSupercluster from "use-supercluster";
// import { setListingUri, setMapUri } from "../../../../store/reducers/uri_slice";
// import ListingEach from "../../ListingEach";
// import { fetchIcon, markerIcon, showMarkerWhenHover } from "./utils";

// const MapMarker = ({ listings, setCenter }) => {
//     const { hovered_listing } = useSelector((root) => root.listing);
//     const dispatch = useDispatch();

//     const [bounds, setBounds] = useState(null);
//     const [zoom, setZoom] = useState(12);
//     const map = useMap();

//     function updateMap() {
//         const b = map.getBounds();
//         setBounds([
//             b.getSouthWest().lng,
//             b.getSouthWest().lat,
//             b.getNorthEast().lng,
//             b.getNorthEast().lat,
//         ]);
//         setZoom(map.getZoom());
//     }

//     function updateListings(lat, long, bounds) {
//         setCenter({ lat, lng: long });
//         const encodedPolygonCoords = encodeURIComponent(
//             JSON.stringify(getBoundsCoords(bounds))
//         );
//         dispatch(setListingUri(`map=${encodedPolygonCoords}&pageNum=1&`));
//         dispatch(
//             setMapUri(
//                 `lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(
//                     long
//                 )}&radius=${getRadius()}&`
//             )
//         );
//     }
//     function getRadius() {
//         var mapBoundNorthEast = map.getBounds().getNorthEast();
//         var mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
//         let radius = Math.round(mapDistance / 1000);
//         return radius === 0 ? 1 : radius;
//     }
//     function getBoundsCoords(bounds) {
//         const boundsCoords = [
//             [
//                 [bounds._northEast.lng, bounds._northEast.lat],
//                 [bounds._southWest.lng, bounds._northEast.lat],
//                 [bounds._southWest.lng, bounds._southWest.lat],
//                 [bounds._northEast.lng, bounds._southWest.lat],
//                 [bounds._northEast.lng, bounds._northEast.lat],
//             ],
//         ];
//         return boundsCoords;
//     }
//     // TRIGGER WHENEVER THE MAP MOVES
//     const onMove = useCallback(
//         (e) => {
//             updateMap();
//             const b = e.target.getBounds();
//             const lat = b.getCenter().lat;
//             const long = b.getCenter().lng;
//             updateListings(lat, long, b);
//         },
//         [map]
//     );

//     useEffect(() => {
//         updateMap();
//     }, [map]);
//     useEffect(() => {
//         map.on("moveend", onMove);
//         return () => map.off("moveend", onMove);
//     }, [map, onMove]);

//     const points = listings.map((listing) => ({
//         type: "Feature",
//         properties: {
//             cluster: false,
//             listingId: listing.mlsNumber,
//             price: listing.listPrice,
//             listing,
//         },
//         geometry: {
//             type: "Point",
//             coordinates: [listing.map.longitude, listing.map.latitude],
//         },
//     }));

//     const { clusters } = useSupercluster({
//         points: points,
//         bounds: bounds,
//         zoom: zoom,
//         options: {
//             radius: 95,
//             maxZoom: 17,
//         },
//     });

//     return (
//         <>
//             {clusters.map((cluster) => {
//                 const [longitude, latitude] = cluster.geometry.coordinates;
//                 const { cluster: isCluster, point_count: pointCount } =
//                     cluster.properties;
//                 if (isCluster) {
//                     return (
//                         <Marker
//                             key={`cluster-${cluster.id}`}
//                             position={[latitude, longitude]}
//                             icon={fetchIcon(
//                                 pointCount,
//                                 10 + (pointCount / points.length) * 40
//                             )}
//                             eventHandlers={{
//                                 click: () => {
//                                     map.flyTo(
//                                         [latitude, longitude],
//                                         map.getZoom() >= 16
//                                             ? 18
//                                             : map.getZoom() + 1
//                                     );
//                                 },
//                             }}
//                         />
//                     );
//                 }

//                 return (
//                     <Marker
//                         key={`listing-${cluster.properties.listingId}`}
//                         position={[latitude, longitude]}
//                         icon={markerIcon(
//                             cluster.properties.price,
//                             hovered_listing?.mlsNumber ===
//                                 cluster.properties.listingId
//                         )}
//                     >
//                         <Popup className="my-popup">
//                             <ListingEach
//                                 isInMap
//                                 width="100%"
//                                 listing={cluster.properties.listing}
//                             />
//                         </Popup>
//                     </Marker>
//                 );
//             })}

//             {listings.map((listing) => {
//                 if (listing.mlsNumber === hovered_listing.mlsNumber) {
//                     return (
//                         <Marker
//                             key={`listing-${listing.mlsNumber}`}
//                             position={[
//                                 listing.map.latitude,
//                                 listing.map.longitude,
//                             ]}
//                             icon={showMarkerWhenHover(
//                                 listing.listPrice,
//                                 hovered_listing.mlsNumber === listing.mlsNumber
//                             )}
//                         >
//                             <Popup className="my-popup">
//                                 <ListingEach
//                                     isInMap
//                                     width="100%"
//                                     listing={listing}
//                                 />
//                             </Popup>
//                         </Marker>
//                     );
//                 } else return undefined;
//             })}
//         </>
//     );
// };

// export default MapMarker;
