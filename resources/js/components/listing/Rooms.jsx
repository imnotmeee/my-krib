import { Grid } from '@mui/material';
import React from 'react'

const Rooms = ({listing}) => {
    const roomsInObject = listing.rooms
    const rooms = Object.entries(roomsInObject).map(([key, value]) => value);

    return (
        <Grid>
            {
                rooms.map((room, i) => (
                    <h1 key={i}>
                        {room.features}
                    </h1>
                ))
            }
        </Grid>
    )
}

export default Rooms