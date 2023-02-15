import React from 'react'
import { BathtubOutlined, BedOutlined, DirectionsCarFilledOutlined, StraightenOutlined, AccessTime } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const TopInfo = ({listing}) => {
    const d = listing.details;
    return (
        <Grid display='flex' alignItems='center' color={grey[800]} flexWrap={'wrap'} pr={2}>
            <Grid display='flex' alignItems='center' pr={1} pb={.2} borderRight={'1px solid #5e5e5e'}>
                <BedOutlined sx={{fontSize: '18px'}}/>
                <Typography sx={{fontSize: '14.5px', ml: 1}}>{d?.numBedrooms || 0} Bed</Typography>
            </Grid>
            <Grid display='flex' alignItems='center' px={1} pb={.2} borderRight={'1px solid #5e5e5e'}>
                <BathtubOutlined sx={{fontSize: '18px'}}/>
                <Typography sx={{fontSize: '14.5px', ml: 1}}>{d?.numBathrooms || 0} Bath</Typography>
            </Grid>
            <Grid display='flex' alignItems='center' px={1} pb={.2} borderRight={'1px solid #5e5e5e'}>
                <DirectionsCarFilledOutlined sx={{fontSize: '18px'}}/>
                <Typography sx={{fontSize: '14.5px', ml: 1}}>{d?.numGarageSpaces || 0} Yes</Typography>
            </Grid>
            <Grid display='flex' alignItems='center' px={1} pb={.2} borderRight={'1px solid #5e5e5e'}>
                <StraightenOutlined sx={{fontSize: '18px'}}/>
                <Typography sx={{fontSize: '14.5px', ml: 1}}>{d?.sqft || 0} Sqft</Typography>
            </Grid>
            <Grid display='flex' alignItems='center' px={1} pb={.2}>
                <AccessTime sx={{fontSize: '18px'}}/>
                <Typography sx={{fontSize: '14.5px', ml: 1}}>{listing?.daysOnMarket} days on market</Typography>
            </Grid>
        </Grid>
    )
}

export default TopInfo