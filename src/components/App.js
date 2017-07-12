import React from 'react'
import Table from './Table.js'

class ItemizationTable extends Table {

}

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

  renderTable () {
    // column label should map to a field in an instance of data
    const columns = require('../assets/data/itemizations.columns.json')
    const data = require('../assets/data/itemizations.json')

    return <Table columns={columns} data={data} searchTerm={this.state.searchTerm} />
      // return <ItemizationTable searchTerm={this.state.searchTerm} />

      // switch (this.state.table) {
      //   case 'itemization':
      //     return <ItemizationTable searchTerm={this.state.searchTerm} />
      // }
  }

  render () {
    return (
      <div className='App'>
        <div className='app-header'>
          <h2 className='title'>Persona 5: Items</h2>
        </div>

        <div className='table-container'>
          <SearchBar changeHandler={this.filterSearch.bind(this)} />
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default App
