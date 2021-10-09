
import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import SpotifyPlayer from 'react-spotify-web-playback'
import { AppContext } from '../Context/DataContext'
const useStyles =makeStyles(()=>({
    root:{
        margin:'5px'
    }
}))
const Tracks = ({props}) => {
        const classes=useStyles()
        const {accessToken}=useContext(AppContext)
        const [songUri,setSongUri]=useState()

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {props.map((track) => {
            return (
              <Grid item xs={2} key={track.uri}>
                <Card className={classes.root} >
                  <ButtonBase onClick={()=>setSongUri(track.uri)}>
                    <div>
                      <CardMedia
                        component="img"
                        height="230"
                        image={track.image}
                        alt="album art"
                      />
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="lightslategray"
                          align="center"
                        >
                          <Box component="span" fontStyle="italic">
                            {track.title}
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="lightslategray"
                          align="center"
                        >
                          {track.artist}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="lightslategray"
                          align="center"
                        >
                          Popularity:{track.popularity}
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
          autoPlay='false'
          persistDeviceSelection='false'
          syncExternalDevice='false'
         /> 
      </React.Fragment>
    );
}

export default Tracks

// <Button onClick={()=>setSongUri(track.uri)} size='small' color='primary' variant='outlined'>
//   Play
// </Button>
