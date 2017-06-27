import React from 'react'
import Table from './components/Table.js'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <div className='table-container'>
          <Table />
        </div>
      </div>
    )
  }
}

export default App
