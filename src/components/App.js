import React from 'react'
import Table from './Table.js'

import ITEMIZATION_DATA from '../assets/data/itemizations.data.json'
import ITEMIZATION_META from '../assets/data/itemizations.metadata.json'
import GIFT_DATA from '../assets/data/gifts.data.json'
import GIFT_META from '../assets/data/gifts.metadata.json'

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
    const table = this.state.table

    const data = () => {
      switch (table) {
        case 'itemization': default:
          return ITEMIZATION_DATA
        case 'gift':
          return GIFT_DATA
      }
    }

    const metadata = () => {
      switch (table) {
        case 'itemization': default:
          return ITEMIZATION_META
        case 'gift':
          return GIFT_META
      }
    }

    return (
      <Table
        data={data()}
        metadata={metadata()}
        searchTerm={this.state.searchTerm}
      />
    )
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
