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
    clearActiveStatusUri,
    setActiveStatusUri,
} from "../../../store/reducers/uri_slice";

const categories = [
    "For Sale", // 0
    "For Lease", // 1
    "Leased", // 2
    "Leased Conditionally", // 3
    "Sold", // 4
    "Sold Conditionally", // 5
    "Terminated/Suspended", // 6
    "For Sale & Recently Sold (90 days)", // 7
];
export default function ActiveStatus() {
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState([categories[0]]);
    const [preSelected, setPreSelected] = React.useState([categories[0]]);

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseClear = () => {
        active ? setSelected(preSelected) : undefined;
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
        //  For Sale
        if (selected.includes(categories[0])) {
            uri += `lastStatus1=New&lastStatus2=Pc&lastStatus3=Exp&lastStatus4=Dft&`;
            uri += "type1=sale&status1=A&";
            setPreSelected((prev) => [...prev, categories[0]]);
        }
        // For Lease
        if (selected.includes(categories[1])) {
            if (!selected.includes(categories[0])) {
                uri += `lastStatus1=New&lastStatus2=Pc&lastStatus3=Exp&lastStatus4=Dft&`;
            } else {
                uri = uri.replace(
                    "lastStatus1=New&lastStatus2=Pc&lastStatus3=Exp&lastStatus4=Dft&",
                    ""
                );
            }
            uri += "type2=lease&status1=A&";
            setPreSelected((prev) => [...prev, categories[1]]);
        }
        // Leased
        if (selected.includes(categories[2])) {
            uri += "lastStatus5=Lsd&";
            uri += "type2=lease&status2=U&";
            setPreSelected((prev) => [...prev, categories[2]]);
        }
        // Leased Conditionally
        if (selected.includes(categories[3])) {
            // uri += ""; // NO VALUE
            uri += "type2=lease&status1=A";
            setPreSelected((prev) => [...prev, categories[3]]);
        }
        // Sold
        if (selected.includes(categories[4])) {
            uri += "lastStatus6=Sld&";
            uri += "type1=sale&status2=U&";
            setPreSelected((prev) => [...prev, categories[4]]);
        }
        // Sold Conditionally
        if (selected.includes(categories[5])) {
            uri += "lastStatus7=Sc&lastStatus8=Sce&";
            uri += "type1=sale&status1=A&";
            setPreSelected((prev) => [...prev, categories[5]]);
        }
        // Terminated/Suspended
        if (selected.includes(categories[6])) {
            uri += "lastStatus9=Sus&lastStatus10=Ter&";
            uri += "status1=A&status2=U&";
            setPreSelected((prev) => [...prev, categories[6]]);
        }
        // For Sale & Recently Sold (90 days)
        if (selected.includes(categories[7])) {
            // Sold Date under 90 days - unsure what filter to use
            uri +=
                "lastStatus11=New&lastStatus12=Pc&lastStatus13=Ext&lastStatus14=Dft&lastStatus6=Sld&";
            uri += "status1=A&status2=U&";
            setPreSelected((prev) => [...prev, categories[7]]);
        }
        if (!uri) {
            setPreSelected([]);
            setActive(false);
            dispatch(clearActiveStatusUri());
            handleClose();
            return;
        }
        setActive(true);
        uri = uri.replaceAll(",", "");
        dispatch(setActiveStatusUri(uri));
        handleClose();
    };

    const handleClear = () => {
        setPreSelected([]);
        setActive(false);
        dispatch(clearActiveStatusUri());
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
                Active Status
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Active Status</DialogTitle>
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
