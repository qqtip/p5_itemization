import React from 'react'
import Header from './Header.js'
import TableContainer from './TableContainer.js'
import './App.css'

class App extends React.Component {
  render () {
    const title = 'Persona 5 Itemization Lookup'

    return (
      <div className='App'>
        <Header title={title} />

        <TableContainer />
      </div>
    )
  }
}

export default App
