import React from 'react'
import Header from './Header.js'
import Table from './Table.js'
import MockAPI from '../api/FakeAPI.js'

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

const TABLE = Object.freeze({
  SHOP: 'shop',
  GIFT: 'gift',
  ITEMIZATION: 'itemization'
})

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      table: TABLE.SHOP,
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
        <Header table={table} tables={TABLE} clickHandler={setTable} />

        <div className='table-container'>
          <SearchBar changeHandler={setFilter} />
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default App
