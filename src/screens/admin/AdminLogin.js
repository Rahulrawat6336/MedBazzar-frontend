import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { postData } from '../../services/FetchNodeService';
import Swal from 'sweetalert2';
import { json, useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Medbazzar.in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
  var navigate=useNavigate()

    const [emailid,setEmailid]=useState('ss@gmail.com')
    const [password,setPassword]=useState('12345')

    const handleClick=async()=>{

        var result=await postData('admin/check_admin_login',{emailid,password})
        if(result.status){
          localStorage.setItem('ADMIN',JSON.stringify(result.data))
            (navigate('/admindashboard'))
        }
        else{
            Swal.fire({
                icon: "Failed",
                title: result.message,
                timer: 1500,
                toast:true   
              });
        }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={emailid}
              name="email"
              autoComplete="email"
              onChange={(e)=>setEmailid(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e)=>setPassword(e.target.value)}
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              onClick={handleClick}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}