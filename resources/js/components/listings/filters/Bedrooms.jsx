import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Slider } from "@mui/material";
import React, { useState } from "react";
import { setBedUri, clearBedUri } from "../../../store/reducers/uri_slice";
import { useDispatch } from "react-redux";
import { blue, grey } from "@mui/material/colors";

export default function Bedrooms() {
    const dispatch = useDispatch();
    const [val, setVal] = useState(0);
    const [preVal, setPreVal] = useState(0);

    const [open, setOpen] = React.useState(false);
    const [active, setActive] = useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleCloseClear = () => {
        active ? setVal(preVal) : setVal(0);
        setOpen(false);
    };

    const handleSet = () => {
        if (val === 0) {
            setPreVal([]);
            setActive(false);
            dispatch(clearBedUri());
            handleClose();
        }
        setActive(true);
        setPreVal(val);
        dispatch(setBedUri(`minBeds=${val}&maxBeds=${val}&`));
        handleClose();
    };

    const handleClear = () => {
        setPreVal([]);
        setActive(false);
        dispatch(clearBedUri());
        setVal(0);
        handleClose();
    };

    const color = val !== 0 ? blue[600] : grey[700];
    const bc = val !== 0 ? blue[600] : grey[400];
    const borderColor = `1px solid ${bc}`;
    const sx = {
        border: borderColor,
        borderRadius: "2px",
        ml: 2,
        px: 1,
        py: 0.5,
        color,
        fontSize: "10px",
        textTransform: "capitalize",
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
                sx={sx}
            >
                Bedroom
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bedrooms</DialogTitle>
                <DialogContent>
                    <Box width={300} py={5}>
                        <Slider
                            value={val}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={0}
                            max={6}
                            onChange={(val) => setVal(val.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Grid display="flex" alignItems="center">
                        <Button onClick={handleClear} color="warning">
                            Clear
                        </Button>
                        <Grid display="flex" alignItems="center" ml={2}>
                            <Button onClick={handleCloseClear}>Cancel</Button>
                            <Button onClick={handleSet}>Set</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
}
