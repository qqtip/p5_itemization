import React from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'
import jquery from 'jquery'

class Table extends React.Component {
  /* props */
  // data
  // metadata
  //  columns
  //  default sort column
  // searchString

  constructor (props) {
    super()

    window.$ = window.jQuery = jquery
    require('sticky-table-headers')

    this.componentDidMount = this.initTableHeader
    this.componentDidUpdate = this.reinitTableHeader
    this.componentWillReceiveProps = this.checkProps

    this.setSortingColumn = this.setSortingColumn.bind(this)
    this.initTable(props)
  }

  /* prepares data for mounting or changing the table */
  initTable (props) {
    const sortColumnIndex = props.metadata.defaultSortColumnIndex
    const columns = props.metadata.columns

    this.sortColumn = columns[sortColumnIndex]
    this.sortReverse = false

    this.state = { data: this.filter(props.data, columns, props.searchString) }
  }

  /* initialize the table header to stick when scrolling */
  initTableHeader () {
    jquery('table.table').stickyTableHeaders()
  }

  /* reset sticky table header on table change */
  reinitTableHeader () {
    jquery('table.table').stickyTableHeaders('destroy')
    this.initTableHeader()
  }

  checkProps (newProps) {
    // reinitialize the table if the table was switched
    if (this.props.metadata !== newProps.metadata) {
      this.initTable(newProps)
    // otherwise re-filter with the new search string
    } else {
      this.setState({data:
        this.sort(
          this.filter(
            newProps.data.slice(),
            newProps.metadata.columns,
            newProps.searchString
          )
        )
      })
    }
  }

  /* a handler for column header clicks */
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
    const dataType = this.sortColumn.dataType
    const label = this.sortColumn.label
    const reverse = this.sortReverse
    const newData = data.slice()

    newData.sort((a, b) => {
      switch (dataType) {
        case 'string': default:
          return (reverse)
            ? b[label].localeCompare(a[label])
            : a[label].localeCompare(b[label])
        case 'number':
          return (reverse)
            ? b[label] - a[label]
            : a[label] - b[label]
      }
    })

    return newData
  }

  /**
   * Filters an array of data by a search string.
   * data       : an array of data
   * columns    : an array containing column metadata
   * filterText : a search string
   */
  filter (data, columns, filterText) {
    filterText = filterText.toLowerCase()

    return data.slice().filter(item => {
      // check each column for the search term
      for (let column of columns) {
        const field = column.label
        // convert value to searchable string
        const searchText = (() => {
          switch (column.dataType) {
            case 'string': default:
              return item[field]
            case 'array':
              return item[field].join(' ')
            case 'number':
              return String(item[field])
          }
        })().toLowerCase()
        // include the current item if matched
        if (column.isSearchable && searchText.indexOf(filterText) > -1) {
          return true
        }
      }
      // filter items with no matching fields
      return false
    })
  }

  render () {
    const columns = this.props.metadata.columns
    const clickHandler = this.setSortingColumn
    const data = this.state.data

    return (
      <table className='table'>
        <TableHeader columns={columns} clickHandler={clickHandler} />
        <TableBody columns={columns} data={data} />
      </table>
    )
  }
}

export default Table
