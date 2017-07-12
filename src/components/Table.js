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

    const data = this.completeData()
    this.state = { data: data }
  }

  completeData () {
    return require('../assets/data/itemizations.json')
  }

  /* update data when this Table receives a new search term */
  componentWillReceiveProps (newProps) {
    // filter data by the new search term then sort by column
    this.setState({data:
      this.sort(
        this.filter(
          this.completeData(),
          newProps.searchTerm.toLowerCase()
        )
      )
    })
  }

  /* initialize the table header to stick when scrolling */
  componentDidMount () {
    jquery('table.table').stickyTableHeaders()
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

    this.setState({data: this.sort(this.state.data)})
  }

  /* sorts the given data by the current sorting column */
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

  /* filters the given data filtered by the given text and returns it */
  filter (data, filterText) {
    let filteredData = []

    for (let item of data.slice()) {
      if (item.arcana.toLowerCase().search(filterText) >= 0 ||
          item.persona.toLowerCase().search(filterText) >= 0 ||
          item.itemization.toLowerCase().search(filterText) >= 0 ||
          item.category.toLowerCase().search(filterText) >= 0) {
        filteredData.push(item)
      }
    }

    return filteredData
  }

  render () {
    return (
      <table className='table'>
        <TableHeader clickHandler={this.setSortingColumn} />
        <TableBody data={this.state.data} />
      </table>
    )
  }
}

export default Table
