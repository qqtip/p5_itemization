import React from 'react'
import SearchBar from './SearchBar.js'
import Table from './Table.js'

class App extends React.Component {
  constructor () {
    super()

    this.state = {searchTerm: ''}
  }

  filterSearch (event) {
    this.setState({searchTerm: event.target.value})
  }

  render () {
    return (
      <div className='App'>
        <div className='app-header'>
          <h2 className='title'>Persona 5: The Electric Chair</h2>
        </div>

        <div className='table-container'>
          <SearchBar onChange={this.filterSearch.bind(this)} />
          <Table searchTerm={this.state.searchTerm} />
        </div>
      </div>
    )
  }
}

export default App
