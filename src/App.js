import React from 'react'
import Header from './Header.js'
import TableContainer from './TableContainer.js'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <TableContainer />
      </div>
    )
  }
}

export default App
