import React from 'react'
import TableRow from './TableRow.js'
import DATA from './data.json'

class Table extends React.Component {
  constructor () {
    super()

    this.state = {
      data: DATA// .splice()
    }
  }

  renderHeader () {
    const columns = [
      'Arcana', 'Persona', 'Itemization', 'Category', 'Description', 'HP / SP Cost'
    ].map((label) => {
      return <th key={label} className='table-header'>{label}</th>
    })

    return <thead><tr>{columns}</tr></thead>
  }

  renderBody () {
    const rows = this.state.data.map((item, index) => {
      const className = index % 2 ? 'odd-row' : 'even-row'

      return <TableRow key={index} item={item} className={className} />
    })

    return <tbody>{rows}</tbody>
  }

  render () {
    return (
      <table className='table'>
        {this.renderHeader()}
        {this.renderBody()}
      </table>
    )
  }
}

export default Table
