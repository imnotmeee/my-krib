import { Checkbox, Grid, ListItemText, MenuItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';

let strs = "residential";

const LinkedHomesClass = ({setGetClass}) => {
    const [selected, setSelected] = React.useState('');

    useEffect(() => {
        setGetClass(selected ? `class=${selected}&` : '');
    }, [selected])

    return (
        <Grid sx={{ml: 3, mr: 2}}>
            <Typography variant='body2'>Class</Typography>
            {strs.split(',').map((val) => (
                <Grid key={val}>
                    <MenuItem value={val} onClick={()=> val ===selected ? setSelected('') : setSelected(val)}>
                        <Checkbox checked={val === selected}/>
                        <ListItemText primary={val} />
                    </MenuItem>
                </Grid>
            ))}
        </Grid>
    )
}

export default LinkedHomesClass