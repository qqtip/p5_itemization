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
      'gift'
    ]

    this.state = {
      table: this.tables[0],
      searchString: ''
    }
  }

  setFilter (event) {
    this.setState({searchString: event.target.value})
  }

  setTable (table) {
    this.setState({table: table})
  }

  renderNav () {
    const currentTable = this.state.table

    const navLinks = this.tables.map((name, index) => {
      const link = name.charAt(0).toUpperCase() + name.slice(1) + 's'
      let classes = ['navigation', 'nav-link']

      if (name === currentTable) {
        classes.push('current')
        return <a key={index} className={classes.join(' ')}>{link}</a>
      } else {
        const changeHandler = () => this.setState({table: name})
        return <a key={index} className={classes.join(' ')} href='' onClick={changeHandler}>{link}</a>
      }
    })

    return (
      <p className='navigation'>
        {navLinks.reduce((prev, curr) => [prev, ' - ', curr])}
      </p>
    )
  }

  renderTable () {
    const table = this.state.table
    const data = MockAPI.getData(table)
    const metadata = MockAPI.getMetadata(table)
    const searchString = this.state.searchString

    return <Table data={data} metadata={metadata} searchString={searchString} />
  }

  render () {
    const changeHandler = this.setFilter.bind(this)

    return (
      <div className='App'>
        <div className='app-header'>
          <h2 className='title'>Persona 5: Items</h2>
          {this.renderNav()}
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
