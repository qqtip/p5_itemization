import React from 'react'
import TableHeader from './TableHeader.js'
import TableBody from './TableBody.js'

class Table extends React.Component {
  constructor () {
    super()

    const data = require('../assets/data/rows.json').slice()

    this.state = {
      sortedBy: null,
      sortedReverse: true,
      data: data
    }
  }

  // this is dirty and bad and I should feel bad
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
          switch (column) {
            // sort numbers
            case 'level':
              return (sortedReverse)
                ? a[column] - b[column]
                : b[column] - a[column]
            // sort strings
            default:
              return (sortedReverse)
                ? a[column].localeCompare(b[column])
                : b[column].localeCompare(a[column])
          }
        // otherwise sort by the new column in natural order
        } else {
          switch (column) {
            // sort numbers
            case 'level':
              return a[column] - b[column]
            // sort strings
            default:
              return a[column].localeCompare(b[column])
          }
        }
      })

      resolve(data)
    }).then((data) => {
      this.setState({sortedBy: column})
      this.setState({sortedReverse: nowSortedReverse})
      this.setState({data: data})
    })
  }

  filter (term) {
    const data = require('../assets/data/rows.json').slice()

    this.setState({data: data})
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
