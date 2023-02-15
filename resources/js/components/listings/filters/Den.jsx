import { Checkbox, Grid, ListItemText, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";

import { blue, grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { clearDenUri, setDenUri } from "../../../store/reducers/uri_slice";

const categories = ["Y", "N"];

export default function Den() {
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

    const color = active ? blue[600] : grey[700];
    const bc = active ? blue[600] : grey[400];
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
        if (selected[0] === categories[0]) {
            uri = "den=Y&";
            setPreSelected([categories[0]]);
        }
        if (selected[0] === categories[1]) {
            uri = "den=N&";
            setPreSelected([categories[1]]);
        }
        if (!uri) {
            setPreSelected([]);
            setActive(false);
            dispatch(clearDenUri());
            handleClose();
            return;
        }
        setActive(true);
        dispatch(setDenUri(uri));
        handleClose();
    };

    const handleClear = () => {
        setPreSelected([]);
        setActive(false);
        dispatch(clearDenUri());
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
                Den
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
            >
                <DialogTitle>Den</DialogTitle>
                <DialogContent>
                    {categories.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            onClick={() =>
                                selected[0] === name
                                    ? setSelected([])
                                    : setSelected([name])
                            }
                        >
                            <Checkbox checked={selected[0] === name} />
                            <ListItemText
                                primary={name === "Y" ? "Yes" : "No"}
                            />
                        </MenuItem>
                    ))}
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
