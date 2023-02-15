import React from 'react'
import { useField } from 'formik'
import { Grid, Typography } from '@mui/material'
import {TextField} from '@mui/material'
import { red } from '@mui/material/colors'

const InputField = ({name, placeholder}) => {
    const [fields, {error}] = useField(name)
    const type = name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'
    return (
        <Grid mb={1}>
            <TextField
                {...fields}
                type={type}
                error={!!error}
                hiddenLabel
                id={name}
                name={name}
                variant="filled"
                placeholder={placeholder}
                sx={{bgcolor: 'white'}}
                fullWidth
            />
            {!!error ? <Typography variant='body1' sx={{fontSize: '14px', ml: 1, color: red[300], textAlign: 'center'}}>{error}</Typography> : undefined}
        </Grid>
    )
}

export default InputField