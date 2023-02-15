import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingComponent from "../components/listing/ListingComponent";

const Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    useEffect(() => {
        axios.get("/api/property/" + id).then((res) => {
            setListing(res.data.data.listings[0]);
        });
    }, []);
    return (
        <div>
            {listing ? <ListingComponent listing={listing} /> : "Loading"}
        </div>
    );
};

export default Listing;
