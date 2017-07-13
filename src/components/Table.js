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
    console.log('please call this')
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
    const ordering = this.sortColumn.ordering
    const label = this.sortColumn.label
    const reverse = this.sortReverse
    let newData = data.slice()

    newData.sort((a, b) => {
      switch (ordering) {
        case 'lexicographic': default:
          return (reverse)
            ? b[label].localeCompare(a[label])
            : a[label].localeCompare(b[label])
        case 'numeric':
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

    filterText = filterText.toLowerCase()
    let filteredData = []

    for (let item of data.slice()) {
      for (let field of columns) {
        if (field.isSearchable &&
            item[field.label].toLowerCase().search(filterText) >= 0) {
          filteredData.push(item)
          break
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
