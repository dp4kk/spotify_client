import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/DataContext'
import SpotifyWebApi from 'spotify-web-api-node'
import { Button, createTheme, TextField, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import {Route,Switch,useHistory} from 'react-router-dom'
import Tracks from '../Pages/Tracks';
import Artists from '../Pages/Artists';
import Playlists from '../Pages/Playlists';

const theme=createTheme()
const useStyles=makeStyles(()=>({
    search:{
        position:'relative',
        width:'50%',
        left:'25%',
        height:'30px',

    },
    button:{
        display:'flex',
        justifyContent:'center',
        marginTop:theme.spacing(6)
    },
}))


const spotifyApi = new SpotifyWebApi({
  clientId: "09043c69448c454b939ca8e9a058eb72",
});
const Dashboard = () => {
    const classes=useStyles()
    const history=useHistory()
    const {accessToken}=useContext(AppContext)
    const [search,setSearch]=useState('')
    const [trackData,setTrackData]=useState([])
    const [artistData,setArtistData]=useState([])
    const [playlistData,setPlaylistData]=useState([])
    useEffect(()=>{
        if(accessToken){spotifyApi.setAccessToken(accessToken)}
    },[accessToken])
    
   


    const handleSubmit=(e)=>{
      e.preventDefault();
    
        spotifyApi.searchTracks(`${search}`).then((data)=>{
            setTrackData(data.body.tracks.items.map(track=>{
                return{
                    title:track.name,
                    artist:track.artists[0].name,
                    popularity:track.popularity,
                    image:track.album.images[0].url,
                    uri:track.uri,
                    id:track.duration_ms
                }
            }))
        }).catch(err=>{
            console.log(err)
        })

        spotifyApi.searchArtists(`${search}`).then((data)=>{
            setArtistData(data.body.artists.items.map(artist=>{
                return{
                     artist:artist.name,
                     popularity:artist.popularity,
                    image:artist.images[0].url,
                    uri:artist.uri,
                    genres:artist.genres.toString()
                }
            }))
        }).catch(err=>{
            console.log(err)
        })

        spotifyApi.searchPlaylists(`${search}`).then((data)=>{
            setPlaylistData(data.body.playlists.items.map(playlist=>{
                    
                return{
                   name:playlist.name,
                    image:playlist.images[0].url,
                   totalTracks:playlist.tracks.total,
                   uri:playlist.uri,
                   owner:playlist.owner.display_name
                }
            }))
        }).catch(err=>{
            console.log(err)
        })
            
         
        

    }
    
    return (
      <React.Fragment>
        <Typography variant="h2" align="center" color="green">
          Spotify Music
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classes.search}
            label="Search"
            placeholder="Search track/Artists/Playlist"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            variant="filled"
            spellCheck='false'
          />
        </form>

        <div className={classes.button}>
          <Button onClick={() => history.push("/dashboard/tracks")}>
            tracks
          </Button>
          <Button onClick={() => history.push("/dashboard/Artist")}>
            Artist
          </Button>
          <Button onClick={() => history.push("/dashboard/Playlist")}>
            Playlist
          </Button>
        </div>
        <Switch>
          <Route
            path="/dashboard/tracks"
            component={() => <Tracks props={trackData} />}
          />
          <Route
            path="/dashboard/artist"
            component={() => <Artists props={artistData} />}
          />
          <Route
            path="/dashboard/playlist"
            component={() => <Playlists props={playlistData} />}
          />
        </Switch>
      </React.Fragment>
    );}

export default Dashboard
