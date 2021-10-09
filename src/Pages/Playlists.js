import React, { useContext, useState } from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import SpotifyPlayer from "react-spotify-web-playback";
import { AppContext } from '../Context/DataContext';
const useStyles=makeStyles(()=>({
    card:{
        margin:'5px'
    }
}))

const Playlists = ({props}) => {
    const classes=useStyles()
    const {accessToken}=useContext(AppContext)
    const [songUri,setSongUri]=useState()
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {props.map((playlist) => {
            return (
              <Grid item xs={2} key={playlist.uri}>
                <Card className={classes.card}>
                  <ButtonBase onClick={() => setSongUri(playlist.uri)}>
                    <div>
                      <CardMedia
                        component="img"
                        height="230"
                        image={playlist.image}
                        alt="album art"
                      />
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="slategray"
                          align="center"
                        >
                          <Box component="span" fontStyle="italic">
                            {" "}
                            Name:{playlist.name}
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="slategray"
                          align="center"
                        >
                          Owner:{playlist.owner}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="slategray"
                          align="center"
                        >
                          Total tracks:{playlist.totalTracks}
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

export default Playlists
