import React from 'react'
import Main from './Components/Main'
import DataContext from './Context/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
const App = () => {


  return (
    <Router>
    <DataContext>
      <Main/>
    </DataContext>
    </Router>
  )
}

export default App

