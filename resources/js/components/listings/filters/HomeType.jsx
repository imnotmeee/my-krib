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
    clearHomeTypeUri,
    setHomeTypeUri,
} from "../../../store/reducers/uri_slice.js";

const categories = [
    "All-Property-Types", // 0
    "Detached", // 1
    "Semi-Detached", // 2
    "Multi-Unit Homes", // 3
    "Freehold Townhouse", // 4
    "Condo Townhouse", // 5
    "Condo Apartment", // 6
    "Linked Homes", // 7
    "Stacked-Townhouse-Condo", // 8
];

export default function HomeType() {
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
        if (selected.includes(categories[0])) {
            uri += `
                        propertyType1=Detached
                        &propertyType2=Condo Apt
                        &propertyType3=Att/Row/Twnhouse
                        &propertyType4=Semi-Detached
                        &propertyType5=Condo Townhouse
                        &propertyType6=Comm Element Condo
                        &propertyType7=Duplex
                        &propertyType8=Multiplex
                        &propertyType9=Lower Level
                        &propertyType10=Link
                        &propertyType11=Triplex
                        &propertyType12=Other
                        &propertyType13=Upper Level
                        &propertyType14=Cottage
                        &propertyType15=Rural Resid
                        &propertyType16=Co-Op Apt
                        &propertyType17=Store W/Apt/Offc
                        &propertyType18=Fourplex
                        &propertyType19=Det Condo
                        &propertyType20=Co-Ownership Apt
                        &propertyType21=Semi-Det Condo
                        &propertyType22=Leasehold Condo
                        &propertyType23=Room
                        &propertyType24=Shared Room
                        &propertyType25=Phased Condo
                        &propertyType26=Apartment
                        &propertyType27=Condo Apartment
                        &propertyType28=Semi&`;
            uri += "class1=residential&class2=condo&";
            setPreSelected((prev) => [...prev, categories[0]]);
        }
        if (selected.includes(categories[1])) {
            uri +=
                "propertyType1=Detached&propertyType19=Det Condo&propertyType14=Cottage&propertyType15=Rural Resid&";
            uri += "class1=residential&class2=condo&";
            setPreSelected((prev) => [...prev, categories[1]]);
        }
        if (selected.includes(categories[2])) {
            uri +=
                "propertyType4=Semi-Detached&propertyType21=Semi-Det Condo&propertyType14=Cottage&propertyType28=Semi&";
            uri += "class1=residential&class2=condo&";
            setPreSelected((prev) => [...prev, categories[2]]);
        }
        if (selected.includes(categories[3])) {
            uri +=
                "propertyType7=Duplex&propertyType11=Triplex&propertyType18=Fourplex&propertyType8=Multiplex&";
            uri += "class1=residential&";
            setPreSelected((prev) => [...prev, categories[3]]);
        }
        if (selected.includes(categories[4])) {
            uri += "propertyType3=Att/Row/Twnhouse&";
            uri += "class1=residential&";
            setPreSelected((prev) => [...prev, categories[4]]);
        }
        if (selected.includes(categories[5])) {
            uri += "properyType5=Condo Townhouse&";
            uri += "class2=condo&";
            setPreSelected((prev) => [...prev, categories[5]]);
        }
        if (selected.includes(categories[6])) {
            uri += `propertyType2=Condo Apt&
                propertyType6=Comm Element Condo&
                propertyType16=Co-Op Apt&
                propertyType20=Co-Ownership Apt&
                propertyType25=Phased Condo&
                propertyType26=Apartment&
                propertyType27=Condo Apartment&`;
            uri += "class2=condo&";
            setPreSelected((prev) => [...prev, categories[6]]);
        }
        if (selected.includes(categories[7])) {
            uri += "propertyType10=Link&";
            uri += "class1=residential&";
            setPreSelected((prev) => [...prev, categories[7]]);
        }
        if (selected.includes(categories[8])) {
            uri += "propertyType5=Condo Townhouse&";
            uri += "class2=condo&";
            uri += "style=Stacked Townhouse&";
            setPreSelected((prev) => [...prev, categories[8]]);
        }
        if (!uri) {
            setPreSelected([]);
            setActive(false);
            dispatch(clearHomeTypeUri());
            handleClose();
            return;
        }
        setActive(true);
        dispatch(setHomeTypeUri(uri));
        handleClose();
    };

    const handleClear = () => {
        setPreSelected([]);
        setActive(false);
        dispatch(clearHomeTypeUri());
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
                Home Type
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Home Type</DialogTitle>
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

// import React, { useState } from 'react';

// import { Box, Grid } from '@mui/material';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import MenuItem from '@mui/material/MenuItem';

// import AllPropertyTypes from './hometypes/AllPropertyTypes';
// import Detached from './hometypes/Detached'
// import SemiDetached from './hometypes/SemiDetached'
// import MultiUnitHomes from './hometypes/MultiUnitHomes'
// import FreeHoldTownHouse from './hometypes/FreeHoldTownHouse'
// import CondoTownHouse from './hometypes/CondoTownHouse'
// import CondoApartment from './hometypes/CondoApartment'
// import LinkedHomes from './hometypes/LinkedHomes'
// import StackedTownHouseCondo from './hometypes/StackedTownHouseCondo'

// import AllPropertyTypesClass from './hometypes/class/AllPropertyTypesClass';
// import CondoApartmentClass from './hometypes/class/CondoApartmentClass';
// import CondoTownHouseClass from './hometypes/class/CondoTownHouseClass';
// import DetachedClass from './hometypes/class/DetachedClass';
// import FreeHoldTownHouseClass from './hometypes/class/FreeHoldTownHouseClass';
// import LinkedHomesClass from './hometypes/class/LinkedHomesClass';
// import MultiUnitHomesClass from './hometypes/class/MultiUnitHomesClass';
// import SemiDetachedClass from './hometypes/class/SemiDetachedClass';
// import StackedTownHouseCondoClass from './hometypes/class/StackedTownHouseCondoClass';

// const categories = [
//     'All-Property-Types',    // 0
//     'Detached',              // 1
//     'Semi-Detached',         // 2
//     'Multi-Unit Homes',      // 3
//     'Freehold Townhouse',    // 4
//     'Condo Townhouse',       // 5
//     'Condo Apartment',       // 6
//     'Linked Homes',          // 7
//     'Stacked-Townhouse-Condo'// 8
// ];

// export default function HomeType({setUri}) {
//     const [open, setOpen] = useState(false);
//     const handleClickOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const [selected, setSelected] = React.useState('');
//     const [types, setTypes] = React.useState('');
//     const [getClass, setGetClass] = React.useState('');

//     const borderColor = '1px solid #e3e3e3';
//     const sx = {border: borderColor, borderRadius: '2px', ml: 2, px: 1, py: .5, color: '#333333', fontSize: '10px', textTransform: 'capitalize' }
//     const handleSet = () => {
//         setUri(getClass + types);
//         handleClose();
//     }
//     return (
//         <>
//             <Button variant="outlined" onClick={handleClickOpen} size="small" sx={sx}>Home Type</Button>

//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 fullWidth
//                 maxWidth="xs"
//             >
//                 <DialogTitle>Home Type</DialogTitle>
//                 <Box>
//                     <FormControl sx={{ width: '100%' }}>
//                         {categories.map((name) => (
//                             <Grid key={name}>
//                                 <MenuItem value={name} onClick={()=> name===selected ? setSelected('') : setSelected(name)}>
//                                     <Checkbox checked={name === selected}/>
//                                     <ListItemText primary={name} />
//                                 </MenuItem>

//                                 {(name === categories[0] && name===selected) && <Grid>
//                                     <AllPropertyTypesClass setGetClass={setGetClass}/>
//                                     <AllPropertyTypes setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[1] && name===selected) && <Grid>
//                                     <DetachedClass setGetClass={setGetClass}/>
//                                     <Detached setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[2] && name===selected) && <Grid>
//                                     <SemiDetachedClass setGetClass={setGetClass}/>
//                                     <SemiDetached setTypes={setTypes}/>
//                                 </Grid>
//                                 }
//                                 {(name === categories[3] && name===selected) && <Grid>
//                                     <MultiUnitHomesClass setGetClass={setGetClass}/>
//                                     <MultiUnitHomes setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[4] && name===selected) && <Grid>
//                                     <FreeHoldTownHouseClass setGetClass={setGetClass}/>
//                                     <FreeHoldTownHouse setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[5] && name===selected) && <Grid>
//                                     <CondoTownHouseClass setGetClass={setGetClass}/>
//                                     <CondoTownHouse setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[6] && name===selected) && <Grid>
//                                     <CondoApartmentClass setGetClass={setGetClass}/>
//                                     <CondoApartment setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[7] && name===selected) && <Grid>
//                                     <LinkedHomesClass setGetClass={setGetClass}/>
//                                     <LinkedHomes setTypes={setTypes}/>
//                                 </Grid>}
//                                 {(name === categories[8] && name===selected) && <Grid>
//                                     <StackedTownHouseCondoClass setGetClass={setGetClass}/>
//                                     <StackedTownHouseCondo setTypes={setTypes}/>
//                                 </Grid>}
//                             </Grid>
//                         ))}
//                     </FormControl>
//                 </Box>

//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSet}>Set</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

//     // 'All-Property-Types',    // 0
//     // 'Detached',              // 1
//     // 'Semi-Detached',         // 2
//     // 'Multi-Unit Homes',      // 3
//     // 'Freehold Townhouse',    // 4
//     // 'Condo Townhouse',       // 5
//     // 'Condo Apartment',       // 6
//     // 'Linked Homes',          // 7
//     // 'Stacked-Townhouse-Condo'// 8

// // homeType.forEach(home => {
// //     if(home === categories[0]){
// //         let str = "Detached, Condo Apt, Att/Row/Twnhouse, Semi-Detached, Condo Townhouse, Comm Element Condo, Duplex, Multiplex, Lower Level, Link, Triplex, Other, Upper Level, Cottage, Rural Resid,Co-Op Apt, Store W/Apt/Offc, Fourplex, Det Condo, Co-Ownership Apt, Semi-Det Condo, Leasehold Condo, Room, Shared Room, Phased Condo, Apartment, Condo Apartment, Semi";
// //         uri += `${['residential', 'condo&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[1]){
// //         let str = "Detached, Det Condo, Cottage , Rural Resid";
// //         uri += `${['residential', 'condo&'].map((n, i) => `class}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[2]){
// //         let str = "Semi-Detached, Semi-Det Condo, Cottage , Semi";
// //         uri += `${['residential', 'class&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[3]){
// //         let str = "Duplex, Triplex, Fourplex, Multiplex";
// //         uri += `${['residential&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[4]){
// //         let str = "Att/Row/Twnhouse";
// //         uri += `${['residential&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[5]){
// //         let str = "Condo Townhouse";
// //         uri += `${['condo&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[6]){
// //         let str = "Condo Apt, Comm Element Condo, Co-Op Apt, Co-Ownership Apt, Phased Condo, Apartment, Condo Apartment";
// //         uri += `${['condo&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[7]){
// //         let str = "Link";
// //         uri += `${['residential&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //     }
// //     if(home === categories[8]){
// //         let str = "Condo Townhouse";
// //         uri += `${['condo&'].map((n, i) => `class${[i]}=${n}`).join('&')}`
// //         uri += (str.split(",").map((n, i) => `propertyType${[i]}=${n}`).join('&'));
// //         uri += `${['Stacked Townhse&'].map((n, i) => `style${[i]}=${n}`).join('&')}`
// //     }
// // })
// // setUri(uri);
// // handleClose();
// // }
