import {
    ArrowBackIosNewOutlined,
    ArrowForwardIosOutlined,
    Close,
} from "@mui/icons-material";
import { CardMedia, Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";

export default function ListingImages({ images }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const displayImages = images.slice(0, 2);
    const [image, setImage] = useState(images[0]);
    const [image_size, setImage_Size] = useState(images.length - 1);

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
        <div>
            <Grid display="flex" onClick={handleClickOpen}>
                {displayImages.map((image) => (
                    <CardMedia
                        key={image}
                        component="img"
                        height="450"
                        width={"20px"}
                        image={"https://cdn.repliers.io/" + image}
                        alt={image}
                    />
                ))}
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                size="lg"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
            >
                <Grid
                    position={"relative"}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <IconButton
                        sx={{
                            color: "white",
                            position: "absolute",
                            top: 20,
                            right: 0,
                            border: "2px solid white",
                            zIndex: 4,
                            mr: 5,
                        }}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>

                    <IconButton
                        sx={{
                            color: "white",
                            height: "100vh",
                        }}
                        onClick={leftArrowImage}
                    >
                        <ArrowBackIosNewOutlined />
                    </IconButton>

                    <CardMedia
                        component="img"
                        sx={{
                            width: "80vw",
                            height: "80vh",
                        }}
                        image={"https://cdn.repliers.io/" + image}
                        alt={image}
                    />

                    <IconButton
                        sx={{ color: "white", height: "100vh" }}
                        onClick={rightArrowImage}
                    >
                        <ArrowForwardIosOutlined />
                    </IconButton>
                </Grid>
            </Dialog>
        </div>
    );
}
