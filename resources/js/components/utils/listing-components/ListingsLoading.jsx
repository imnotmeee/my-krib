import React from 'react'
import { Grid, Skeleton } from '@mui/material'

const ListingsLoading = ({width = '100%'}) => {
  return (
    <Grid display={'flex'} justifyContent='space-between' flexWrap={'wrap'} width={width}>
        {
            Array.from(Array(15).keys(), x => x + 1).map(k => (
                <Skeleton key={k} variant="rectangular" width={'32.5%'} height={208} sx={{mb: 1}} />
            ))
        }
    </Grid>
  )
}

export default ListingsLoading