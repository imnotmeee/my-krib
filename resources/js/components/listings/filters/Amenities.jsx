import React, {useState} from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sizes = [
    'Visitor Parking',
    'Guest Suite',
    'Pool',
    'Concierge',
    'Sauna',
    'Gym',
    'Recreational', 
    'Rooms',
    'Sports', 
    'Facilities'
];

export default function Amenities({setUri}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [amenitiesVals, setAmenitiesVals] = React.useState([]);

    const borderColor = '1px solid #e3e3e3';
    const sx = {border: borderColor, borderRadius: '2px', ml: 2, px: 1, py: .5, color: '#333333', fontSize: '10px', textTransform: 'capitalize' }

    const handleSet = () => {
        setUri(`${amenitiesVals.map((n, index) => `amenities[${index}]=${n}`).join('&')}`);
        handleClose();
    }

    const handleChange = (event) => {
        const {target: { value }} = event;
        setAmenitiesVals(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} size="small" sx={sx}>Amenities</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Amenities</DialogTitle>
                <DialogContent>

                    <Box width={300} py={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={amenitiesVals}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                                {sizes.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        <Checkbox checked={amenitiesVals.indexOf(size) > -1} />
                                        <ListItemText primary={size} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSet}>Set</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
