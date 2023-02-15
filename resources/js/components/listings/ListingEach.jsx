import {
    BathtubOutlined,
    BedOutlined,
    DirectionsCarFilledOutlined,
    OfflineBoltRounded,
    StraightenOutlined,
} from "@mui/icons-material";
import { Card, CardContent, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React from "react";
import ListingsImages from "./ListingsImages";

import { useDispatch } from "react-redux";
import {
    hover_listing,
    leave_listing,
} from "../../store/reducers/listings_slice";

const ListingEach = ({ listing, width = "32.5%", isInMap }) => {
    const dispatch = useDispatch();

    const handleHover = () => dispatch(hover_listing(listing));
    const handleLeave = () => dispatch(leave_listing());

    const address = (addrss) =>
        `${addrss.city}, ${addrss.state}, ${addrss.zip}`;

    return (
        <Grid
            position="relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            width={width}
            sx={{ mb: isInMap ? 0 : 1.5, cursor: "pointer" }}
        >
            <Card sx={{ boxShadow: 3, cursor: "default" }}>
                <ListingsImages
                    status={listing.lastStatus}
                    images={listing?.images || ["/listing/nophoto.png"]}
                    price={listing.listPrice}
                    mlsNumber={listing.mlsNumber}
                />

                <CardContent sx={{ px: 0 }}>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "15px", fontWeight: 500, px: 2 }}
                    >
                        {address(listing.address)}
                    </Typography>

                    <Grid
                        display="flex"
                        alignItems="center"
                        color="#5e5e5e"
                        flexWrap={"wrap"}
                        px={2}
                        pb={1}
                        borderBottom="1px solid #c0c0c0"
                    >
                        <Grid
                            display="flex"
                            alignItems="center"
                            pr={1}
                            pb={0.2}
                            borderRight={"1px solid #5e5e5e"}
                        >
                            <BedOutlined sx={{ fontSize: "16px" }} />
                            <Typography sx={{ fontSize: "12.5px", ml: 1 }}>
                                {listing.details?.numBedrooms || 0} BD
                            </Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            alignItems="center"
                            px={1}
                            pb={0.2}
                            borderRight={"1px solid #5e5e5e"}
                        >
                            <BathtubOutlined sx={{ fontSize: "16px" }} />
                            <Typography sx={{ fontSize: "12.5px", ml: 1 }}>
                                {listing.details?.numBathrooms || 0} BA
                            </Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            alignItems="center"
                            px={1}
                            pb={0.2}
                            borderRight={"1px solid #5e5e5e"}
                        >
                            <DirectionsCarFilledOutlined
                                sx={{ fontSize: "16px" }}
                            />
                            <Typography sx={{ fontSize: "12.5px", ml: 1 }}>
                                {listing.details?.numGarageSpaces || 0} YES
                            </Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            alignItems="center"
                            px={1}
                            pb={0.2}
                        >
                            <StraightenOutlined sx={{ fontSize: "16px" }} />
                            <Typography sx={{ fontSize: "12.5px", ml: 1 }}>
                                {listing.details?.sqft || 0}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={2}
                        pt={2}
                    >
                        <Grid
                            display="flex"
                            alignItems="center"
                            color={blue[800]}
                            fontSize="16px"
                        >
                            <OfflineBoltRounded
                                sx={{ fontSize: "20px", mr: 1 }}
                            />
                            <Typography fontWeight={600}>1200-1399</Typography>
                        </Grid>
                        <Typography sx={{ fontSize: "12px", color: "#5e5e5e" }}>
                            {listing.daysOnMarket} days on market
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ListingEach;
