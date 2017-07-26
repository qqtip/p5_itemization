import React from 'react'
import classNames from 'classnames'

class TableRow extends React.Component {
  /* props */
  // columns
  // data
  // isOdd

  renderCell (column, index) {
    const columns = this.props.columns

    const className = classNames({
      'table-cell': true,
      'right-end': column === columns.slice(-1).pop(),
      'left-end': column === columns[0],
      'mobile-hidden': column.hideOnMobile
    })

    const item = this.props.item
    const label = column.label
    const data = Array.isArray(item[label])
      ? item[label].join(', ')
      : item[label]

    return <td key={index} className={className}>{data}</td>
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
    const columns = this.props.columns
    const rows = this.props.data.map(
      (item, index) => {
        return (
          <TableRow
            key={index} columns={columns}
            item={item} isOdd={index % 2}
          />
        )
      }
    )

    return <tbody className='table-body'>{rows}</tbody>
  }
}

export default TableBody
