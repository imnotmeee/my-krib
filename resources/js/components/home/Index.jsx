import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Index = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "REPLIERS-API-KEY": "I1H2jVeE6yKFRIWsoIqmH0Y8C2f5ON",
            },
        };

        fetch(
            "https://sandbox.repliers.io/listings?listings=true&operator=AND&sortBy=updatedOnDesc&status=A",
            options
        )
            .then((response) => response.json())
            .then(setResponse)
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            {response
                ? response.listings.map((li) => (
                      <Typography variant="h3" key={li.mlsNumber}>
                          {li.mlsNumber}
                      </Typography>
                  ))
                : "no data"}
        </div>
    );
};

export default Index;
