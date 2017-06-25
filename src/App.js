import React from 'react'
import PageHeader from './PageHeader.js'
import Table from './Table.js'
import './App.css'

class App extends React.Component {
  render () {
    const title = 'Persona 5 Itemization Lookup'

    return (
      <div className='App'>
        <PageHeader title={title} />

        <div className='table-container'>
          <Table />
        </div>
      </div>
    )
  }
}

export default App
