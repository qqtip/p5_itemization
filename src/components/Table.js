import React from 'react'
import jquery from 'jquery'

import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'
import filter from '../utils/filter.js'

/** A sortable table that displays data defined by a schema. */
class Table extends React.Component {
  /* props */
  // data
  // schema
  //  columns
  //  default sort column
  // searchPattern

  constructor (props) {
    super()

    // Initialize jQuery and sticky table headers
    window.$ = window.jQuery = jquery
    require('sticky-table-headers')

    // Initialize the table
    this.setSortingColumn = this.setSortingColumn.bind(this)
    this.initTable(props)
  }

  /** Initializes the table when mounted or changed. */
  initTable (props) {
    const columns = props.schema.columns
    const sortColumnIndex = props.schema.defaultSortColumnIndex || -1
    this.sortColumn = sortColumnIndex >= 0 ? columns[sortColumnIndex] : null
    this.sortReverse = false

    this.state = { data: filter(props.data, columns, props.searchPattern) }
  }

  /** Initialize the sticky table headers when the component mounts. */
  componentDidMount () {
    jquery('table.table').stickyTableHeaders()
  }

  /** Reset sticky table headers when the table size changes. */
  componentDidUpdate () {
    jquery('table.table').stickyTableHeaders('destroy')
    this.componentDidMount()
  }

  /** Checks and responds to updated props. */
  componentWillReceiveProps (newProps) {
    // Reinitialize the table if the table was switched
    if (this.props.schema !== newProps.schema) {
      this.initTable(newProps)
    } else {
      // Filter the data by the new search pattern
      const data = filter(
        newProps.data.slice(),
        newProps.schema.columns,
        newProps.searchPattern
      )
      // Sort data if a sorting column is set then update state
      this.setState({
        data: this.sortColumn ? this.sort(data) : data
      })
    }
  }

  /** Sets the column by which the table is being sorted. */
  setSortingColumn (column) {
    // Reverse sorting order if the same column is selected
    if (this.sortColumn === column) {
      this.sortReverse = !this.sortReverse
    // Otherwise sort by the new column
    } else {
      this.sortColumn = column
      this.sortReverse = false
    }

    this.setState({data: this.sort(this.state.data)})
  }

  /** Sorts the given data by the current sorting column */
  sort (data) {
    const dataType = this.sortColumn.type
    const label = this.sortColumn.label
    const reverse = this.sortReverse
    const newData = data.slice()

    newData.sort((a, b) => {
      switch (dataType) {
        case 'String': case 'string': default:
          return (reverse)
            ? b[label].localeCompare(a[label])
            : a[label].localeCompare(b[label])
        case 'Number': case 'number':
          return (reverse)
            ? b[label] - a[label]
            : a[label] - b[label]
      }
    })

    return newData
  }

  render () {
    const columns = this.props.schema.columns
    const data = this.state.data
    const clickHandler = this.setSortingColumn

    return (
      <table className='table'>
        <TableHeader columns={columns} clickHandler={clickHandler} />
        <TableBody columns={columns} data={data} />
      </table>
    )
  }
}

export default Table
