import { Grid } from "@mui/material";
import React from "react";
import FilterMap from "./filters/map/FilterMap";
import ListingFiltering from "./ListingFiltering";
import ListingsArea from "./ListingsArea";

const ListingsComponent = () => {
    return (
        <Grid>
            <ListingFiltering />

            <Grid display="flex" position="relative">
                <ListingsArea />
                <FilterMap
                    position="fixed"
                    right={0}
                    width={"37vw"}
                    height="90vh"
                />
            </Grid>
        </Grid>
    );
};

export default ListingsComponent;
