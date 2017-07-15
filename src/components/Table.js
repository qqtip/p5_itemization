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
  // searchTerm

  constructor (props) {
    super()

    const sortColumnIndex = props.metadata.defaultSortColumnIndex
    this.sortColumn = props.metadata.columns[sortColumnIndex]
    this.sortReverse = false
    this.setSortingColumn = this.setSortingColumn.bind(this)

    const data = props.data.slice()
    this.state = { data: data }
  }

  /* update data when this Table receives a new search term */
  componentWillReceiveProps (newProps) {
    // filter data by the new search term then sort by column
    this.setState({data:
      this.sort(
        this.filter(
          this.props.data.slice(),
          newProps.searchTerm
        )
      )
    })
  }

  /* initialize the table header to stick when scrolling */
  componentDidMount () {
    window.$ = window.jQuery = jquery
    require('sticky-table-headers')
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
    const dataType = this.sortColumn.dataType
    const label = this.sortColumn.label
    const reverse = this.sortReverse
    let newData = data.slice()

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

  /* filters the given data filtered by the given text and returns it */
  filter (data, filterText) {
    const columns = this.props.metadata.columns

    let filteredData = []

    // for each item, check each searchable column
    for (let item of data.slice()) {
      for (let column of columns) {
        if (column.isSearchable) {
          const field = column.label
          // generate a searchable string depending on the type of data
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

          // add each matching item to a new array
          if (searchText.search(filterText.toLowerCase()) >= 0) {
            filteredData.push(item)
            break
          }
        }
      }
    }

    return filteredData
  }

  render () {
    const columns = this.props.metadata.columns

    return (
      <table className='table'>
        <TableHeader columns={columns} clickHandler={this.setSortingColumn} />
        <TableBody columns={columns} data={this.state.data} />
      </table>
    )
  }
}

export default Table
