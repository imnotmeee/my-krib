import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const ListingDescription = ({listing, ...styles}) => {
  const d = listing.details
  return (
    <Grid {...styles}>
        <Typography sx={{fontSize: '1.2rem', mb: 3, fontWeight: 600}}>Listing Description</Typography>

        <Typography variant='body2' color={grey[700]}>
            {d.description}
        </Typography>

        <Grid display='flex' justifyContent='space-between' my={2}>
          <Typography sx={{fontSize: '.8rem', fontWeight: 700}}>Broker: {listing.office?.brokerageName}</Typography>
          <Typography sx={{fontSize: '.8rem', fontWeight: 700}}>MLS# {listing.mlsNumber}</Typography>
        </Grid>

        <Grid display='flex' justifyContent='space-between'>
          <Typography sx={{fontSize: '.8rem', fontWeight: 700}}>City: {listing.address.city}</Typography>
        </Grid>

    </Grid>
  )
}

export default ListingDescription