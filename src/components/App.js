import React from 'react'
import Table from './Table.js'

class SearchBar extends React.Component {
  render () {
    const changeHandler = this.props.changeHandler

    return (
      <input id='search-bar'
        className='search'
        placeholder='Search'
        onChange={changeHandler}
      />
    )
  }
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      table: 'itemization',
      searchTerm: ''
    }
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
          <SearchBar changeHandler={this.filterSearch.bind(this)} />
          <Table searchTerm={this.state.searchTerm} />
        </div>
      </div>
    )
  }
}

export default App
