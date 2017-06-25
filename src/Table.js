import React from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'

class Table extends React.Component {
  constructor () {
    super()

    const data = require('./data.json').slice()

    this.state = {
      sortedBy: null,
      sortedReverse: true,
      data: data
    }
  }

  sortByColumn (column) {
    // pre-determine the new value of sortedReverse
    const sortedBy = this.state.sortedBy
    const sortedReverse = this.state.sortedReverse
    const nowSortedReverse = sortedBy === column && !sortedReverse

    new Promise((resolve, reject) => {
      let data = this.state.data.slice()

      data.sort((a, b) => {
        // reverse sorting order if sorting by the same column
        if (this.state.sortedBy === column) {
          return (sortedReverse)
            ? a[column].localeCompare(b[column])
            : b[column].localeCompare(a[column])
        // otherwise sort by the new column in natural order
        } else {
          return a[column].localeCompare(b[column])
        }
      })

      resolve(data)
    }).then((data) => {
      this.setState({sortedBy: column})
      this.setState({sortedReverse: nowSortedReverse})
      this.setState({data: data})
    })
  }

  render () {
    return (
      <table className='table'>
        <TableHeader onClick={this.sortByColumn.bind(this)} />
        <TableBody data={this.state.data} />
      </table>
    )
  }
}

export default Table
