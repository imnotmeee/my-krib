import {
    Checkbox,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";

import { blue, grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import {
    clearGarageSizeUri,
    setGarageSizeUri,
} from "../../../store/reducers/uri_slice";

const categories = [
    "Single Car +", // 0
    "Double Car +", // 1
    "Triple Car +", // 2
];

export default function GarageSize() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("");
    const [preSelected, setPreSelected] = useState("");

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickClear = () => {
        active ? setSelected(preSelected) : setSelected("");
        setOpen(false);
    };

    const color = selected ? blue[600] : grey[700];
    const bc = selected ? blue[600] : grey[400];
    const borderColor = "1px solid " + bc;
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

    const handleSet = () => {
        let uri = categories.indexOf(selected) + 1;
        if (!uri) {
            setPreSelected();
            setActive(false);
            dispatch(clearGarageSizeUri());
            handleClose();
            return;
        }
        setPreSelected(selected);
        setActive(true);
        uri + "&";
        dispatch(setGarageSizeUri(`minGarageSpaces=${uri}&`));
        handleClose();
    };

    const handleClear = () => {
        setActive(false);
        setPreSelected("");
        dispatch(clearGarageSizeUri());
        setSelected("");
        handleClose();
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
                sx={sx}
            >
                Garage Size
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
            >
                <DialogTitle>Garage Size</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ width: "100%" }}>
                        {categories.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                onClick={() =>
                                    name === selected
                                        ? setSelected("")
                                        : setSelected(name)
                                }
                            >
                                <Checkbox checked={name === selected} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Grid display="flex" alignItems="center">
                        <Button onClick={handleClear} color="warning">
                            Clear
                        </Button>
                        <Grid display="flex" alignItems="center" ml={2}>
                            <Button onClick={handleClickClear}>Cancel</Button>
                            <Button onClick={handleSet}>Set</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
}
