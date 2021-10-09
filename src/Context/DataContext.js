import React, { createContext ,useState,useEffect} from 'react'
import axios from 'axios'

export const AppContext=createContext()
const DataContext = ({children}) => {
    //login
    const [accessToken,setAccessToken]=useState()
    const [refreshToken,setRefreshToken]=useState()
    const [expiresIn,setExpiressIn]=useState()
    const code = new URLSearchParams(window.location.search).get("code");

    //for search
    const[search,setSearch]=useState('')

    useEffect(()=>{
        if(!code) return
        axios
          .post("https://spotify-music01.herokuapp.com/login", { code })
          .then((res) => {
            console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiressIn(res.data.expiresIn);
            window.history.pushState({}, "", "/dashboard");
          })
          .catch((err) => (window.location = "/"));
    },[code])

    useEffect(()=>{
        if(!refreshToken || !expiresIn ) return
        const interval=setInterval(()=>{   axios
          .post("https://spotify-music01.herokuapp.com/refresh", {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiressIn(res.data.expiresIn);
          })
          .catch((err) => console.log(err));},(expiresIn-60)*1000)
          
          return ()=> clearInterval(interval)
    },[refreshToken,expiresIn])

    const contexts={code,accessToken,search,setSearch}
    return (
        <AppContext.Provider value={contexts}>
            {children}
        </AppContext.Provider>
    )
}

export default DataContext
