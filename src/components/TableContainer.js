import React from 'react'
import Table from './Table.js'
import SearchBar from './SearchBar.js'

class TableContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      searchTerm: ''
    }
  }

  filterSearch (event) {
    this.setState({searchTerm: event.target.value})
  }

  render () {
    return (
      <div className='table-container'>
        <SearchBar onChange={this.filterSearch.bind(this)} />
        <Table searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default TableContainer
