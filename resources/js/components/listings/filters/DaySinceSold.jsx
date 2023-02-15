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
    clearDaySinceSoldUri,
    setDaySinceSoldUri,
} from "../../../store/reducers/uri_slice";

function getFormattedDate(daysInPast) {
    let currentDate = new Date();
    let pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - daysInPast);
    let year = pastDate.getFullYear();
    let month = (pastDate.getMonth() + 1).toString().padStart(2, "0");
    let day = pastDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function getInt(ago) {
    if (ago.includes("year")) return 2 * 360;
    const number = ago.match(/\d+/g);
    return parseInt(number[0], 10);
}

const categories = [
    "1 day ago", // 0
    "7 day ago", // 1
    "30 day ago", // 2
    "60 day ago", // 3
    "90 day ago", // 4
    "180 day ago", // 5
    "360 day ago", // 6
    "2 years ago", // 7
];

export default function DaySinceSold() {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState([]);
    const [preSelected, setPreSelected] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseClear = () => {
        active ? setSelected(preSelected) : setSelected([]);
        setOpen(false);
    };

    const color = selected.length !== 0 ? blue[600] : grey[700];
    const bc = selected.length !== 0 ? blue[600] : grey[400];
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
        let uri = "";
        if (selected.includes(categories[0])) {
            uri += `min0=${getFormattedDate(getInt(categories[0]))}&`;
            setPreSelected([categories[0]]);
        }
        if (selected.includes(categories[1])) {
            uri += `min1=${getFormattedDate(getInt(categories[1]))}&`;
            setPreSelected([categories[1]]);
        }
        if (selected.includes(categories[2])) {
            uri += `min2=${getFormattedDate(getInt(categories[2]))}&`;
            setPreSelected([categories[2]]);
        }
        if (selected.includes(categories[3])) {
            uri += `min3=${getFormattedDate(getInt(categories[3]))}&`;
            setPreSelected([categories[3]]);
        }
        if (selected.includes(categories[4])) {
            uri += `min4=${getFormattedDate(getInt(categories[4]))}&`;
            setPreSelected([categories[4]]);
        }
        if (selected.includes(categories[5])) {
            uri += `min5=${getFormattedDate(getInt(categories[5]))}&`;
            setPreSelected([categories[5]]);
        }
        if (selected.includes(categories[6])) {
            uri += `min6=${getFormattedDate(getInt(categories[6]))}&`;
            setPreSelected([categories[6]]);
        }
        if (selected.includes(categories[7])) {
            uri += `min7=${getFormattedDate(getInt(categories[7]))}&`;
            setPreSelected([categories[7]]);
        }

        if (!uri) {
            setActive(false);
            setPreSelected([]);
            dispatch(clearDaySinceSoldUri());
            handleClose();
        }
        setActive(true);
        dispatch(setDaySinceSoldUri(uri + "status=U&"));
        handleClose();
    };

    const handleClear = () => {
        setActive(false);
        setPreSelected([]);
        dispatch(clearDaySinceSoldUri());
        setSelected([]);
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
                Day Since Sold
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
            >
                <DialogTitle>Day Since Sold</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ width: "100%" }}>
                        {categories.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                onClick={() =>
                                    selected.includes(name)
                                        ? setSelected((prev) =>
                                              prev.filter((prv) => prv !== name)
                                          )
                                        : setSelected((prev) => [...prev, name])
                                }
                            >
                                <Checkbox checked={selected.includes(name)} />
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
                            <Button onClick={handleCloseClear}>Cancel</Button>
                            <Button onClick={handleSet}>Set</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
}
