import React from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'

class Table extends React.Component {
  constructor () {
    super()

    this.sortColumn = 'arcana'
    this.sortReverse = false
    this.setSortingColumn = this.setSortingColumn.bind(this)

    const data = this.filter('')
    this.state = { data: data }
  }

  componentWillReceiveProps (newProps) {
    this.setState({data:
      this.sort(
        this.filter(newProps.searchTerm.toLowerCase())
      )
    })
  }

  filter (filterText) {
    const ALL_DATA = require('../assets/data/rows.json')
    let data = []

    for (let item of ALL_DATA.slice()) {
      if (item.arcana.toLowerCase().search(filterText) >= 0 ||
          item.persona.toLowerCase().search(filterText) >= 0 ||
          item.itemization.toLowerCase().search(filterText) >= 0 ||
          item.category.toLowerCase().search(filterText) >= 0) {
        data.push(item)
      }
    }

    return data
  }

  setSortingColumn (column) {
    if (this.sortColumn === column) {
      this.sortReverse = !this.sortReverse
    } else {
      this.sortColumn = column
      this.sortedReverse = false
    }

    this.setState({data:
      this.sort(this.state.data)
    })
  }

  sort (data) {
    const sortColumn = this.sortColumn
    let newData = data.slice()

    newData.sort((a, b) => {
      if (this.sortReverse) {
        return (sortColumn === 'level')
          ? b[sortColumn] - a[sortColumn]
          : b[sortColumn].localeCompare(a[sortColumn])
      } else {
        return (sortColumn === 'level')
          ? a[sortColumn] - b[sortColumn]
          : a[sortColumn].localeCompare(b[sortColumn])
      }
    })

    return newData
  }

  render () {
    return (
      <table className='table'>
        <TableHeader onClick={this.setSortingColumn} />
        <TableBody data={this.state.data} />
      </table>
    )
  }
}

export default Table
