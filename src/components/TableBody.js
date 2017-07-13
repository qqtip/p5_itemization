import React from 'react'

class TableRow extends React.Component {
  /* props */
  // columns
  // data
  // isOdd

  renderCell (column, index) {
    const columns = this.props.columns

    let classes = ['table-cell']
    if (column === columns[columns.length - 1]) {
      classes.push('right-end')
    }
    if (column === columns[0]) {
      classes.push('left-end')
    }
    if (column.hideOnMobile) {
      classes.push('mobile-hidden')
    }

    const item = this.props.item
    const label = column.label

    return (
      <td key={index} className={classes.join(' ')}>{item[label]}</td>
    )
  }

  render () {
    const className = this.props.isOdd ? 'odd-row' : 'even-row'
    const data = this.props.columns.map(
      (column, index) => this.renderCell(column, index)
    )

    return <tr className={className}>{data}</tr>
  }
}

class TableBody extends React.Component {
  /* props */
  // columns
  // data

  render () {
    const rows = this.props.data.map(
      (item, index) => {
        return (
          <TableRow
            key={index}
            columns={this.props.columns}
            item={item}
            isOdd={index % 2 === 0}
          />
        )
      }
    )

    return <tbody className='table-body'>{rows}</tbody>
  }
}

export default TableBody
