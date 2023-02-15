import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { blue, grey } from "@mui/material/colors";
import React from "react";

import HomeDetails from "./HomeDetails";
import TopInfo from "./TopInfo";
import ListingDescription from "./ListingDescription";
// import Rooms from './Rooms';
import ListingLocation from "./ListingLocation";
import ListingImages from "./ListingImages";

const Listing = ({ listing }) => {
    const address = (addrss) =>
        `${addrss.city}, ${addrss.state}, ${addrss.zip}`;
    const sx = { mt: 2, p: 3, bgcolor: "white", width: "70%" };
    return (
        <Grid bgcolor={grey[100]}>
            {/* IMAGES AREA */}
            <ListingImages images={listing.images} />

            <Grid sx={{ width: "75%", m: "auto" }}>
                <Typography sx={{ fontSize: "1.7rem", fontWeight: 600 }}>
                    {listing.address.streetName}
                </Typography>
                <Typography sx={{ my: 3, color: blue[400] }}>
                    {address(listing.address)}
                </Typography>

                {/* TOP INFO */}
                <TopInfo listing={listing} />

                {/* HOME DETAILS */}
                <HomeDetails listing={listing} sx={sx} />

                {/* DESCRIPTION */}
                <ListingDescription listing={listing} sx={sx} />

                {/* LOCATION  HERE! */}
                <ListingLocation listing={listing} address={address} sx={sx} />

                {/* ROOMS */}
                {/* <Rooms listing={listing}/> */}
            </Grid>
        </Grid>
    );
};

export default Listing;
