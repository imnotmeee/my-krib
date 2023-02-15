import { Grid, Typography } from '@mui/material';
import React from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';
import MapContainerComponent from '../utils/MapContainerComponent';
const icon = L.icon({

    iconUrl: '/map/marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16], 
  });

const ListingLocation = ({listing, address, ...styles}) => {
    const center = {lat: listing.map.latitude, lng: listing.map.longitude};

    return (
        <Grid {...styles}>
            <Typography sx={{fontSize: '1.2rem', mb: 3, fontWeight: 600}}>Location</Typography>
            <Grid width='100%' height="30vh">
                <MapContainerComponent
                    center={center}
                    zoom={16}
                    children={
                        <Marker
                            position={center}
                            icon={icon}
                        >
                            <Popup>
                                {address(listing.address)}
                            </Popup>
                        </Marker>
                    }
                />
            </Grid>
        </Grid>
    )
}

export default ListingLocation