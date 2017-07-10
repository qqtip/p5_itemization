import React from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'

import jquery from 'jquery'
window.$ = window.jQuery = jquery
require('sticky-table-headers')

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
    // filter then sort data
    this.setState({data:
      this.sort(
        this.filter(newProps.searchTerm.toLowerCase())
      )
    })
  }

  componentDidMount () {
    // initialize the table header to stick when scrolling
    jquery('table.table').stickyTableHeaders()
  }

  filter (filterText) {
    const completeData = require('../assets/data/rows.json')
    let data = []

    for (let item of completeData.slice()) {
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
    // reverse sorting order if the same column is selected
    if (this.sortColumn === column) {
      this.sortReverse = !this.sortReverse
    // otherwise sort by the new column
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
      // sort numerically for level column
      if (sortColumn === 'level') {
        return (this.sortReverse)
          ? b[sortColumn] - a[sortColumn]
          : a[sortColumn] - b[sortColumn]
      // sort lexicographically for other columns
      } else {
        return (this.sortReverse)
          ? b[sortColumn].localeCompare(a[sortColumn])
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
