import React, { useState } from "react";
import { Button, CardMedia, Grid, IconButton } from "@mui/material";
import {
    FavoriteBorderOutlined,
    ArrowBackIosNewOutlined,
    ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const ListingsImages = ({ status, images, price, mlsNumber }) => {
    const images_uri = (img) => `https://cdn.repliers.io/${img}`;
    const [image_size, setImage_Size] = useState(images.length - 1);
    const [image, setImage] = useState(images[0]);

    const [hover, setHover] = useState(false);

    const rightArrowImage = () => {
        if (image_size === images.length - 1) setImage_Size(0);
        else setImage_Size(image_size + 1);
        setImage(images[image_size]);
    };

    const leftArrowImage = () => {
        if (image_size === 0) setImage_Size(images.length - 1);
        else setImage_Size(image_size - 1);
        setImage(images[image_size]);
    };

    return (
        <>
            <Grid
                position={"relative"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        images[0].includes("listing")
                            ? images[0]
                            : images_uri(image)
                        // image={!image ? "listing/nophoto.png" : images_uri(image)}
                    }
                    alt={image}
                />
                {hover && (
                    <Grid
                        position="absolute"
                        width="100%"
                        height="100%"
                        top={0}
                        right={0}
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                            background:
                                "linear-gradient(90deg, rgba(0,0,0,0.4181022750897234) 0%, rgba(5,4,73,0) 22%, rgba(0,0,0,0.24163168685442926) 82%, rgba(0,0,0,0.42930675688244047) 100%);",
                        }}
                    >
                        <IconButton
                            sx={{ color: "white" }}
                            onClick={leftArrowImage}
                        >
                            <ArrowBackIosNewOutlined />
                        </IconButton>
                        <a
                            href={
                                status.includes("Sld") ||
                                status.includes("Lsd") ||
                                status.includes("Ter")
                                    ? `/listings/${mlsNumber}/${status}`
                                    : `/listings/${mlsNumber}`
                            }
                            target="_blank"
                            style={{
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                            }}
                        ></a>
                        <IconButton
                            sx={{ color: "white" }}
                            onClick={rightArrowImage}
                        >
                            <ArrowForwardIosOutlined />
                        </IconButton>
                    </Grid>
                )}
            </Grid>

            <IconButton
                sx={{ position: "absolute", top: 1, right: 1, color: "white" }}
            >
                <FavoriteBorderOutlined />
            </IconButton>

            <Button
                variant="contained"
                sx={{
                    mt: "-20px",
                    ml: 2,
                    fontWeight: 600,
                    fontSize: 17,
                    bgcolor: blue[800],
                }}
            >
                ${price}
            </Button>
        </>
    );
};

export default ListingsImages;
