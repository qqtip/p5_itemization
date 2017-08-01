import React from 'react'
import AppHeader from './AppHeader.js'
import Table from './Table.js'
import api from '../utils/FakeAPI.js'

/* Enum for currently supported tables. */
const TABLE = Object.freeze({
  SHOP: 'shop',
  GIFT: 'gift',
  ITEMIZATION: 'itemization'
})

/** The top level app container. */
class App extends React.Component {
  constructor () {
    super()

    // bind this App to its change handlers
    this.setPattern = this.setPattern.bind(this)
    this.setTable = this.setTable.bind(this)

    this.state = {
      table: TABLE.SHOP,
      searchPattern: ''
    }
  }

  /** Sets the current search string used to filter. */
  setPattern (event) {
    this.setState({searchPattern: event.target.value})
  }

  /** Sets the current display table and updates. */
  setTable (table) {
    this.setState({table: table})
  }

  /** Renders the search bar that accepts user input. */
  renderSearchBar () {
    const changeHandler = this.setPattern.changeHandler

    return (
      <input
        id='search-bar'
        className='search'
        placeholder='Search'
        onChange={changeHandler}
      />
    )
  }

  /** Render the table contained in the app. */
  renderTable () {
    const table = this.state.table
    const data = api.get.data(table)
    const schema = api.get.schema(table)
    const searchPattern = this.state.searchPattern

    return <Table data={data} schema={schema} searchPattern={searchPattern} />
  }

  /** Renders the component. */
  render () {
    const table = this.state.table
    const setTable = this.setTable

    return (
      <div className='App'>
        <AppHeader table={table} tables={TABLE} clickHandler={setTable} />

        <div className='table-container'>
          {this.renderSearchBar()}
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default App
