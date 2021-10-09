import React from 'react'
import {Button} from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles=makeStyles(()=>({
  button:{
    top:'50%' ,
    left:'50%',
    position:'fixed',
    transform:'translate(-50%,-50%)'
  }
}))

const loginUrl =
  "https://accounts.spotify.com/authorize?client_id=09043c69448c454b939ca8e9a058eb72&response_type=code&redirect_uri=http://localhost:3000&scope=playlist-modify-private%20playlist-read-private%20playlist-modify-public%20playlist-read-collaborative%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-library-modify%20user-library-read%20streaming";

const Login = () => {
   const classes=useStyles()
    return (
      <div className={classes.button}>
        <Button
          onClick={(e) => {
            window.location.href = loginUrl;
          }}
           variant='contained' color='success'>
          Login with Spotify
        </Button>
      </div>
    );
}

export default Login

