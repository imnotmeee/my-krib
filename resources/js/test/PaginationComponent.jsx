
// THIS FILE IS ONLY FOR PRACTICE.


import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
            <Typography variant='h4' key={item}>
                {item}
            </Typography>
        ))}
    </>
  );
}

export default function PaginationComponent({  }) {
    const items = Array.from(Array(20).keys(), x => x + 1);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <Grid width='40%'>
            <Items currentItems={currentItems} />
            <ReactPaginate
                previousLabel="<"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </Grid>
    );
}