import { Checkbox, Grid, ListItemText, MenuItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';


let strs = "Condo Townhouse";

const StackedTownHouseCondo = ({setTypes}) => {
    const [propType, setPropTypeVals] = React.useState('');


    const handleClick = (val, isIn) => {
        setPropTypeVals(prev => {
            if (isIn)
                return prev.replace(!prev.includes(',') ? val : `,${val}`, '');
            else {
                prev += (!prev ? val : "," + val);
                return prev;
            }
        });
    }

    useEffect(() => {
        let uri = '';
        const hasType = propType.length !== 0;
        uri = hasType ? uri += (propType.split(",").map((n, i) => `propertyType${[i]}=${n}&`)) : '';
        setTypes(uri)
    }, [propType])

    return (
        <Grid sx={{ml: 3, mr: 2}} borderBottom='1px solid #c0c0c0'>
            <Typography variant='body2' mt='1'>Types</Typography>
            {strs.split(',').map((val) => (
                <Grid key={val}>
                    <MenuItem value={val} onClick={() => handleClick(val, propType.includes(val))}>
                        <Checkbox checked={propType.includes(val)}/>
                        <ListItemText primary={val} />
                    </MenuItem>
                </Grid>
            ))}
        </Grid>
    )
}

export default StackedTownHouseCondo