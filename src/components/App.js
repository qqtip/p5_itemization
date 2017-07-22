import React from 'react'
import Header from './Header.js'
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
      'shop',
      'gift',
      'itemization'
    ]

    const defaultTable = this.tables[0]

    this.state = {
      table: defaultTable,
      searchString: ''
    }
  }

  setFilter (event) {
    this.setState({searchString: event.target.value})
  }

  setTable (table) {
    this.setState({table: table})
  }

  renderTable () {
    const table = this.state.table
    const data = MockAPI.getData(table)
    const metadata = MockAPI.getMetadata(table)
    const searchString = this.state.searchString

    return <Table data={data} metadata={metadata} searchString={searchString} />
  }

  render () {
    const setFilter = this.setFilter.bind(this)
    const setTable = this.setTable.bind(this)
    const table = this.state.table

    return (
      <div className='App'>
        <Header table={table} tables={this.tables} clickHandler={setTable} />

        <div className='table-container'>
          <SearchBar changeHandler={setFilter} />
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default App
