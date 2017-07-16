import React from 'react'
import Table from './Table.js'
import MockAPI from '../utils/MockAPI.js'

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

    this.tables = [
      'itemization',
      'gifts'
    ]

    this.state = {
      table: this.tables[0],
      searchTerm: ''
    }
  }

  setFilter (event) {
    this.setState({searchTerm: event.target.value})
  }

  renderTable () {
    const table = this.state.table
    const data = MockAPI.getData(table)
    const metadata = MockAPI.getMetadata(table)

    return (
      <Table
        data={data}
        metadata={metadata}
        searchTerm={this.state.searchTerm}
      />
    )
  }

  render () {
    const changeHandler = this.setFilter.bind(this)

    return (
      <div className='App'>
        <div className='app-header'>
          <h2 className='title'>Persona 5: Items</h2>
        </div>

        <div className='table-container'>
          <SearchBar changeHandler={changeHandler} />
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default App
