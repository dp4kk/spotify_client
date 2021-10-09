import React, { useContext } from 'react'
import { AppContext } from '../Context/DataContext'
import Dashboard from './Dashboard'
import Login from './Login'
const Main = () => {
    const {code}=useContext(AppContext)
    return (
        <React.Fragment>
       { code ? <Dashboard/> : <Login/> }
       </React.Fragment>
    )
}

export default Main
