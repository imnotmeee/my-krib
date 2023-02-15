import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const MapLoading = ({...styles}) => {
  return (
    <Grid {...styles}>
      <Skeleton  
        variant="rectangular" 
        width={'100%'} 
        height={'100%'}/>
    </Grid>
  )
}

export default MapLoading