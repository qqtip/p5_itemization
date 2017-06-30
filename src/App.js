import React from 'react'
import TableContainer from './components/TableContainer.js'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <div className='app-header'>
          <h2 className='title'>Persona 5: The Electric Chair</h2>
        </div>

        <TableContainer />
      </div>
    )
  }
}

export default App
