import { HighlightOffOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { registerCall } from '../../../axios/authCalls';
import InputField from './utils/InputField';

export default function RegisterDialog({handleCloseAll, handleDispatch}) {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseRegisterAndLogin = () => {
    handleCloseAll();
    setOpen(false);
  }

  const handleSubmit = (values, {setErrors}) => {
    registerCall(values).then(res => {
      const data = res.data;
      if(!data.success){
        setErrors({[data.field]: data.message});
        return;
      }
      handleDispatch(data);
      handleCloseRegisterAndLogin()
    })
  }

  return (
    <div>
      <Typography variant='overline' sx={{textTransform: 'capitalize', cursor: 'pointer', color: blue[600]}} onClick={handleClickOpen}>Sign Up</Typography>
      
      <Dialog open={open} 
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
      >
          <IconButton sx={{position: 'absolute', top: 1, right: 1}} onClick={handleCloseRegisterAndLogin}>
            <HighlightOffOutlined/>
          </IconButton>

          <Grid sx={{textAlign: 'center', py: 2, px: 5}}>
            <Typography variant='h6' sx={{mt: 3}}>Welcome to Krib</Typography>
            <Typography variant='h6' sx={{color: blue[500]}}>Become a member</Typography>
          </Grid>

          <Grid sx={{bgcolor: '#e3e3e3'}}>
            <Grid sx={{px: 4, py: 3}}>
              <Formik initialValues={{name: '', email: '', password: ''}} onSubmit={handleSubmit}>
                <Form>
                  <InputField name={'name'} placeholder="Username"/>
                  <InputField name={'email'} placeholder='Email Address'/>
                  <InputField name={'password'} placeholder="Password"/>

                  <Button type='submit' variant='contained' fullWidth sx={{py: 1.5, mt: 2, textTransform: 'capitalize'}}>Sign Up</Button>
                  
                  <Grid display='flex' flexDirection='row' alignItems='center' justifyContent='center' mt={3}>
                    <Typography sx={{fontSize: '13px', mr: 1}}>Have an account? </Typography>
                    <Typography variant='overline' sx={{textTransform: 'capitalize', cursor: 'pointer', color: blue[600]}} onClick={handleClose}>Sign In</Typography>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>

      </Dialog>
    </div>
  );
}
