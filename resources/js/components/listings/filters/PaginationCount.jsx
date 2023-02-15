import { Grid } from '@mui/material'
import React from 'react'
import ReactPaginate from 'react-paginate'

const PaginationCount = ({items, handlePageClick}) => {
  return (
    <Grid mr={10} pb={10}>
        <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageCount={items.length}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
        />
    </Grid>
  )
}

export default PaginationCount