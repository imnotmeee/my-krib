import React, { useState } from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";

import { blue, grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import {
    clearBasementUri,
    setBasementUri,
} from "../../../store/reducers/uri_slice";

const categories = [
    "Finished Basement", // 0
    "Separate Entrance", // 1
];

export default function Basement() {
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState([]);
    const [preSelected, setPreSelected] = React.useState([]);

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);

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
        // Finished Basement
        if (selected.includes(categories[0])) {
            uri += "basement1=Apartment&basement2=Fin W/O&basement3=Finished&";
            setPreSelected([categories[0]]);
        }
        // Separate Entrance
        if (selected.includes(categories[1])) {
            uri +=
                "basement1=Apartment&basement2=Fin W/O&basement4=Sep Entrance&basement5=W/O&Walk-Up&";
            setPreSelected([categories[1]]);
        }
        uri = uri.replaceAll(",", "");
        if (!uri) {
            setPreSelected([]);
            dispatch(clearBasementUri());
            setActive(false);
            handleClose();
            return;
        }
        setActive(true);
        dispatch(setBasementUri(uri));
        handleClose();
    };

    const handleClear = () => {
        setPreSelected([]);
        setActive(false);
        dispatch(clearBasementUri());
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
                Basement
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Basement</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ width: 300 }}>
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
