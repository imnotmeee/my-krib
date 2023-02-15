import { HighlightOffOutlined, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { loginCall } from '../../../axios/authCalls';
import useAuth from '../../../hooks/useAuth';
import RegisterDialog from './RegisterDialog';
import InputField from './utils/InputField';

export default function AuthDialog() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  }
  
  const {storeData} = useAuth();
  
  const handleDispatch = (data) => {
    storeData({data})
  }

  const handleSubmit = (values) => {
    setLoading(true);
    loginCall(values).then(res => {
      setLoading(false);
      const data = res.data;
      if(!data.success){
        setError(data.errors)
        return;
      }
      handleDispatch(data);
      handleClose();
    });
  }

  return (
    <div>
      <Typography variant='overline' sx={{textTransform: 'capitalize', cursor: 'pointer'}} onClick={handleClickOpen}>Sign in</Typography>
      
      <Dialog open={open} 
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
      >
          <IconButton sx={{position: 'absolute', top: 1, right: 1}} onClick={handleClose}>
            <HighlightOffOutlined/>
          </IconButton>

          <Grid sx={{textAlign: 'center', py: 2, px: 5}}>
            <Typography variant='h6' sx={{mt: 3}}>Welcome to Krib</Typography>
            <Typography variant='h6' sx={{color: blue[500]}}>Sign In to continue</Typography>
          </Grid>

          <Grid sx={{bgcolor: '#e3e3e3'}}>
            <Grid sx={{px: 4, py: 3}}>
              <Formik initialValues={{email: '', password: ''}} onSubmit={handleSubmit}>
                <Form>
                  <InputField name={'email'} placeholder='Email Address'/>
                  <InputField name={'password'} placeholder="Password"/>

                  {
                    loading ? 
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<Save />}
                      variant="contained"
                      fullWidth
                      sx={{py: 1.5, mt: 2, textTransform: 'capitalize'}}
                    >
                      Loading ...
                    </LoadingButton> :
                    <Button type='submit' variant='contained' fullWidth sx={{py: 1.5, mt: 2, textTransform: 'capitalize'}}>Login</Button>                    
                  }

                  <Grid display='flex' flexDirection='row' alignItems='center' justifyContent='center' mt={3}>
                    <Typography sx={{fontSize: '13px', mr: 1}}>New to Krib? </Typography>
                    <RegisterDialog handleCloseAll={handleClose} handleDispatch={handleDispatch}/>
                  </Grid>
                  
                  {error ? <Typography variant='body2' sx={{textAlign: 'center', my: 3, color: red[400]}}>{error}</Typography> : undefined}

                </Form>
              </Formik>
            </Grid>
          </Grid>

      </Dialog>
    </div>
  );
}
