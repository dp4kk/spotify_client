import { Grid,Card, CardMedia, CardContent, Typography, ButtonBase } from '@mui/material'
import React,{useContext, useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import SpotifyPlayer from "react-spotify-web-playback";
import { AppContext } from '../Context/DataContext';
const useStyles=makeStyles(()=>({
    card:{
        margin:'5px'
    }
}))

const Artists = ({props}) => {
    const classes=useStyles()
    const {accessToken}=useContext(AppContext)
    const [songUri,setSongUri]=useState()
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {props.map((artist) => {
            return (
              <Grid item xs={2} key={artist.uri}>
                <Card className={classes.card}>
                  <ButtonBase onClick={() => setSongUri(artist.uri)}>
                    <div>
                      <CardMedia
                        component="img"
                        height="230"
                        image={artist.image}
                        alt="album art"
                      />
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="slategrey"
                          borderColor="green"
                          gutterBottom
                        >
                          <Box component="span" fontStyle="italic">
                            Name:{artist.artist}
                          </Box>
                        </Typography>
                        <Typography variant="body2" color="slategrey">
                          Genre:{artist.genres}
                        </Typography>
                      </CardContent>
                    </div>
                  </ButtonBase>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <SpotifyPlayer
          token={accessToken}
          uris={songUri ? [songUri] : []}
          autoPlay="false"
          persistDeviceSelection="false"
          syncExternalDevice="false"
        />
      </React.Fragment>
    );
}

export default Artists
